import { env } from "~/env";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const MEXICO_STATES_LIST = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de Mexico",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de Mexico",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacan",
  "Morelos",
  "Nayarit",
  "Nuevo Leon",
  "Oaxaca",
  "Puebla",
  "Queretaro",
  "Quintana Roo",
  "San Luis Potosi",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatan",
  "Zacatecas"
];

function getStateFromLocation(location: string): string | undefined {
  const state = MEXICO_STATES_LIST.find((state) => location.includes(state));
  return state;
}

export const deviceRouter = createTRPCRouter({
    get: publicProcedure
    .query(async () => {
      const devices = await fetch(env.OBSERVIUM_API_BASE_URL + "devices", {
        method: "GET",
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${env.OBSERVIUM_API_USERNAME}:${env.OBSERVIUM_API_PASSWORD}`
          ).toString("base64")}`,
          "Content-Type": "application/json",
        },
      });

      if (!devices.ok) {
        console.error("Error fetching devices:", devices.statusText);
        throw new Error("Failed to fetch devices");
      }

      // Check if the response is JSON
      const contentType = devices.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        console.error("Response is not JSON:", contentType);
        throw new Error("Response is not JSON");
      }

      // Parse the JSON response
      try {
        const data = (await devices.json()) as {
          status: string;
          count: string;
          devices: Record<string, {
            device_id: string;
            poller_id: string;
            hostname: string;
            sysName: string | null;
            label: string | null;
            ip: string;
            snmp_community: string | null;
            snmp_authlevel: string | null;
            snmp_authname: string | null;
            snmp_authpass: string | null;
            snmp_authalgo: string | null;
            snmp_cryptopass: string | null;
            snmp_cryptoalgo: string | null;
            snmp_context: string | null;
            snmp_version: string;
            snmp_port: string;
            snmp_timeout: string | null;
            snmp_retries: string | null;
            snmp_maxrep: string | null;
            ssh_port: string;
            agent_version: string | null;
            snmp_transport: string;
            bgpLocalAs: string | null;
            snmpEngineID: string;
            sysObjectID: string;
            sysDescr: string;
            sysContact: string;
            version: string;
            hardware: string;
            vendor: string;
            features: string;
            location: string;
            os: string;
            status: string;
            status_type: string;
            ignore: string;
            ignore_until: string | null;
            asset_tag: string;
            disabled: string;
            uptime: string;
            last_rebooted: string;
            force_discovery: string;
            last_polled: string;
            last_discovered: string;
            last_alerter: string;
            last_polled_timetaken: string;
            last_discovered_timetaken: string;
            purpose: string;
            type: string;
            serial: string;
            icon: string | null;
            distro: string;
            distro_ver: string;
            kernel: string;
            arch: string;
            location_id: string;
            location_lat: string;
            location_lon: string;
            location_country: string;
            location_state: string;
            location_county: string;
            location_city: string;
            location_geoapi: string;
            location_status: string;
            location_manual: string;
            location_updated: string;
            discover_mempools: string;
            discover_neighbours: string;
            "discover_p2p-radios": string;
            discover_processors: string;
            discover_raid: string;
            discover_storage: string;
            override_sysLocation_bool: string;
            override_sysLocation_string: string;
            poll_mempools: string;
            poll_netstats: string;
            poll_ospf: string;
            "poll_p2p-radios": string;
            poll_processes: string;
            poll_processors: string;
            poll_sensors: string;
            poll_storage: string;
            ports_ignored_count: string;
            sysORID: string;
          }>;
        };

        // Transform the devices object into an array for easier handling
        const parsedDevices = Object.values(data.devices).map((device) => ({
          deviceId: device.device_id,
          hostname: device.hostname,
          sysName: device.sysName,
          ip: device.ip,
          hardware: device.hardware,
          os: device.os,
          version: device.version,
          status: device.status,
          lastPolled: device.last_polled,
          lastDiscovered: device.last_discovered,
          purpose: device.purpose,
          type: device.type,
          location: device.location,
          locationCity: device.location_city,
          uptime: device.uptime
          // TODO: Add other fields if needed
        }));

        const deviceStatusByState = MEXICO_STATES_LIST.reduce((acc, state) => {
          acc[state] = {
            "0": 0,
            "1": 0,
          };
          return acc;
        }, {} as Record<string, Record<string, number>>);

        parsedDevices.forEach((device) => {
          if (!device.location) {
            console.warn(`Device with ID ${device.deviceId} has no location`);
            return;
          }

          const state = getStateFromLocation(device.location);
          if (state == null) {
            console.warn(`State not found for device with location: ${device.location}`);
            return;
          }

          const status = device.status;

          if (deviceStatusByState[state]?.[status] != null) {
            deviceStatusByState[state][status]++;
          }
        });

        return {
          status: data.status,
          count: parseInt(data.count, 10),
          devices: parsedDevices,
          deviceStatusByState,
        };
      } catch (error) {
        console.error("Error parsing devices JSON:", error);
        throw new Error("Error parsing devices JSON");
      }
    }),
});
