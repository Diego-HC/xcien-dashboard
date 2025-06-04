import { z } from "zod";
import bcrypt from "bcryptjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if user already exists
      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        return {
          error: "User with this email already exists",
        };
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);
      
      // Create user and credential in a transaction
      const user = await ctx.db.user.create({
        data: {
          email: input.email,
          credentials: {
            create: {
              password: hashedPassword,
            },
          },
        },
        include: {
          credentials: true,
        },
      });

      return { id: user.id, email: user.email };
    }),
});