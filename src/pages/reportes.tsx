import { api } from "~/utils/api";

export default function Reportes() {
  const { data: reports, refetch } = api.report.getReports.useQuery();
  const { mutate: deleteReport } = api.report.deleteReport.useMutation({
    onSuccess: () => refetch(),
  });

  return (
    <div className="flex h-screen w-full flex-col gap-8 p-12">
      <h1 className="text-5xl font-bold">Reportes</h1>

      <div className="grid grid-cols-1 gap-4">
        {reports?.map((report) => (
          <div
            key={report.id}
            className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4"
          >
            <span>{new Date(report.createdAt).toLocaleString()}</span>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => deleteReport(report.id)}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Eliminar
              </button>
              <a
                href={`/api/report/${report.id}`}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                download={`report-${report.id}.pdf`}
              >
                Descargar PDF
              </a>
            </div>
          </div>
        ))}
        {reports?.length === 0 && (
          <div className="text-center text-gray-500">
            No hay reportes disponibles.
          </div>
        )}
      </div>
    </div>
  );
}
