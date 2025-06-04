import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvasPro from "html2canvas-pro";
import ActiveAlerts from "./widgets/ActiveAlerts";
import AvailabilityStatus from "./widgets/AvailabilityStatus";
import DeviceStatus from "./widgets/DeviceStatus";
import Histogram from "./widgets/Histogram";
import ProcessorsStatus from "./widgets/ProcessorsStatus";
import DatePicker from "./DatePicker";
import LastRebooted from "./widgets/LastRebooted";
import { LuDownload } from "react-icons/lu";
import { api } from "~/utils/api";

interface ReportGeneratorProps {
  dateRange: [string, string];
}

export default function ReportGenerator({ dateRange }: ReportGeneratorProps) {
  const { mutate: createReport } = api.report.createReport.useMutation();

  const reportRef = useRef<HTMLDivElement>(null);

  const handleGeneratePDF = async () => {
    if (!reportRef.current) return;
    try {
      const safeHtml2CanvasPro = html2canvasPro as unknown as (
        element: HTMLElement,
        options: { scale: number },
      ) => Promise<HTMLCanvasElement>;

      const canvas = await safeHtml2CanvasPro(reportRef.current, {
        scale: 1.5,
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.8);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
      const imgWidth = canvasWidth * ratio;
      const imgHeight = canvasHeight * ratio;
      const marginX = (pdfWidth - imgWidth) / 2;
      const marginY = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, "JPEG", marginX, marginY, imgWidth, imgHeight);
      pdf.save("Network-Monitoring-Report.pdf");
      const reportData = pdf.output("arraybuffer");
      createReport({ content: new Uint8Array(reportData) });
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <div className="flex w-auto max-w-fit items-center gap-4 rounded-lg border border-gray-300 bg-white px-4 py-2">
        <div className="flex flex-grow flex-col items-center justify-center">
          <label className="text-sm font-semibold">Reporte en PDF</label>
          <button
            onClick={handleGeneratePDF}
            className="cursor-pointer rounded text-lg text-black"
          >
            <LuDownload size={24} />
          </button>
        </div>
      </div>
      {/* Hidden container with grid layout for PDF generation */}
      <div
        ref={reportRef}
        style={{
          position: "absolute",
          left: "-10000px",
          top: "0",
          visibility: "visible",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(3, auto)",
            gap: "16px",
            padding: "20px",
          }}
        >
          <DatePicker dateRange={dateRange} setDateRange={() => null} />
          <section className="pdf-widget">
            <ActiveAlerts dateRange={dateRange} />
          </section>
          <section className="pdf-widget">
            <AvailabilityStatus dateRange={dateRange} />
          </section>
          <section className="pdf-widget">
            <DeviceStatus dateRange={dateRange} />
          </section>
          <section className="pdf-widget">
            <Histogram dateRange={dateRange} />
          </section>
          <section className="pdf-widget">
            <ProcessorsStatus dateRange={dateRange} />
          </section>
          {/* Optionally add an empty section or content to fill last grid cell */}
          <section className="pdf-widget">
            <LastRebooted dateRange={dateRange} />
          </section>
        </div>
      </div>
    </>
  );
}
