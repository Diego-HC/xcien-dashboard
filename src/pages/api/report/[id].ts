import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid report ID" });
  }

  try {
    const report = await db.report.findUnique({
      where: { id },
      select: { data: true, createdAt: true },
    });

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    // Set headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="network-report-${id}.pdf"`,
    );
    res.setHeader("Content-Length", report.data.length);

    // Send the PDF data
    res.send(Buffer.from(report.data));
  } catch (error) {
    console.error("Error serving PDF:", error);
    res.status(500).json({ error: "Failed to retrieve report" });
  }
}