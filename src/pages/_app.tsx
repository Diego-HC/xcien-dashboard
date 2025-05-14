import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Sidebar from "~/components/Sidebar";

const geist = Geist({
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={`${geist.className} flex flex-row`}>
      <Sidebar />
      <Component {...pageProps} />
    </div>
  );
};

export default api.withTRPC(MyApp);
