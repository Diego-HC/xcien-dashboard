import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { alertRouter } from "./routers/alert";
import { deviceRouter } from "./routers/device";
import { authRouter } from "./routers/auth";
import { processorRouter } from "./routers/processor";
import { mempoolRouter } from "./routers/mempool";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  alert: alertRouter,
  device: deviceRouter,
  auth: authRouter,
  processor: processorRouter,
  mempool: mempoolRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
