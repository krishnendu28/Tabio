"use client";

import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const POS_API_BASE_URL = process.env.NEXT_PUBLIC_POS_API_BASE_URL ?? "http://localhost:8000";

type KOTCardProps = {
  orderId: string;
  orderNo: string;
  type: string;
  kotNo: string;
  time: string;
  customerName: string;
  mobile: string;
  items: { name: string; qty: number }[];
  color: string;
  onReady: (id: string) => void;
};

function KOTCard({ orderId, orderNo, type, kotNo, time, customerName, mobile, items, color, onReady }: KOTCardProps) {
  return (
    <div className="flex flex-col rounded border border-gray-200 bg-white overflow-hidden shadow-sm animate-in fade-in duration-300">
      {/* Header */}
      <div className={`flex items-center justify-between px-3 py-2 text-white font-bold text-[12px]`} style={{ backgroundColor: color }}>
        <div className="flex flex-col items-center">
          <span>{orderNo}</span>
          <span className="text-[10px] uppercase font-semibold">{type}</span>
        </div>
        <div className="flex flex-col items-center">
          <span>{kotNo}</span>
          <span className="text-[10px] uppercase font-semibold">KOT No.</span>
        </div>
        <div className="flex flex-col items-center text-right">
          <span>{time}</span>
          <span className="text-[10px] uppercase font-semibold">MM:SS</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-2 flex flex-col flex-1 bg-white">
         <div className="flex justify-between text-[11px] font-bold text-gray-700 bg-gray-100 px-2 py-1 mb-1">
            <span>Item</span>
            <span>Qty.</span>
         </div>
         {(customerName || mobile) && (
           <div className="flex justify-between text-[11px] font-bold text-gray-800 px-2 py-1 pb-2 border-b border-gray-200 mb-1">
              <span>{customerName || "Guest"}</span>
              <span>{mobile}</span>
           </div>
         )}
         
         <div className="flex flex-col gap-1 px-2 text-[11px] text-gray-700 font-medium overflow-auto max-h-[120px]">
             <div className="flex items-center gap-1 text-gray-500 mb-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                biller (biller)
             </div>
             {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start py-1 border-b border-gray-50 last:border-0">
                   <span className="pr-2">{item.name}</span>
                   <span>{item.qty}</span>
                </div>
             ))}
         </div>
         
         <div className="mt-auto pt-3 pb-1 flex justify-center">
            <button 
               onClick={(e) => { e.stopPropagation(); onReady(orderId); }}
               className="bg-[#df343b] text-white font-bold text-[11px] px-6 py-1.5 rounded hover:bg-red-700 active:scale-95 transition-all shadow-sm"
            >
               Food Is Ready
            </button>
         </div>
      </div>
    </div>
  );
}

export function LiveViewPanel() {
  const [activeTab, setActiveTab] = useState<"Order View" | "Kot View">("Kot View");
  const [kots, setKots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
     fetchKots();
     const interval = setInterval(fetchKots, 10000); // Polling every 10s
     return () => clearInterval(interval);
  }, []);

  const fetchKots = async () => {
    try {
      const response = await axios.get(`${POS_API_BASE_URL}/api/orders/active`).catch(() => 
        axios.get(`${POS_API_BASE_URL}/orders/active`)
      );
      const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
      
      // Filter for those with preparationStatus pending
      const filtered = data.filter((o: any) => o.preparationStatus !== "prepared");
      setKots(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFoodReady = async (id: string) => {
     try {
        await axios.patch(`${POS_API_BASE_URL}/api/orders/${id}/status`, { preparationStatus: "prepared" }).catch(() => 
          axios.patch(`${POS_API_BASE_URL}/orders/${id}/status`, { preparationStatus: "prepared" })
        );
        setKots(prev => prev.filter(o => (o.orderCode || o.id) !== id));
        
        // Notify backend (Alert)
        await axios.post(`${POS_API_BASE_URL}/api/alerts`, {
           message: `Order #${id} is READY for delivery!`,
           type: "Info"
        }).catch(() => {});
        
     } catch (err) {
        alert("Failed to mark food as ready.");
     }
  };

  const filteredKots = kots.filter(k => 
     (k.orderCode || "").toLowerCase().includes(search.toLowerCase()) ||
     (k.customer || "").toLowerCase().includes(search.toLowerCase())
  );

  const getColor = (type: string) => {
     switch(type) {
        case "Delivery": return "#16a34a";
        case "Dine-In": return "#f59e0b";
        case "Takeaway": return "#0ea5e9";
        default: return "#6b7280";
     }
  };

  return (
    <div className="flex flex-col h-full bg-[#fdfdfd]">
       <div className="flex items-center gap-4 bg-white px-4 border-b border-gray-200">
         <Link href="/bill" className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-red-600 w-24">
            <ArrowLeft className="w-4 h-4" /> Back
         </Link>
         <button 
           onClick={() => setActiveTab("Order View")}
           className={`px-4 py-3 text-sm font-bold border-b-2 ${activeTab === "Order View" ? "border-red-600 text-red-600" : "border-transparent text-gray-600"}`}
         >
           Order View
         </button>
         <button 
           onClick={() => setActiveTab("Kot View")}
           className={`px-4 py-3 text-sm font-bold border-b-2 ${activeTab === "Kot View" ? "border-red-600 text-red-600" : "border-transparent text-gray-600"}`}
         >
           Kot View
         </button>
       </div>

       <div className="flex-1 overflow-auto p-4 flex flex-col gap-4">
         {/* Top Controls Grid */}
         <div className="flex justify-between items-start">
            <div className="relative">
               <Search className="w-4 h-4 text-gray-400 absolute left-2 top-2" />
               <input 
                  type="text" 
                  placeholder="Search" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1.5 pl-8 text-sm outline-none" 
               />
            </div>

            <div className="flex flex-col gap-2 relative">
               <div className="flex items-center gap-3 text-[11px] font-bold text-gray-700 right-0 justify-end">
                  <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-600"></div> Delivery</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Limit Exceed</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Dine In</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Pick Up</span>
               </div>
               
               <div className="flex items-center gap-2 mt-2">
                  <input type="text" placeholder="Enter kot/Order no." className="border border-gray-300 rounded-sm px-2 py-1 text-sm outline-none w-48" />
                  <button className="bg-[#df343b] text-white font-bold text-[12px] px-4 py-1.5 rounded-sm">MFR</button>
               </div>
            </div>
         </div>

         {/* Grid */}
         {loading ? (
           <div className="flex justify-center p-20 text-gray-400">Loading KOTs...</div>
         ) : filteredKots.length === 0 ? (
           <div className="flex flex-col items-center justify-center p-20 text-gray-400">
              <PieChart className="w-16 h-16 opacity-10 mb-2" />
              <p>No active kitchen orders</p>
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
              {filteredKots.map((k, i) => (
                 <KOTCard 
                   key={k.orderCode || i}
                   orderId={k.orderCode || k.id}
                   orderNo={String(i + 1)}
                   type={k.type || "Dine-In"}
                   kotNo={k.orderCode || "N/A"}
                   time="00:00"
                   customerName={k.customer}
                   mobile={k.mobile}
                   color={getColor(k.type)}
                   items={k.items?.map((it: any) => ({ name: it.name, qty: it.qty })) || []}
                   onReady={handleFoodReady}
                 />
              ))}
           </div>
         )}
       </div>
    </div>
  );
}
