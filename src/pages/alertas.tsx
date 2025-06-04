import { useState } from "react";
import { api } from "~/utils/api";

// Función para obtener la fecha de hoy en formato YYYY-MM-DD
const getTodayString = () => new Date().toISOString().split("T")[0];

export default function Alertas() {
  const alerts = api.alert.get.useQuery();
  const devices = api.device.get.useQuery({});
  const [fromDate, setFromDate] = useState("2024-01-04");
  const [toDate, setToDate] = useState(getTodayString());
  const [statusFilter, setStatusFilter] = useState("All");

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFromDate = e.target.value;
    setFromDate(newFromDate);
    // Si la fecha "desde" es mayor que la fecha "hasta" o "toDate" es undefined, actualizamos "hasta" para igualar "desde"
    if (!toDate || newFromDate > toDate) {
      setToDate(newFromDate);
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
  };

  // Filtra las alertas en base al rango de fecha y al estado
  const filteredAlerts =
    alerts.data?.alerts.filter((alert) => {
      const alertTimestamp = Number(alert.lastAlerted);
      // Si no hay fecha de alerta, descartamos la alerta
      if (alertTimestamp === 0) return false;
      // Convierte la fecha de inicio a unix timestamp (segundos) en UTC
      const fromTimestamp = Math.floor(
        new Date(fromDate + "T00:00:00Z").getTime() / 1000,
      );
      // Convierte la fecha fin al final del día (23:59:59) en unix timestamp (segundos) en UTC
      const toTimestamp = Math.floor(
        new Date(toDate + "T23:59:59Z").getTime() / 1000,
      );
      const dateMatch =
        alertTimestamp >= fromTimestamp && alertTimestamp <= toTimestamp;
      const statusMatch =
        statusFilter === "All" || alert.status === statusFilter;
      return dateMatch && statusMatch;
    }) ?? [];

  const formatDate = (timestamp: string) => {
    const ts = Number(timestamp);
    if (ts === 0) return "Unknown";
    return new Date(ts * 1000).toLocaleString("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold">Alertas</h1>

      <div className="mb-4 flex items-center gap-4">
        <div>
          <label className="font-medium">Desde:</label>
          <input
            type="date"
            value={fromDate}
            max={getTodayString()}
            onChange={handleFromChange}
            className="ml-2 rounded border px-2 py-1"
          />
        </div>
        <div>
          <label className="font-medium">Hasta:</label>
          <input
            type="date"
            value={toDate}
            min={fromDate}
            max={getTodayString()}
            onChange={handleToChange}
            className="ml-2 rounded border px-2 py-1"
          />
        </div>
        <div>
          <label className="font-medium">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="ml-2 rounded border px-2 py-1"
          >
            <option value="All">All</option>
            <option value="OK">OK</option>
            <option value="FAILED">FAILED</option>
            <option value="SUPPRESSED">SUPPRESSED</option>
          </select>
        </div>
      </div>

      <table className="w-full table-auto border-collapse shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Descripción</th>
            <th className="p-2">Ubicación</th>
            <th className="p-2">Estatus</th>
            <th className="p-2">Fecha de Alerta</th>
            <th className="p-2">Última actualización</th>
          </tr>
        </thead>
        <tbody>
          {alerts.data && devices.data ? (
            filteredAlerts.map((alert) => {
              const device = devices.data.devices.find(
                (d) => d.deviceId === alert.deviceId,
              );
              return (
                <tr key={alert.alertTableId} className="border-t">
                  <td className="p-2">{device?.purpose ?? "Desconocido"}</td>
                  <td className="p-2">{device?.location ?? "Desconocido"}</td>
                  <td className="p-2">{alert.status}</td>
                  <td className="p-2">{formatDate(alert.lastAlerted)}</td>
                  <td className="p-2">{formatDate(alert.lastChecked)}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="p-2" colSpan={6}>
                Cargando...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
