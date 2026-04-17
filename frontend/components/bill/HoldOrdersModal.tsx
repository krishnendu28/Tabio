"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, HandMetal, Search, Clock, ExternalLink } from "lucide-react";

type HoldOrder = {
  id: string;
  customer: string;
  amount: number;
  itemCount: number;
  updatedAt: string;
  type: string;
  tableId?: string;
};

const POS_API_BASE_URL = process.env.NEXT_PUBLIC_POS_API_BASE_URL ?? "http://localhost:8000";

export function HoldOrdersModal({ isOpen, onClose, onResume }: { isOpen: boolean; onClose: () => void; onResume: (id: string) => void }) {
  const [orders, setOrders] = useState<HoldOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchHoldOrders();
    }
  }, [isOpen]);

  const fetchHoldOrders = async () => {
    try {
      setLoading(true);
      // In Petpooja, "Hold" often shows all active non-settled orders that aren't on a table yet, 
      // or specifically tagged "Hold". We'll fetch active orders and filter.
      const response = await axios.get(`${POS_API_BASE_URL}/api/orders/active`).catch(() => 
        axios.get(`${POS_API_BASE_URL}/orders/active`)
      );
      const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
      
      // Map to local format
      setOrders(data.map((o: any) => ({
         id: o.orderCode || o.id,
         customer: o.customer || "Guest",
         amount: o.amount || 0,
         itemCount: o.itemCount || 0,
         updatedAt: o.updatedAt,
         type: o.type || "Takeaway",
         tableId: o.tableId
      })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = orders.filter(o => 
    o.id.toLowerCase().includes(search.toLowerCase()) || 
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <HandMetal className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-gray-800">Parked / Hold Bills</h2>
          </div>
          <button onClick={onClose} className="rounded-full hover:bg-gray-200 p-2 transition-colors">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="p-4 bg-white border-b border-gray-50">
           <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input 
                 type="text" 
                 placeholder="Search by Order ID or Customer..." 
                 value={search}
                 onChange={e => setSearch(e.target.value)}
                 className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 text-sm outline-none focus:border-amber-400 transition-colors"
              />
           </div>
        </div>

        <div className="flex-1 overflow-auto p-4 flex flex-col gap-3">
           {loading ? (
             <div className="flex justify-center p-12 text-gray-400">Loading parked orders...</div>
           ) : filtered.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <HandMetal className="h-12 w-12 mb-2 opacity-20" />
                <p>No parked orders found</p>
             </div>
           ) : (
             filtered.map(order => (
               <div key={order.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white hover:border-amber-200 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                     <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Order #{order.id}</span>
                        <span className="text-lg font-bold text-gray-800">{order.customer}</span>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 mt-0.5">
                           <span className="flex items-center gap-1 uppercase bg-gray-100 px-1.5 py-0.5 rounded"><Clock className="w-3 h-3"/> {new Date(order.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                           <span className="flex items-center gap-1 uppercase bg-gray-100 px-1.5 py-0.5 rounded">{order.itemCount} Items</span>
                           {order.tableId && <span className="flex items-center gap-1 uppercase bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Table {order.tableId}</span>}
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-6">
                     <span className="text-xl font-black text-gray-800">₹{order.amount}</span>
                     <button 
                        onClick={() => { onResume(order.id); onClose(); }} 
                        className="flex items-center gap-2 bg-amber-500 text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-amber-600 active:scale-95 transition-all shadow-sm shadow-amber-200"
                     >
                        Resume <ExternalLink className="w-3 h-3" />
                     </button>
                  </div>
               </div>
             ))
           )}
        </div>

        <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-100">
           <p className="text-[11px] text-gray-400 font-medium italic underline decoration-amber-200 underline-offset-4 cursor-default">
              Hold orders are automatically synced across all POS terminals.
           </p>
        </div>
      </div>
    </div>
  );
}
