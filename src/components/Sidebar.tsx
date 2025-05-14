import { LuBellRing, LuFileText, LuGauge } from "react-icons/lu";

export default function Sidebar() {
  return (
    <div className="flex h-screen w-24 flex-col items-center gap-4 rounded-r-lg bg-[#2A4365] text-white">
      <div className="mt-12 flex flex-col items-center gap-1">
        <LuGauge size={32} />
        <p>Dashboard</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <LuBellRing size={32} />
        <p>Alertas</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <LuFileText size={32} />
        <p>Reportes</p>
      </div>
    </div>
  );
}
