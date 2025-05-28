import DatePicker from "~/components/DatePicker";
import ActiveAlerts from "~/components/widgets/ActiveAlerts";
import DeviceStatus from "~/components/widgets/DeviceStatus";
import AvailabilityStatus from "~/components/widgets/AvailabilityStatus";
import Histogram from "~/components/widgets/Histogram";
import ProcessorsStatus from "~/components/widgets/ProcessorsStatus";
import ReportGenerator from "~/components/ReportGenerator";
import MemoryPoolStatus from "~/components/widgets/MemoryPoolStatus";
import LastRebooted from "~/components/widgets/LastRebooted";
import { useState } from "react";

export default function Home() {
  const [dateRange, setDateRange] = useState<[string, string]>(["", ""]);

  return (
    <div className="flex h-screen w-full flex-col gap-8 p-12">
      <h1 className="text-5xl font-extrabold">Network Monitoring</h1>
      <div className="flex flex-row gap-4">
        <DatePicker dateRange={dateRange} setDateRange={setDateRange} />
        <ReportGenerator dateRange={dateRange}/>
      </div>

      {/* Widgets */}
      <div className="grid grow grid-cols-4 gap-4">
        {/* Row 1 */}
        <div className="col-span-2">
          <Histogram dateRange={dateRange} />
        </div>
        <div>
          <DeviceStatus dateRange={dateRange} />
        </div>
        <div>
          <ActiveAlerts dateRange={dateRange} />
        </div>

        {/* Row 2 */}
        <div className="row-span-2">
          <AvailabilityStatus dateRange={dateRange} />
        </div>
        <div className="row-span-2">
          <ProcessorsStatus dateRange={dateRange} />
        </div>
        <div className="row-span-2">
          <MemoryPoolStatus dateRange={dateRange} />
        </div>
        <div className="row-span-2">
          <LastRebooted dateRange={dateRange} />
        </div>
      </div>
    </div>
  );
}
