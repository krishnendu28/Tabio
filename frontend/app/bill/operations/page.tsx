"use client";

import { BillSidebar } from "@/components/bill/BillSidebar";
import { TopHeader } from "@/components/bill/TopHeader";
import { Copy, FileText, Ban, Trash2, SplitSquareHorizontal, HandCoins, Box, Receipt, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { ExpenseModal } from "@/components/bill/ExpenseModal";
import { SplitBillModal } from "@/components/bill/SplitBillModal";

const POS_API_BASE_URL = process.env.NEXT_PUBLIC_POS_API_BASE_URL ?? "http://localhost:8000";

export default function OperationsPage() {
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUnsettle = async () => {
    const id = prompt("Enter Order ID to unsettle (e.g. #B-101):");
    if (!id) return;
    try {
      setLoading(true);
      const cleanId = id.replace("#", "");
      await axios.patch(`${POS_API_BASE_URL}/api/orders/${cleanId}/unsettle`).catch(() => 
        axios.patch(`${POS_API_BASE_URL}/orders/${cleanId}/unsettle`)
      );
      alert(`Order ${id} has been moved back to Open status.`);
    } catch (err) {
      alert("Failed to unsettle order. Please check the ID.");
    } finally {
      setLoading(false);
    }
  };

  const handleVoid = async () => {
     const id = prompt("Enter Order ID to VOID:");
     if (!id) return;
     if (!confirm(`Are you sure you want to VOID order ${id}? This cannot be undone.`)) return;
     try {
       setLoading(true);
       const cleanId = id.replace("#", "");
       await axios.patch(`${POS_API_BASE_URL}/api/orders/${cleanId}/cancel`, { cancelReason: "Voided from Operations" }).catch(() => 
         axios.patch(`${POS_API_BASE_URL}/orders/${cleanId}/cancel`, { cancelReason: "Voided from Operations" })
       );
       alert(`Order ${id} is now VOIDED.`);
     } catch (err) {
       alert("Failed to void order.");
     } finally {
       setLoading(false);
     }
  };

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
          
          <main className="flex-1 overflow-auto p-4 transition-opacity duration-200" style={{ opacity: loading ? 0.6 : 1 }}>
             <div className="grid grid-cols-3 gap-6 text-[#374151]">
                
                {/* Column 1 */}
                <div className="rounded border border-gray-200 bg-white">
                   <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 font-bold text-gray-800 uppercase text-[12px] tracking-wide">
                      Orders & Billing
                   </div>
                   <div className="flex flex-col">
                      <Link href="/bill" className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 transition-colors">
                         <Copy className="h-4 w-4 text-gray-400" /> All Orders
                      </Link>
                      <button onClick={() => window.print()} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left transition-colors">
                         <FileText className="h-4 w-4 text-gray-400" /> Print Bill
                      </button>
                      <button onClick={handleVoid} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left transition-colors font-medium text-rose-600">
                         <Ban className="h-4 w-4 text-rose-400" /> Void Bills
                      </button>
                      <button onClick={handleUnsettle} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left transition-colors">
                         <RefreshCcw className="h-4 w-4 text-amber-500" /> Unsettle Bills
                      </button>
                      <button onClick={() => alert("Please select an order from 'All Orders' to cancel items.")} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left transition-colors">
                         <Trash2 className="h-4 w-4 text-gray-400" /> Item Cancellation
                      </button>
                      <Link href="/dashboard/kot" className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 transition-colors">
                         <Trash2 className="h-4 w-4 text-gray-400" /> Cancelled Bills
                      </Link>
                      <button onClick={() => setShowSplitModal(true)} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left transition-colors">
                         <SplitSquareHorizontal className="h-4 w-4 text-gray-400" /> Split Bills
                      </button>
                   </div>
                </div>

                {/* Column 2 */}
                <div className="rounded border border-gray-200 bg-white h-min">
                   <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 font-bold text-gray-800 uppercase text-[12px] tracking-wide">
                      Payments & Finance
                   </div>
                   <div className="flex flex-col">
                      <button onClick={() => alert("Showing Due Amount ledgers...")} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left transition-colors">
                         <Receipt className="h-4 w-4 text-gray-400" /> Due / Due payment
                      </button>
                      <button onClick={() => setShowExpenseModal(true)} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left transition-colors">
                         <HandCoins className="h-4 w-4 text-emerald-500" /> Expense
                      </button>
                   </div>
                </div>

                {/* Column 3 */}
                <div className="rounded border border-gray-200 bg-white h-min">
                   <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 font-bold text-gray-800 uppercase text-[12px] tracking-wide">
                      Menu & Inventory
                   </div>
                   <div className="flex flex-col">
                      <Link href="/dashboard/items" className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 transition-colors">
                         <Box className="h-4 w-4 text-blue-500" /> Item On/Off
                      </Link>
                      <Link href="/dashboard/kot" className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 transition-colors">
                         <Ban className="h-4 w-4 text-gray-400" /> Check Canceled KOT
                      </Link>
                      <button onClick={() => alert("Viewing future scheduled orders...")} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm hover:bg-gray-50 text-left transition-colors">
                         <Copy className="h-4 w-4 text-gray-400" /> Future Orders
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
