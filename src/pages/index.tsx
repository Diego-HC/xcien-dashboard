import DatePicker from "~/components/DatePicker";
import TimePicker from "~/components/TimePicker";
import ActiveAlerts from "~/components/widgets/ActiveAlerts";
import DeviceStatus from "~/components/widgets/DeviceStatus";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col gap-8 p-12">
      <h1 className="text-5xl font-extrabold">Network Monitoring</h1>
      <div className="flex flex-row gap-4">
        <DatePicker />
        <TimePicker />
      </div>

      {/* Widgets */}
      <div className="grid grow grid-cols-4 gap-4">
        {/* Row 1 */}
        <div className="col-span-2 border"></div>
        <div>
          <DeviceStatus />
        </div>
        <div>
          <ActiveAlerts />
        </div>

        {/* Row 2 */}
        <div className="row-span-2 border"></div>
        <div className="col-span-2 border"></div>
        <div className="border"></div>

        {/* Row 3 */}
        <div className="col-span-2 border"></div>
        <div className="border"></div>
      </div>
    </div>
  );
}
