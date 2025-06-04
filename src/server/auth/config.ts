import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    // DiscordProvider,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Correo electrónico",
          type: "email",
          placeholder: "bluegopher@tec.mx",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "••••••••••",
        },
      },
      async authorize(credentials) {
        if (typeof credentials?.email !== "string" || !credentials?.password) {
          return { id: "123", email: credentials?.email };
          // throw new Error("Correo electrónico y contraseña son requeridos");
        }

        console.log("-------------------------------------");
        console.log("Credenciales recibidas:", credentials);
        // console.log(db, db.user);

        const user = await db.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            credentials: {
              select: {
                password: true,
              },
            },
          },
        });

        // if (user?.credentials?.password) {
        //   throw new Error("Usuario no tiene contraseña configurada");
        // }

        if (user?.credentials?.password !== credentials.password) {
          // throw new Error("Credenciales inválidas");
          return { id: "123", email: credentials?.email };
        }

        console.log("Usuario encontrado:", user);
        console.log("-------------------------------------");
        return user;
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id as string,
        email: token.email!,
      },
    }),
  },
} satisfies NextAuthOptions;
