import { LuBellRing, LuFileText, LuGauge } from "react-icons/lu";
import { useRouter } from "next/router";

export default function Sidebar() {
  return (
    <div className="fixed flex h-screen w-24 flex-col items-center gap-2 rounded-r-lg bg-[#2A4365] pt-4 text-xs text-white">
      <SidebarButton path="/" icon={LuGauge} label="Dashboard" />
      <SidebarButton path="/alertas" icon={LuBellRing} label="Alertas" />
      <SidebarButton path="/reportes" icon={LuFileText} label="Reportes" />
    </div>
  );
}

function SidebarButton({
  path,
  icon: Icon,
  label,
}: {
  path: string;
  icon: React.ElementType;
  label: string;
}) {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <button
      onClick={async () => {
        await router.push(path);
      }}
      className={
        "relative flex h-20 w-10/12 cursor-pointer flex-col items-center justify-center gap-1 rounded-full" +
        (isActive(path) ? " bg-white text-[#2A4365]" : "")
      }
    >
      <Icon size={32} color={isActive(path) ? "#2A4365" : "white"} />
      <p>{label}</p>
    </button>
  );
}
