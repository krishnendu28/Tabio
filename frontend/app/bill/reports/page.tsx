"use client";

import { BillSidebar } from "@/components/bill/BillSidebar";
import { TopHeader } from "@/components/bill/TopHeader";
import { OrderHistoryPanel } from "@/components/bill/OrderHistoryPanel";

export default function ReportsPage() {
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
          <main className="flex-1 overflow-auto bg-white p-4">
            <h2 className="mb-4 text-xl font-bold text-gray-800 border-b pb-2">Order Summary Report</h2>
            <OrderHistoryPanel />
          </main>
        </div>
      </div>
    </div>
  );
}
