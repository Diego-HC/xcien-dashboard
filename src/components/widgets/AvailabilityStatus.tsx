import SeeMore from "./SeeMore";
import { api } from "~/utils/api";
import { gtSeverityColor } from "~/utils/utils";
import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export const widgetName = "AvailabilityStatus";

export default function AvailabilityStatus() {
  const devices = api.device.get.useQuery();
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
        <SeeMore />
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