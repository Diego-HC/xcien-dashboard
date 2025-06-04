import { z } from "zod";
import { protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { createTRPCRouter } from "../trpc";

export const reportRouter = createTRPCRouter({
  getReports: publicProcedure.query(async ({ ctx }) => {
    const reports = await ctx.db.report.findMany({
      select: {
        id: true,
        createdAt: true,
      }, 
      orderBy: {
        createdAt: "desc"
      }
    });

    return reports;
  }),

  getReport: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const report = await ctx.db.report.findUnique({
        where: { id: input },
        select: { data: true },
      });
      if (!report) {
        throw new Error("Report not found");
      }
      return report.data;
    }),

  createReport: protectedProcedure
    .input(z.object({ content: z.instanceof(Uint8Array) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.report.create({
        data: {
          data: input.content,
        }
      });
    }),

  deleteReport: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.report.delete({ where: { id: input } });
    }),
});
