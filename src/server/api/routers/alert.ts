import { env } from "~/env";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { AlertSeverity } from "~/utils/types";

export const alertRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const alerts = await fetch(env.OBSERVIUM_API_BASE_URL + "alerts", {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${env.OBSERVIUM_API_USERNAME}:${env.OBSERVIUM_API_PASSWORD}`,
        ).toString("base64")}`,
        "Content-Type": "application/json",
      },
    });

    if (!alerts.ok) {
      console.error("Error fetching alerts:", alerts.statusText);
      throw new Error("Failed to fetch alerts");
    }

    // Check if the response is JSON
    const contentType = alerts.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      console.error("Response is not JSON:", contentType);
      throw new Error("Response is not JSON");
    }

    // Parse the JSON response
    try {
      const data = (await alerts.json()) as {
        status: string;
        count: string;
        alerts: Record<
          string,
          {
            alert_table_id: string;
            alert_test_id: string;
            device_id: string;
            entity_type: string;
            entity_id: string;
            alert_assocs: string;
            delay: string;
            ignore_until: null;
            ignore_until_ok: string;
            last_checked: string;
            last_changed: string;
            last_recovered: string;
            last_ok: string;
            last_failed: string;
            has_alerted: string;
            last_message: string;
            alert_status: string;
            last_alerted: string;
            state: string;
            count: string;
            severity: string;
            class: string;
            html_row_class: string;
            status: string;
            checked: string;
            changed: string;
            alerted: string;
            recovered: string;
            ignore_until_text: string;
            ignore_until_ok_text: string;
            humanized: true;
          }
        >;
      };

      // Transform the alerts object into an array for easier handling
      const parsedAlerts = Object.values(data.alerts).map((alert) => ({
        alertTableId: alert.alert_table_id,
        alertTestId: alert.alert_test_id,
        deviceId: alert.device_id,
        entityType: alert.entity_type,
        entityId: alert.entity_id,
        alertStatus: alert.alert_status,
        severity: alert.severity as AlertSeverity | undefined,
        status: alert.status,
        lastMessage: alert.last_message,
        lastAlerted: alert.last_alerted,
        lastChecked: alert.last_checked,
        // TODO: Add other fields if needed
      }));

      return {
        status: data.status,
        count: parseInt(data.count, 10),
        alerts: parsedAlerts,
      };
    } catch (error) {
      console.error("Error parsing alerts JSON:", error);
      throw new Error("Error parsing alerts JSON");
    }
  }),
});
