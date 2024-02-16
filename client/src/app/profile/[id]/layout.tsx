import SideBar from "@/components/SideBar";

export default function ProfileLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      {/* Include shared UI here e.g. a header or sidebar */}
      <SideBar />

      <div className="flex-1 ml-[300px]">
        {children}
      </div>
    </section>
  );
}
