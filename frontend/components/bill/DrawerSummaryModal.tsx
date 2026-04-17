"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, Receipt, IndianRupee, CreditCard, Smartphone, Banknote } from "lucide-react";

type SummaryData = {
  Cash: number;
  Card: number;
  UPI: number;
  Other: number;
  Total: number;
  Count: number;
};

const POS_API_BASE_URL = process.env.NEXT_PUBLIC_POS_API_BASE_URL ?? "http://localhost:8000";

export function DrawerSummaryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchSummary();
    }
  }, [isOpen]);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${POS_API_BASE_URL}/api/orders/day-summary`).catch(() => 
         axios.get(`${POS_API_BASE_URL}/orders/day-summary`)
      );
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch day summary", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-800">Daily Drawer Summary</h2>
          </div>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-200 transition-colors">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-10 gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#df343b] border-t-transparent"></div>
                <span className="text-sm text-gray-500 font-medium">Calculating today's sales...</span>
             </div>
          ) : data ? (
            <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <SummaryCard icon={Banknote} label="Cash Sales" value={data.Cash} color="text-emerald-600" bg="bg-emerald-50" />
                  <SummaryCard icon={CreditCard} label="Card Sales" value={data.Card} color="text-blue-600" bg="bg-blue-50" />
                  <SummaryCard icon={Smartphone} label="UPI Sales" value={data.UPI} color="text-purple-600" bg="bg-purple-50" />
                  <SummaryCard icon={IndianRupee} label="Other Sales" value={data.Other} color="text-amber-600" bg="bg-amber-50" />
               </div>

               <div className="mt-6 rounded-xl bg-gray-900 p-5 text-white shadow-lg">
                  <div className="flex justify-between items-center mb-1">
                     <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Total Transactions</span>
                     <span className="text-sm font-bold">{data.Count}</span>
                  </div>
                  <div className="flex justify-between items-end">
                     <span className="text-sm font-medium text-gray-300">Total Net Sales</span>
                     <span className="text-3xl font-black text-[#00ff88]">
                        ₹{data.Total.toLocaleString('en-IN')}
                     </span>
                  </div>
               </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">No sales data found for today.</p>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
           <button onClick={() => window.print()} className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-800 transition-colors">
              Print Report
           </button>
           <button onClick={onClose} className="bg-[#df343b] text-white px-6 py-2 rounded font-bold text-sm hover:bg-red-700 transition-shadow hover:shadow-lg">
              Close Drawer
           </button>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, color, bg }: any) {
   return (
      <div className={`${bg} ${color} p-4 rounded-xl flex flex-col gap-1 border border-white`}>
         <Icon className="h-4 w-4" />
         <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{label}</span>
         <span className="text-lg font-black tracking-tight">₹{value.toLocaleString('en-IN')}</span>
      </div>
   )
}
