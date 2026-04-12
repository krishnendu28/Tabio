"use client";

import { Download, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const POS_API_BASE_URL = process.env.NEXT_PUBLIC_POS_API_BASE_URL ?? "http://localhost:8000";

type CancelledOrder = {
  id: string;
  createdAt: string;
  cancelReason: string;
  subtotal?: number;
  itemCount: number;
  customer: string;
  items: {
    id: string;
    name: string;
    qty: number;
    price: number;
  }[];
};

export default function DashboardKOTs() {
  const [orders, setOrders] = useState<CancelledOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCancelled();
  }, []);

  const fetchCancelled = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${POS_API_BASE_URL}/api/orders/cancelled`).catch(async () => {
         return await axios.get(`${POS_API_BASE_URL}/orders/cancelled`);
      });
      setOrders(Array.isArray(data) ? data : data?.data || []);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    if (!search.trim()) return orders;
    const lower = search.toLowerCase();
    return orders.filter(o => o.id.toLowerCase().includes(lower) || o.customer?.toLowerCase().includes(lower) || o.cancelReason?.toLowerCase().includes(lower));
  }, [orders, search]);

  const handleExport = () => {
    if (filteredOrders.length === 0) return alert("Nothing to export.");
    const header = "Date,Order No,Customer,Items Qty,Reason\n";
    const csv = filteredOrders.map(o => `"${new Date(o.createdAt).toLocaleString()}","${o.id}","${o.customer}",${o.itemCount},"${o.cancelReason}"`).join("\n");
    const blob = new Blob([header + csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "cancelled_orders.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
         <h1 className="text-xl font-medium text-gray-800">Canceled KOTs Report</h1>
         <div className="text-sm text-gray-500">
            <Link href="/dashboard" className="text-blue-600 hover:underline cursor-pointer">Home</Link> {`>`} Canceled KOTs
         </div>
      </div>

      <div className="bg-white border-t-2 border-[#f39c12] shadow-sm rounded-sm">
         <div className="border-b border-gray-100 p-3">
            <div className="flex flex-wrap items-center gap-4">
               <div className="flex flex-col gap-1 w-48">
                  <span className="text-[11px] font-bold text-gray-700">Search</span>
                  <div className="relative">
                     <Search className="absolute left-2 top-1.5 w-3 h-3 text-gray-400" />
                     <input 
                       type="text" 
                       value={search}
                       onChange={e => setSearch(e.target.value)}
                       placeholder="Search by ID or Reason..." 
                       className="border border-gray-300 rounded pl-7 pr-2 py-1 text-xs w-full" 
                     />
                  </div>
               </div>
               <div className="flex items-end h-full ml-auto pb-1">
                  <button onClick={handleExport} className="flex items-center gap-1 border border-gray-300 bg-gray-50 text-gray-700 px-3 py-1.5 rounded text-xs font-bold hover:bg-gray-100">
                     <Download className="w-3 h-3" /> Export
                  </button>
               </div>
            </div>
         </div>
         
         <div className="overflow-x-auto min-h-[400px]">
             {loading ? (
                 <div className="flex justify-center p-10 text-gray-500">Loading Report...</div>
             ) : (
                <table className="w-full text-left text-sm text-gray-700">
                   <thead className="bg-[#f9fafb] border-b border-gray-200 text-gray-500 font-bold uppercase text-[11px]">
                      <tr>
                         <th className="p-3 whitespace-nowrap">Date & Time</th>
                         <th className="p-3 whitespace-nowrap">Order No.</th>
                         <th className="p-3 whitespace-nowrap">Customer</th>
                         <th className="p-3 whitespace-nowrap">Items</th>
                         <th className="p-3 whitespace-nowrap">Quantity</th>
                         <th className="p-3 whitespace-nowrap">Reason</th>
                      </tr>
                   </thead>
                   <tbody>
                      {filteredOrders.length === 0 ? (
                        <tr>
                           <td colSpan={6} className="p-8 text-center text-gray-400">No canceled records found.</td>
                        </tr>
                      ) : (
                        filteredOrders.map(order => (
                          <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                             <td className="p-3 font-mono text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</td>
                             <td className="p-3 font-medium text-[#3c8dbc]">{order.id}</td>
                             <td className="p-3">{order.customer || 'Guest'}</td>
                             <td className="p-3 max-w-[200px] truncate text-xs text-gray-500">
                                {order.items?.map(i => i.name).join(', ') || 'No Items'}
                             </td>
                             <td className="p-3">{order.itemCount}</td>
                             <td className="p-3">
                                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[11px] font-bold">
                                   {order.cancelReason || 'Unknown'}
                                </span>
                             </td>
                          </tr>
                        ))
                      )}
                   </tbody>
                </table>
             )}
         </div>
      </div>
    </div>
  );
}
