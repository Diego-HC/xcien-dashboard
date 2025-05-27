import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvasPro from "html2canvas-pro";
import ActiveAlerts from "./ActiveAlerts";
import AvailabilityStatus from "./AvailabilityStatus";
import DeviceStatus from "./DeviceStatus";
import Histogram from "./Histogram";
import ProcessorsStatus from "./ProcessorsStatus";
import { LuDownload } from "react-icons/lu";

interface PDFReportProps {
  dateRange: [string, string];
}

export default function PDFReport({ dateRange }: PDFReportProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePDF = async () => {
    if (!reportRef.current) return;
    setIsLoading(true);
    try {
      const safeHtml2CanvasPro = html2canvasPro as unknown as (
        element: HTMLElement,
        options: { scale: number },
      ) => Promise<HTMLCanvasElement>;

      const canvas = await safeHtml2CanvasPro(reportRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
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

      pdf.addImage(imgData, "PNG", marginX, marginY, imgWidth, imgHeight);
      pdf.save("report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-full w-full flex-col justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        {/* Text added above the button */}
        <h2 className="text-xl font-semibold">Reporte en PDF</h2>
        <div className="flex flex-grow flex-col items-center justify-center">
          <LuDownload size={64} />
          <button
            onClick={handleGeneratePDF}
            className="mt-4 cursor-pointer rounded bg-blue-600 px-6 py-6 text-lg text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="mr-2 h-6 w-6 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Generando...
              </div>
            ) : (
              "Descargar Reporte"
            )}
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
          <section className="pdf-widget"></section>
        </div>
      </div>
    </>
  );
}
