import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster"
import { Poppins } from 'next/font/google';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});


export const metadata: Metadata = {
  title: "WorkHubConnect",
  description: "Generated by create ESSALHI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn("relative h-full font-sans antialiased", poppins.variable)}
      >
        <main className="relative flex flex-col min-h-screen">
   
            
         
          <div className="flex-grow  flex-1">
          <Navbar/>
          {children}
          <Toaster />
          <Footer/>
          </div>

        </main>
      </body>
    </html>
  );
}
