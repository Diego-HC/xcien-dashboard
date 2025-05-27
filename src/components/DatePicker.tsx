import { useEffect } from "react";

interface DatePickerProps {
  dateRange: [string, string];
  setDateRange: (range: [string, string]) => void;
}

export default function DatePicker({
  dateRange,
  setDateRange,
}: DatePickerProps) {
  useEffect(() => {
    if (dateRange) {
      console.log("Start Date:", dateRange[0]);
      console.log("End Date:", dateRange[1]);
    }
  }, [dateRange]);

  return (
    <div className="flex w-auto max-w-fit items-center gap-4 rounded-lg border border-gray-300 bg-white px-4 py-2">
      <div className="flex gap-2">
        <label className="text-sm font-bold text-gray-600">Desde:</label>
        <input
          type="date"
          value={dateRange?.[0] ?? ""}
          onChange={(e) => setDateRange([e.target.value, dateRange?.[1] ?? ""])}
          className="border-none text-sm text-gray-800 outline-none"
        />
      </div>
      <span className="text-gray-400">|</span>
      <div className="flex gap-2">
        <label className="text-sm font-bold text-gray-600">Hasta:</label>
        <input
          type="date"
          value={dateRange?.[1] ?? ""}
          onChange={(e) => setDateRange([dateRange?.[0] ?? "", e.target.value])}
          className="border-none text-sm text-gray-800 outline-none"
        />
      </div>
    </div>
  );
}
