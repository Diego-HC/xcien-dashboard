import SeeMore from "./SeeMore";
import { api } from "~/utils/api";

export const widgetName = "LocationCapacity";

export default function LocationCapacity() {
    return (
        <div className="flex h-full w-full flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Capacidad por locación</h2>
                <SeeMore />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr>
                            <th className="text-center text-sm font-medium text-gray-500 pb-2">Locación</th>
                            <th className="text-center text-sm font-medium text-gray-500 pb-2">Capacidad Contratada</th>
                            <th className="text-center text-sm font-medium text-gray-500 pb-2">Uso</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center text-sm text-gray-900">Ola</td>
                            <td className="text-center text-sm italic text-gray-600">1000 Mbps</td>
                            <td className="text-center text-sm">
                            <span
                                className={`inline-flex items-center justify-center px-3 py-1 rounded-lg text-black font-semibold shadow`}
                            >
                                {50}%
                            </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}