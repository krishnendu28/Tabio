"use client";

import { Info } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
       <div className="flex flex-wrap gap-4 justify-between items-center bg-white p-3 border-t-4 border-[#d2d6de] shadow-sm">
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
                <span className="text-[12px] font-bold text-gray-700">STORE</span>
                <span className="text-[14px]">Tabio Store</span>
             </div>
             <div className="flex flex-col">
                <span className="text-[12px] font-bold text-gray-700">STORE CODE</span>
                <span className="text-[14px]">T-01</span>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <select className="border border-gray-300 rounded-sm px-2 py-1 text-sm outline-none">
                <option>Today</option>
             </select>
             <span className="text-sm font-medium">28-03-2026 to 28-03-2026</span>
          </div>
       </div>

       {/* Key Metrics Grid */}
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-[#00c0ef] text-white p-4 rounded shadow relative overflow-hidden group">
             <h3 className="text-3xl font-bold">0</h3>
             <p className="mt-1 text-sm">Today&apos;s Orders</p>
          </div>
          <div className="bg-[#00a65a] text-white p-4 rounded shadow relative overflow-hidden group">
             <h3 className="text-3xl font-bold">0</h3>
             <p className="mt-1 text-sm">Net Sales</p>
          </div>
          <div className="bg-[#f39c12] text-white p-4 rounded shadow relative overflow-hidden group">
             <h3 className="text-3xl font-bold">0</h3>
             <p className="mt-1 text-sm">Paid Amount</p>
          </div>
          <div className="bg-[#dd4b39] text-white p-4 rounded shadow relative overflow-hidden group">
             <h3 className="text-3xl font-bold">0</h3>
             <p className="mt-1 text-sm">Due Amount</p>
          </div>
          <div className="bg-white text-gray-700 border-l-4 border-gray-400 p-4 rounded shadow relative overflow-hidden group">
             <h3 className="text-3xl font-bold">0</h3>
             <p className="mt-1 text-sm">Discount</p>
          </div>
          <div className="bg-white text-gray-700 border-l-4 border-gray-400 p-4 rounded shadow relative overflow-hidden group">
             <h3 className="text-3xl font-bold">0</h3>
             <p className="mt-1 text-sm">Round Off</p>
          </div>
       </div>

       {/* Second row of metrics */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-t-2 border-[#3c8dbc] shadow-sm rounded p-0">
             <div className="border-b border-gray-100 p-3 flex justify-between items-center">
                <h3 className="font-bold text-gray-700 text-sm">Amount Comparison</h3>
             </div>
             <div className="p-4 h-64 flex items-center justify-center text-gray-400 text-sm">
                No data available for this period.
             </div>
          </div>
          <div className="bg-white border-t-2 border-[#00a65a] shadow-sm rounded p-0">
             <div className="border-b border-gray-100 p-3 flex justify-between items-center">
                <h3 className="font-bold text-gray-700 text-sm">Order Count By Source</h3>
             </div>
             <div className="p-4 h-64 flex items-center justify-center text-gray-400 text-sm">
                No data available for this period.
             </div>
          </div>
       </div>
    </div>
  );
}
