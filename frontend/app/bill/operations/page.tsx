"use client";

import { BillSidebar } from "@/components/bill/BillSidebar";
import { TopHeader } from "@/components/bill/TopHeader";
import { Copy, FileText, Ban, Trash2, SplitSquareHorizontal, HandCoins, Box, Receipt, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ExpenseModal } from "@/components/bill/ExpenseModal";
import { SplitBillModal } from "@/components/bill/SplitBillModal";

export default function OperationsPage() {
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showSplitModal, setShowSplitModal] = useState(false);

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
          
          <main className="flex-1 overflow-auto p-4">
             <div className="grid grid-cols-3 gap-6 text-[#374151]">
                
                {/* Column 1 */}
                <div className="rounded border border-gray-200 bg-white">
                   <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 font-bold text-gray-800">
                      Orders & Billing
                   </div>
                   <div className="flex flex-col">
                      <Link href="/bill" className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50">
                         <Copy className="h-4 w-4 text-gray-500" /> All Orders
                      </Link>
                      <button onClick={() => alert("Initiating Bill Print for selected table...")} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left">
                         <FileText className="h-4 w-4 text-gray-500" /> Print Bill
                      </button>
                      <button onClick={() => alert("Voiding selected bill...")} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left">
                         <Ban className="h-4 w-4 text-gray-500" /> Void Bills
                      </button>
                      <button onClick={() => alert("Un-settling selected bill back to Open State...")} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left">
                         <RefreshCcw className="h-4 w-4 text-gray-500" /> Unsettle Bills
                      </button>
                      <button onClick={() => alert("Item Cancellation tool opened.")} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left">
                         <Trash2 className="h-4 w-4 text-gray-500" /> Item Cancellation
                      </button>
                      <button onClick={() => alert("Viewing Cancelled Bills History...")} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left">
                         <Trash2 className="h-4 w-4 text-gray-500" /> Cancelled Bills
                      </button>
                      <button onClick={() => setShowSplitModal(true)} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left">
                         <SplitSquareHorizontal className="h-4 w-4 text-gray-500" /> Split Bills
                      </button>
                   </div>
                </div>

                {/* Column 2 */}
                <div className="rounded border border-gray-200 bg-white h-min">
                   <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 font-bold text-gray-800">
                      Payments & Finance
                   </div>
                   <div className="flex flex-col">
                      <button onClick={() => alert("Showing Due Amount ledgers...")} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left">
                         <Receipt className="h-4 w-4 text-gray-500" /> Due / Due payment
                      </button>
                      <button onClick={() => setShowExpenseModal(true)} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left">
                         <HandCoins className="h-4 w-4 text-gray-500" /> Expense
                      </button>
                   </div>
                </div>

                {/* Column 3 */}
                <div className="rounded border border-gray-200 bg-white h-min">
                   <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 font-bold text-gray-800">
                      Menu & Inventory
                   </div>
                   <div className="flex flex-col">
                      <Link href="/dashboard/items" className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50">
                         <Box className="h-4 w-4 text-gray-500" /> Item On/Off
                      </Link>
                      <Link href="/dashboard/kot" className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50">
                         <Ban className="h-4 w-4 text-gray-500" /> Check Canceled KOT
                      </Link>
                      <button onClick={() => alert("Viewing future scheduled orders...")} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left">
                         <Copy className="h-4 w-4 text-gray-500" /> Future Orders
                      </button>
                   </div>
                </div>

             </div>
          </main>
        </div>
      </div>

      <ExpenseModal isOpen={showExpenseModal} onClose={() => setShowExpenseModal(false)} />
      <SplitBillModal grandTotal={1500} isOpen={showSplitModal} onClose={() => setShowSplitModal(false)} onSave={(splits) => { alert("Saved Bill Splits!"); setShowSplitModal(false); }} />
    </div>
  );
}
