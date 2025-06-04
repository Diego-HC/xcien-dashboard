import { useRouter } from "next/router";
import type { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { type AppType } from "next/app";
import { Geist } from "next/font/google";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Sidebar from "~/components/Sidebar";
import UserIcon from "~/components/UserIcon"; // aquí cambia
import type { NextComponentType } from "next";
import { anonPages } from "~/utils/types";
import { useEffect } from "react";

const geist = Geist({ subsets: ["latin"] });

type PageProps = {
  session: Session | null;
};

const MyApp: AppType<PageProps> = ({ Component, pageProps: { session } }) => {
  return (
    <SessionProvider session={session}>
      <Page Component={Component} />
    </SessionProvider>
  );
};

function Page({ Component }: { Component: NextComponentType }) {
  const router = useRouter();
  const { data: sessionData, status: sessionStatus } = useSession();

  useEffect(() => {
    if (
      sessionStatus !== "loading" &&
      !sessionData &&
      !anonPages.includes(router.pathname)
    ) {
      void router.push("/unauthorized");
      console.error(
        "Unauthorized access attempt to a protected page.",
        sessionData,
        sessionStatus,
      );
    }
  }, [sessionData, router, sessionStatus]);

  const showSidebar = !anonPages.includes(router.pathname);

  return (
    <div>
      <div className={`${geist.className} flex flex-row`}>
        {showSidebar && <Sidebar />}
        <div className={`relative flex-1 ${showSidebar ? "ml-24" : ""}`}>
          {showSidebar && <UserIcon />}
          <Component />
        </div>
      </div>
    </div>
  );
}

export default api.withTRPC(MyApp);
