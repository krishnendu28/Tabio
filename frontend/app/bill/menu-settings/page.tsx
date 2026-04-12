"use client";

import { BillSidebar } from "@/components/bill/BillSidebar";
import { TopHeader } from "@/components/bill/TopHeader";
import { Search } from "lucide-react";
import { useState } from "react";

const DUMMY_MENU_SETTINGS = [
  { token: "FD101", name: "Paneer Tikka", price: 320, tag: "Tandoori" },
  { token: "FD102", name: "Hara Bhara Kabab", price: 280, tag: "Veggie" },
  { token: "FD103", name: "Veg Manchurian", price: 240, tag: "Indo-Chinese" },
  { token: "FD104", name: "Chilli Paneer", price: 290, tag: "Spicy" },
  { token: "FD105", name: "Crispy Corn", price: 220, tag: "Crunchy" },
  { token: "FD106", name: "Mushroom Duplex", price: 310, tag: "Chef Special" },
  { token: "FD107", name: "Dahi Ke Sholay", price: 260, tag: "Classic" },
  { token: "FD108", name: "Soya Chaap Tikka", price: 270, tag: "Protein" },
  { token: "FD109", name: "Aloo Tikki Chaat", price: 150, tag: "Street Food" },
  { token: "FD110", name: "Paneer 65", price: 280, tag: "Spicy" },
];

export default function MenuSettingsPage() {
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState<Record<string, boolean>>(
    Object.fromEntries(DUMMY_MENU_SETTINGS.map((item) => [item.token, true]))
  );

  const filtered = DUMMY_MENU_SETTINGS.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return `${item.name} ${item.token} ${item.tag}`.toLowerCase().includes(q);
  });

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
             <div className="flex flex-col bg-white border border-gray-200 rounded max-w-4xl mx-auto">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 font-bold text-gray-800 flex justify-between items-center">
                   <span>Menu Item Availability (Item On/Off)</span>
                </div>

                <div className="p-4">
                   {/* Search Bar */}
                   <div className="relative mb-4 flex items-center gap-2">
                     <div className="relative flex-1 max-w-sm">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        <input
                           type="text"
                           placeholder="Search Menu Item"
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                           className="border border-gray-300 rounded px-2 py-2 pl-9 text-[12px] w-full outline-none focus:border-[#df343b]"
                        />
                     </div>
                   </div>

                   {/* List */}
                   <table className="w-full text-left text-sm text-gray-700 border border-gray-200">
                      <thead className="bg-gray-100 border-b border-gray-200 text-gray-600 font-bold text-[12px]">
                         <tr>
                            <th className="p-3">Token</th>
                            <th className="p-3">Item Name</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Price</th>
                            <th className="p-3 text-right">Status</th>
                         </tr>
                      </thead>
                      <tbody>
                         {filtered.map((item) => {
                            const isAvailable = availability[item.token];
                            return (
                               <tr key={item.token} className="border-b border-gray-100 hover:bg-gray-50">
                                  <td className="p-3 font-medium text-gray-800">{item.token}</td>
                                  <td className="p-3">{item.name}</td>
                                  <td className="p-3">{item.tag}</td>
                                  <td className="p-3">₹{item.price.toFixed(2)}</td>
                                  <td className="p-3 text-right">
                                     <button 
                                        type="button"
                                        onClick={() => setAvailability((prev) => ({...prev, [item.token]: !isAvailable}))}
                                        className={`px-3 py-1 font-bold text-[11px] rounded transition-colors ${
                                           isAvailable 
                                           ? "bg-green-100 text-green-700 hover:bg-green-200" 
                                           : "bg-red-100 text-red-700 hover:bg-red-200"
                                        }`}
                                     >
                                        {isAvailable ? "ON" : "OFF"}
                                     </button>
                                  </td>
                               </tr>
                            );
                         })}
                         {filtered.length === 0 && (
                            <tr>
                               <td colSpan={5} className="p-8 text-center text-gray-400">No items found</td>
                            </tr>
                         )}
                      </tbody>
                   </table>
                </div>
             </div>
          </main>
        </div>
      </div>
    </div>
  );
}
