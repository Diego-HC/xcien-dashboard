import SeeMore from "./SeeMore";
import { api } from "~/utils/api";
import { useMemo } from "react";

interface LastRebootedProps {
  dateRange: [string, string];
}

export default function LastRebooted({ dateRange }: LastRebootedProps) {
  const devices = api.device.get.useQuery({
    startDate: dateRange[0],
    endDate: dateRange[1],
  });

  const lastRebooted = devices.data?.lastRebootedDevice;

  const top5 = useMemo(() => {
    if (!lastRebooted) return [];

    return Object.entries(lastRebooted)
      .map(([hostname, lastReboot]) => {
        const lastRebootedDate = new Date(Number(lastReboot) * 1000);
        return { hostname, lastRebootedDate };
      })
      .sort(
        (a, b) => b.lastRebootedDate.getTime() - a.lastRebootedDate.getTime(),
      )
      .slice(0, 5);
  }, [lastRebooted]);

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Dispositivos reiniciados últimamente
        </h2>
      </div>

      <div className="overflow-auto">
        <table className="auto table min-w-full">
          <thead>
            <tr>
              <th className="pb-2 text-left text-sm font-medium text-gray-500">
                Dispositivo
              </th>
              <th className="pb-2 text-center text-sm font-medium text-gray-500">
                Último reinicio
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-8 divide-transparent">
            {top5.map(({ hostname, lastRebootedDate }) => (
              <tr key={hostname} className="justify-between">
                <td className="text-left text-sm text-gray-900">{hostname}</td>
                <td className="text-center text-sm text-gray-600 italic">
                  {lastRebootedDate.toLocaleDateString()}{" "}
                  {lastRebootedDate.toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
