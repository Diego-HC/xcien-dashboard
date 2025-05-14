import { useEffect, useState } from "react";

export default function TimePicker() {
  const [timeRange, setTimeRange] = useState<[string, string]>(["", ""]);

  useEffect(() => {
    console.log("Start Time:", timeRange[0]);
    console.log("End Time:", timeRange[1]);
  }, [timeRange]);

  return (
    <div className="flex w-auto max-w-fit items-center gap-4 rounded-lg border border-gray-300 bg-white px-4 py-2">
      <div className="flex gap-2">
        <label className="text-sm font-bold text-gray-600">Desde:</label>
        <input
          type="time"
          value={timeRange[0]}
          onChange={(e) => setTimeRange([e.target.value, timeRange[1]])}
          className="border-none text-sm text-gray-800 outline-none"
        />
      </div>
      <span className="text-gray-400">|</span>
      <div className="flex gap-2">
        <label className="text-sm font-bold text-gray-600">Hasta:</label>
        <input
          type="time"
          value={timeRange[1]}
          onChange={(e) => setTimeRange([timeRange[0], e.target.value])}
          className="border-none text-sm text-gray-800 outline-none"
        />
      </div>
    </div>
  );
}
