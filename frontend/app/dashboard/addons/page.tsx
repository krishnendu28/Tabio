"use client";

import { Download, Plus, Search } from "lucide-react";
import { useState } from "react";

export default function DashboardAddons() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="space-y-4 relative">
      <div className="flex items-center justify-between">
         <h1 className="text-xl font-medium text-gray-800">Addons Config</h1>
         <div className="text-sm text-gray-500">
            <span className="text-blue-600 hover:underline cursor-pointer">Home</span> {`>`} <span className="text-blue-600 hover:underline cursor-pointer">Menu Configuration</span> {`>`} Addons
         </div>
      </div>

      <div className="bg-white border-t-2 border-[#00a65a] shadow-sm rounded-sm">
         <div className="border-b border-gray-100 p-3">
            <div className="flex flex-wrap items-center gap-4">
               <div className="flex flex-col gap-1 w-64">
                  <div className="relative">
                     <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                     <input type="text" placeholder="Search addons..." className="border border-gray-300 rounded pl-8 pr-2 py-1.5 text-sm w-full outline-none focus:border-blue-500" />
                  </div>
               </div>
               <div className="flex items-end h-full">
                  <button className="bg-[#3c8dbc] text-white px-4 py-1.5 rounded text-sm font-bold shadow-sm hover:bg-blue-600">Search</button>
               </div>
               <div className="flex items-center gap-2 h-full ml-auto">
                  <button className="flex items-center gap-1 border border-gray-300 bg-gray-50 text-gray-700 px-3 py-1.5 rounded text-[13px] font-bold hover:bg-gray-100">
                     <Download className="w-3 h-3" /> Export
                  </button>
                  <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-1 bg-[#df343b] text-white px-3 py-1.5 rounded text-[13px] font-bold hover:bg-red-700">
                     <Plus className="w-3 h-3" /> Create Group
                  </button>
               </div>
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] text-gray-700">
               <thead className="bg-[#f9fafb] border-b border-gray-200 text-gray-500 font-bold uppercase text-[11px]">
                  <tr>
                     <th className="p-3">Addon Group Name</th>
                     <th className="p-3">Type</th>
                     <th className="p-3 w-20 text-center">Min</th>
                     <th className="p-3 w-20 text-center">Max</th>
                     <th className="p-3 w-48">Items Count</th>
                     <th className="p-3 w-24 text-center">Status</th>
                     <th className="p-3 w-24 text-center">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                     <td className="p-3 font-medium">Extra Toppings (Veg)</td>
                     <td className="p-3 text-blue-600 font-semibold">Multiple Add-ons</td>
                     <td className="p-3 text-center">0</td>
                     <td className="p-3 text-center">3</td>
                     <td className="p-3">4 choices</td>
                     <td className="p-3 text-center">
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">Active</span>
                     </td>
                     <td className="p-3 text-center">
                        <button className="text-blue-600 hover:underline mr-3">Edit</button>
                        <button className="text-red-600 hover:underline">Delete</button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div className="p-3 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
            <span>Showing 1 to 1 of 1 entries</span>
         </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
           <div className="w-96 rounded-lg bg-white p-6 shadow-xl">
              <h2 className="text-lg font-bold text-gray-800">Create Addon Group</h2>
              <div className="mt-4 flex flex-col gap-3">
                 <input type="text" placeholder="Group Name" className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
                 <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
                    <option>Single Selection</option>
                    <option>Multiple Add-ons</option>
                 </select>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                 <button onClick={() => setShowCreateModal(false)} className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium hover:bg-gray-100">Cancel</button>
                 <button onClick={() => { alert("Group Created Successfully!"); setShowCreateModal(false); }} className="rounded bg-[#00a65a] px-4 py-2 text-sm font-bold text-white hover:bg-green-600">Save Group</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
