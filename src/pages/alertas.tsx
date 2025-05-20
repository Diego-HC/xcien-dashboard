import { api } from "~/utils/api";

export default function Alertas() {
  const alerts = api.alert.get.useQuery();

  return (
    <div className="flex h-screen w-full flex-col gap-8 p-12">
      <h1 className="text-3xl font-bold">Alertas</h1>
      <div className="flex flex-col gap-4">
        {alerts.data?.alerts.map((alert) => (
          <div key={alert.alertTableId} className="border-b p-4">
            <h2 className="text-lg font-bold">
              {alert.lastMessage ?? "Sin mensaje"}
            </h2>
            <p className="text-sm text-gray-500">
              Estado: {alert.status} | Severidad: {alert.severity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
