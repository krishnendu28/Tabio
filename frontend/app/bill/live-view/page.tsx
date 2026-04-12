"use client";

import { BillSidebar } from "@/components/bill/BillSidebar";
import { TopHeader } from "@/components/bill/TopHeader";
import { LiveViewPanel } from "@/components/bill/LiveViewPanel";

export default function LiveViewPage() {
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
          <main className="flex-1 overflow-auto bg-[#f1f2f6]">
            <LiveViewPanel />
          </main>
        </div>
      </div>
    </div>
  );
}
