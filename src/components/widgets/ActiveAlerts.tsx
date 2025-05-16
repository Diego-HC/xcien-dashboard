import { useState } from "react";
import SeeMore from "./SeeMore";
import { EyeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const widgetName = "ActiveAlerts";

export default function ActiveAlerts() {
  const [criticalAlerts, setCriticalAlerts] = useState(4);
  const [warningAlerts, setWarningAlerts] = useState(7);

  return (
    <div className="flex h-full w-full min-w-0 flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header stays at the top */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Alertas Activas</h2>
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
      </div>
    </div>
  );
}
