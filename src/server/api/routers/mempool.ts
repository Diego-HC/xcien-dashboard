import { env } from "~/env";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const mempoolRouter = createTRPCRouter({
  get: protectedProcedure.query(async () => {
    const mempools = await fetch(env.OBSERVIUM_API_BASE_URL + "mempools", {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${env.OBSERVIUM_API_USERNAME}:${env.OBSERVIUM_API_PASSWORD}`,
        ).toString("base64")}`,
        "Content-Type": "application/json",
      },
    });

    if (!mempools.ok) {
      console.error("Error fetching mempools:", mempools.statusText);
      throw new Error("Failed to fetch mempools");
    }

    const contentType = mempools.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      console.error("Response is not JSON:", contentType);
      throw new Error("Response is not JSON");
    }

    try {
      const data = (await mempools.json()) as {
        vars: string[];
        query: string;
        status: string;
        count: number;
        entries: Record<
          string,
          {
            mempool_id: string;
            mempool_index: string;
            entPhysicalIndex: null;
            hrDeviceIndex: null;
            mempool_mib: string;
            mempool_multiplier: string;
            mempool_hc: string;
            mempool_descr: string;
            device_id: string;
            mempool_deleted: string;
            mempool_warn_limit: null;
            mempool_crit_limit: null;
            mempool_ignore: null;
            mempool_table: string;
            mempool_polled: string;
            mempool_perc: string;
            mempool_used: string;
            mempool_free: string;
            mempool_total: string;
          }
        >;
      };

      const parsedMempools = Object.values(data.entries).map((mempool) => ({
        mempoolId: mempool.mempool_id,
        deviceId: mempool.device_id,
        mempoolPolled: mempool.mempool_polled,
        mempoolPercentage: mempool.mempool_perc,
      }));

      return {
        vars: data.vars,
        query: data.query,
        status: data.status,
        count: data.count,
        mempoolPercentage: parsedMempools,
      };
    } catch (error) {
      console.log("Error parsing mempools JSON:", error);
      throw new Error("Error parsing mempools JSON");
    }
  }),
});
