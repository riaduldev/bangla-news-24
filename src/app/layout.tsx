import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { ToastContainer } from "react-toastify";


const notoSerifBengali = Noto_Serif_Bengali({
  
  subsets: ["latin", "bengali"],
});


export const metadata: Metadata = {
  title: {
    default: "Bangla News 24",
    template: "%s | Bangla News 24",
  },
  description:
    "দেশ-বিদেশের সর্বশেষ খবর, বিশ্লেষণ ও প্রতিবেদন — বাংলা নিউজ ২৪।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ToastContainer position="top-center" />
        <Header></Header>
         <Marquee />
        <main>
          {children}
        </main>
        <Footer></Footer>
        </body>
    </html>
  );
}
