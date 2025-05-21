import SeeMore from "./SeeMore";
import { EyeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { LuInfo } from "react-icons/lu";
import { useMemo } from "react";
import { api } from "~/utils/api";
import { AlertSeverity } from "~/utils/types";

export const widgetName = "ActiveAlerts";

export default function ActiveAlerts() {
  const alerts = api.alert.get.useQuery();

  const { criticalAlerts, warningAlerts, otherAlerts } = useMemo(() => {
    if (!alerts.data?.alerts) {
      return { criticalAlerts: 0, warningAlerts: 0, otherAlerts: 0 };
    }

    return alerts.data.alerts.reduce(
      (acc, alert) => {
        if (alert.severity === AlertSeverity.CRITICAL) {
          acc.criticalAlerts += 1;
        } else if (alert.severity === AlertSeverity.WARNING) {
          acc.warningAlerts += 1;
        } else {
          acc.otherAlerts += 1;
        }
        return acc;
      },
      { criticalAlerts: 0, warningAlerts: 0, otherAlerts: 0 },
    );
  }, [alerts.data?.alerts]);

  return (
    <div className="flex h-full w-full min-w-0 flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header stays at the top */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Alertas Activas</h2>
        <SeeMore />
      </div>
      {/* Alerts centered vertically */}
      <div className="flex flex-grow flex-col justify-center gap-3">
        {/* Críticas */}
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-25 items-center justify-center gap-4 rounded bg-red-100">
            <EyeIcon className="h-6 w-6 text-red-600" />

            <span className="text-lg font-bold text-red-700">
              {criticalAlerts}
            </span>
          </div>
          <span className="text-md ml-2 text-gray-700">Críticas</span>
        </div>
        {/* Advertencias */}
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-25 items-center justify-center gap-4 rounded bg-yellow-100">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
            <span className="text-lg font-bold text-yellow-600">
              {warningAlerts}
            </span>
          </div>
          <span className="text-md ml-2 text-gray-700">Advertencias</span>
        </div>
        {/* Otros */}
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-25 items-center justify-center gap-4 rounded bg-gray-100">
            <LuInfo className="h-6 w-6 text-gray-600" />
            <span className="text-lg font-bold text-gray-700">
              {otherAlerts}
            </span>
          </div>
          <span className="text-md ml-2 text-gray-700">Otros</span>
        </div>
      </div>
    </div>
  );
}
