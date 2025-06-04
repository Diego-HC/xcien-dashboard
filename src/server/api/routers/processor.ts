import { env } from "~/env";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const processorRouter = createTRPCRouter({
  get: protectedProcedure.query(async () => {
    const processors = await fetch(env.OBSERVIUM_API_BASE_URL + "processors", {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${env.OBSERVIUM_API_USERNAME}:${env.OBSERVIUM_API_PASSWORD}`,
        ).toString("base64")}`,
        "Content-Type": "application/json",
      },
    });

    if (!processors.ok) {
      console.error("Error fetching processors:", processors.statusText);
      throw new Error("Failed to fetch processors");
    }

    const contentType = processors.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      console.error("Response is not JSON:", contentType);
      throw new Error("Response is not JSON");
    }

    try {
      const data = (await processors.json()) as {
        status: string;
        count: number;
        entries: Record<
          string,
          {
            processor_id: string;
            entPhysicalIndex: null;
            hrDeviceIndex: null;
            device_id: string;
            processor_oid: string;
            processor_index: string;
            processor_type: string;
            processor_descr: string;
            processor_returns_idle: string;
            processor_precision: string;
            processor_warn_limit: null;
            processor_warn_count: null;
            processor_crit_limit: null;
            processor_crit_count: null;
            processor_usage: string;
            processor_polled: string;
            processor_ignore: string;
          }
        >;
      };

      const parsedProcessors = Object.values(data.entries).map((processor) => ({
        processorId: processor.processor_id,
        deviceId: processor.device_id,
        processorUsage: processor.processor_usage,
        processorPolled: processor.processor_polled,
      }));

      return {
        status: data.status,
        count: data.count,
        processors: parsedProcessors,
      };
    } catch (error) {
      console.error("Error parsing processors JSON:", error);
      throw new Error("Error parsing processors JSON");
    }
  }),
});
