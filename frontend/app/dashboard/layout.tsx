import { Metadata } from "next";
import { BillSidebar } from "@/components/bill/BillSidebar";
import { TopHeader } from "@/components/bill/TopHeader";

export const metadata: Metadata = {
  title: "Tabio Web Dashboard",
  description: "Web Administration for Tabio POS",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#f1f2f6]">
      <div className="flex h-full flex-1 overflow-hidden">
        {/* Navigation Sidebars */}
        <div className="flex h-full flex-shrink-0">
          <BillSidebar />
        </div>

        {/* Flat Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden bg-[#f1f2f6]">
          <TopHeader />
          <main className="flex-1 overflow-auto bg-[#f1f2f6] p-4 sm:p-6">
             {children}
          </main>
        </div>
      </div>
    </div>
  );
}
