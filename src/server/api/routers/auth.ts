// import { z } from "zod";
// import bcrypt from "bcryptjs";
// import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// export const authRouter = createTRPCRouter({
//   register: publicProcedure
//     .input(
//       z.object({
//         email: z.string().email(),
//         password: z.string().min(6),
//       })
//     )
//     .mutation(async ({ ctx, input }) => {
//       const hashedPassword = await bcrypt.hash(input.password, 10);
//       const user = await ctx.db.user.create({
//         data: {
//           email: input.email,
//           password: hashedPassword,
//         },
//       });

//       return { id: user.id, email: user.email };
//     }),

//   login: publicProcedure
//     .input(
//       z.object({
//         email: z.string().email(),
//         password: z.string(),
//       })
//     )
//     .mutation(async ({ ctx, input }) => {
//       const user = await ctx.db.user.findUnique({
//         where: { email: input.email },
//       });

//       if (!user) throw new Error("Usuario no encontrado");

//       const isValid = await bcrypt.compare(input.password, user.password);
//       if (!isValid) throw new Error("Contraseña incorrecta");

//       // Aquí puedes devolver una sesión o token según cómo manejes la auth
//       return { id: user.id, email: user.email };
//     }),
// });
