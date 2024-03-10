import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReduxStore } from "@/Redux/provider";
import { CookiesProvider } from 'next-client-cookies/server';

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "WorkHubConnect",
  description: "Made by ALX Team 'ESSALHI MUSTAPHA, TAIBI ABOUBAKR , WAFI MOHAMED'",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("relative h-full font-sans antialiased", poppins.variable)}>
        <main className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">
            <ReduxStore>
              <CookiesProvider>
                <Navbar />
                <Toaster position="top-center" reverseOrder={false} />
                {children}
                <Footer/>
              </CookiesProvider>
            </ReduxStore>
          </div>
        </main>
      </body>
    </html>
  );
}
