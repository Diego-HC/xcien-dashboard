import { useRouter } from "next/router";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Geist } from "next/font/google";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Sidebar from "~/components/Sidebar";
import UserIcon from "~/components/UserIcon"; // aquí cambia

const geist = Geist({ subsets: ["latin"] });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  return (
    <SessionProvider session={session}>
      <div className={`${geist.className} flex flex-row`}>
        {!isLoginPage && <Sidebar />}
        <div className={`relative flex-1 ${!isLoginPage ? "ml-24" : ""}`}>
          {!isLoginPage && <UserIcon />}
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
