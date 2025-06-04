import SeeMore from "./SeeMore";
import { api } from "~/utils/api";
import { gtSeverityColor } from "~/utils/utils";
import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface AvailabilityStatusProps {
  dateRange: [string, string];
}

export default function AvailabilityStatus({
  dateRange,
}: AvailabilityStatusProps) {
  const devices = api.device.get.useQuery({
    startDate: dateRange[0],
    endDate: dateRange[1],
  });
  const devicesByState = devices.data?.deviceStatusByState;

  const availability = useMemo(() => {
    if (!devicesByState) return 0;
    let totalUp = 0;
    let total = 0;
    Object.values(devicesByState).forEach(({ "1": up = 0, "0": down = 0 }) => {
      totalUp += up;
      total += up + down;
    });
    return total ? (totalUp / total) * 100 : 0;
  }, [devicesByState]);

  const chartData = [
    { name: "up", value: availability },
    { name: "down", value: 100 - availability },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">% de disponibilidad</h2>
        <SeeMore>
          <h3 className="mb-4 text-lg font-semibold">
            Disponibilidad por Estado
          </h3>
          {devicesByState ? (
            <div className="max-h-80 overflow-y-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left text-sm font-medium text-gray-500">
                      Estado
                    </th>
                    <th className="px-2 py-1 text-right text-sm font-medium text-gray-500">
                      Up
                    </th>
                    <th className="px-2 py-1 text-right text-sm font-medium text-gray-500">
                      Down
                    </th>
                    <th className="px-2 py-1 text-right text-sm font-medium text-gray-500">
                      % Up
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
                        <td className="px-2 py-1 text-right text-sm text-gray-900">
                          {up}
                        </td>
                        <td className="px-2 py-1 text-right text-sm text-gray-900">
                          {down}
                        </td>
                        <td className="px-2 py-1 text-right text-sm text-gray-900 italic">
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

      <div className="flex flex-1 items-center justify-center">
        <ResponsiveContainer width={150} height={150}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              innerRadius={50}
              outerRadius={70}
              paddingAngle={2}
            >
              <Cell key="up" fill={gtSeverityColor(availability)} />
              <Cell key="down" fill="#E5E7EB" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute text-2xl font-bold">
          {availability.toFixed(0)} %
        </div>
      </div>
    </div>
  );
}
