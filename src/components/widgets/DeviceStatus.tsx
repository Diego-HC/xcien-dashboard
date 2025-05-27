import SeeMore from "./SeeMore";
import { api } from "~/utils/api";
import { gtSeverityColor } from "~/utils/utils";
import { useMemo } from "react";

export const widgetName = "DeviceStatus";

export default function DeviceStatus() {
  const devices = api.device.get.useQuery();

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
    <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Estado de dispositivos</h2>
        <SeeMore />
      </div>

      <div className="overflow-auto">
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