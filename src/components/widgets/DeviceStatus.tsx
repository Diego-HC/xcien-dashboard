import SeeMore from "./SeeMore";
import { api } from "~/utils/api";
import { gtSeverityColor } from "~/utils/utils";
import { useMemo } from "react";

interface DeviceStatusProps {
  dateRange: [string, string];
}

export default function DeviceStatus({ dateRange }: DeviceStatusProps) {
  const devices = api.device.get.useQuery({
    startDate: dateRange[0],
    endDate: dateRange[1],
  });

  const devicesByState = devices.data?.deviceStatusByState;

  const top5 = useMemo(() => {
    if (!devicesByState) return [];

    return Object.entries(devicesByState)
      .map(([state, counts]) => {
        const up = counts["1"] ?? 0;
        const down = counts["0"] ?? 1;
        const result = down === 0 ? up : (up / (up + down)) * 100;
        return { state, result };
      })
      .sort((a, b) => b.result - a.result)
      .slice(0, 5);
  }, [devicesByState]);

  return (
    <div className="flex h-full w-full flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Estado de dispositivos</h2>
        <SeeMore>
          <h3 className="mb-4 text-lg font-semibold">
            Detalle completo de estados
          </h3>
          {devicesByState ? (
            <div className="max-h-80 overflow-y-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left text-sm font-medium text-gray-500">
                      Estado
                    </th>
                    <th className="px-2 py-1 text-center text-sm font-medium text-gray-500">
                      Activo
                    </th>
                    <th className="px-2 py-1 text-center text-sm font-medium text-gray-500">
                      Abajo
                    </th>
                    <th className="px-2 py-1 text-center text-sm font-medium text-gray-500">
                      % Activo
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(devicesByState).map(([state, counts]) => {
                    const up = counts["1"] ?? 0;
                    const down = counts["0"] ?? 0;
                    const total = up + down;
                    const percent = total === 0 ? 0 : (up / total) * 100;
                    return (
                      <tr key={state}>
                        <td className="px-2 py-1 text-left text-sm text-gray-900">
                          {state}
                        </td>
                        <td className="px-2 py-1 text-center text-sm text-gray-900">
                          {up}
                        </td>
                        <td className="px-2 py-1 text-center text-sm text-gray-900">
                          {down}
                        </td>
                        <td className="px-2 py-1 text-center text-sm text-gray-900 italic">
                          <span
                            className="inline-block rounded-md px-2 py-1 text-sm font-medium text-white"
                            style={{
                              backgroundColor: gtSeverityColor(percent),
                            }}
                          >
                            {percent.toFixed(2)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-600">No hay datos disponibles.</p>
          )}
        </SeeMore>
      </div>

      <div className="flex flex-grow items-center justify-center">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="pb-2 text-left text-sm font-medium text-gray-500">
                Enlaces activos
              </th>
              <th className="pb-2 text-center text-sm font-medium text-gray-500">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-8 divide-transparent">
            {top5.map(({ state, result }) => (
              <tr key={state} className="justify-between">
                <td className="text-left text-sm text-gray-900">{state}</td>
                <td className="text-center text-sm text-gray-600 italic">
                  <span
                    className="inline-block rounded-md px-2 py-1 text-sm font-medium text-white"
                    style={{ backgroundColor: gtSeverityColor(result) }}
                  >
                    {result.toPrecision(2)} %
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
