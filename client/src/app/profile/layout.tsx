import SideBar from "@/components/SideBar";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export default function ProfileLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex",poppins.variable)}>
      <SideBar />
      
        {/* Main content */}
        <div className="flex-grow ">{children}</div>
     
    </div>
  );
}
