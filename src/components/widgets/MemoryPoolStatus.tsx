import SeeMore from "./SeeMore";
import { api } from "~/utils/api";
import { gtSeverityColor } from "~/utils/utils";
import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface MemoryPoolStatusProps {
  dateRange: [string, string];
}

export default function MemoryPoolStatus({ dateRange }: MemoryPoolStatusProps) {
  const mempools = api.mempool.get.useQuery();

  const usage = useMemo(() => {
    const memps = mempools.data?.mempoolPercentage;
    if (!memps) return 0;

    let total = 0;
    let count = 0;

    Object.values(memps).forEach((memp) => {
      if (dateRange) {
        const mempoolDate = new Date(Number(memp.mempoolPolled) * 1000);
        const startDate = new Date(dateRange[0]);
        const endDate = new Date(dateRange[1]);
        if (mempoolDate < startDate || mempoolDate > endDate) {
          return;
        }
      }

      const u = Number(memp.mempoolPercentage);
      if (!isNaN(u)) {
        total += u;
        count += 1;
      }
    });

    return count > 0 ? total / count : 0;
  }, [mempools.data, dateRange]);

  const chartData = [
    { name: "use", value: usage },
    { name: "notUsing", value: 100 - usage },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">% de uso de memorias</h2>
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
              <Cell key="use" fill={gtSeverityColor(usage)} />
              <Cell key="notUsing" fill="#E5E7EB" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute text-2xl font-bold">{usage.toFixed(0)} %</div>
      </div>
    </div>
  );
}
