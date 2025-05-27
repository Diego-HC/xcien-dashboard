import React, { useMemo } from "react";
import { api } from "~/utils/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Histogram() {
  // Retrieve devices from the API router.
  // Each device has an "uptime" property representing uptime in seconds.
  const devices = api.device.get.useQuery();

  const histogramData: { bin: string; count: number }[] = useMemo(() => {
    if (!devices.data) {
      return [];
    }
    const data = devices.data;
    // Create 11 bins: 0-9 days, 10-19, ..., 90-99 and 100+ days
    const bins = new Array<number>(11).fill(0);
    data.devices.forEach((device: { uptime: string }) => {
      // Convert uptime from seconds to days
      const days = Number(device.uptime) / 86400;
      const index = days >= 100 ? 10 : Math.floor(days / 10);
      bins[index] = (bins[index] ?? 0) + 1;
    });
    return bins.map((count, idx) => {
      // Label all bins except the last one as a 10-day range
      const label =
        idx === 10 ? "+100 days" : `${idx * 10}-${idx * 10 + 9} days`;
      return { bin: label, count };
    });
  }, [devices.data]);

  return (
    <div className="h-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Distribución del Uptime</h2>
      <div className="flex h-full items-center justify-center">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={histogramData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="bin"
              label={{
                value: "Rango de Uptime",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              label={{ value: "Cantidad", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Bar dataKey="count" fill="#2A4365" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
