import { useRouter } from "next/router";
import { type AppType } from "next/app";
import { Geist } from "next/font/google";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Sidebar from "~/components/Sidebar";
import { useRouter } from "next/router";

const geist = Geist({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  if (currentRoute === "/login") {
    return (
      <div
        className={`${geist.className} flex h-screen w-screen items-center justify-center`}
      >
        <Component {...pageProps} />
      </div>
    );
  }

  return (
    <div className={`${geist.className} flex flex-row`}>
      {/* Solo muestra el Sidebar si NO es la página de login */}
      {!isLoginPage && <Sidebar />}
      <div className={`${!isLoginPage ? "ml-24" : ""} flex-1`}>
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default api.withTRPC(MyApp);
