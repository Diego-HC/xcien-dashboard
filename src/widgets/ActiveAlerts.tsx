import { useState } from "react";
import SeeMore from "./SeeMore";
import { EyeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const widgetName = "ActiveAlerts";

export default function ActiveAlerts() {
    const [criticalAlerts, setCriticalAlerts] = useState(4);
    const [warningAlerts, setWarningAlerts] = useState(7);

    return (
        <div className="w-full h-full min-w-0 rounded-lg border border-gray-200 bg-white p-4 flex flex-col justify-between shadow-sm">
            {/* Header stays at the top */}
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Alertas Activas</h2>
                <SeeMore />
            </div>
            {/* Alerts centered vertically */}
            <div className="flex flex-col gap-3 flex-grow justify-center">
                {/* Críticas */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center gap-4 w-25 h-14 rounded bg-red-100">
                        <EyeIcon className="w-6 h-6 text-red-600" />
                
                        <span className="text-lg font-bold text-red-700">{criticalAlerts}</span>
                    </div>
                    <span className="ml-2 text-md text-gray-700">Críticas</span>
                </div>
                {/* Advertencias */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-4 justify-center w-25 h-14 rounded bg-yellow-100">
                        <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />
                        <span className="text-lg font-bold text-yellow-600">{warningAlerts}</span>
                    </div>
                    <span className="ml-2 text-md text-gray-700">Advertencias</span>
                </div>
            </div>
        </div>
    );
}
