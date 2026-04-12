"use client";

import { Printer, Download, Eye } from "lucide-react";
import { useState } from "react";

export function OrderHistoryPanel() {
  const [orders] = useState([
    { id: "1", date: "28 Mar 2026", type: "Dine In", amount: 500, status: "Paid", payment: "Cash" },
    { id: "2", date: "28 Mar 2026", type: "Pick Up", amount: 120, status: "Paid", payment: "Card" },
    { id: "3", date: "29 Mar 2026", type: "Delivery", amount: 350, status: "Pending", payment: "Due" },
  ]);

  return (
    <div className="flex flex-col border border-gray-200 rounded">
       {/* Filter Bar */}
       <div className="flex items-center gap-4 p-3 border-b border-gray-200 bg-gray-50">
          <input type="date" className="border border-gray-300 rounded px-2 py-1 text-sm outline-none" />
          <input type="date" className="border border-gray-300 rounded px-2 py-1 text-sm outline-none" />
          <select className="border border-gray-300 rounded px-2 py-1 text-sm outline-none">
             <option>All Types</option>
             <option>Dine In</option>
             <option>Pick Up</option>
          </select>
          <button className="bg-red-600 text-white font-bold text-sm px-4 py-1.5 rounded hover:bg-red-700">Search</button>
       </div>

       {/* Table */}
       <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-[#fcfdfd] border-b border-gray-200 text-gray-500 font-bold uppercase text-[11px]">
             <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Type</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Payment</th>
                <th className="p-3 text-center">Actions</th>
             </tr>
          </thead>
          <tbody>
             {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                   <td className="p-3 text-red-600 font-semibold">#{order.id}</td>
                   <td className="p-3">{order.date}</td>
                   <td className="p-3">{order.type}</td>
                   <td className="p-3">₹{order.amount.toFixed(2)}</td>
                   <td className="p-3">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${order.status === "Paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                         {order.status}
                      </span>
                   </td>
                   <td className="p-3">{order.payment}</td>
                   <td className="p-3 text-center">
                      <button className="text-gray-500 hover:text-blue-600 mx-1"><Eye className="w-4 h-4 inline" /></button>
                      <button className="text-gray-500 hover:text-gray-900 mx-1"><Printer className="w-4 h-4 inline" /></button>
                      <button className="text-gray-500 hover:text-gray-900 mx-1"><Download className="w-4 h-4 inline" /></button>
                   </td>
                </tr>
             ))}
          </tbody>
       </table>
    </div>
  );
}
