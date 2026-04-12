"use client";

import { Download, Plus, Search, X, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  tag: string;
  category: string;
  isActive: boolean;
};

const POS_API_BASE_URL = process.env.NEXT_PUBLIC_POS_API_BASE_URL ?? "http://localhost:8000";

export default function DashboardItems() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ id: "", name: "", price: "", tag: "", category: "General" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${POS_API_BASE_URL}/api/menu/all`).catch(async () => {
         return await axios.get(`${POS_API_BASE_URL}/menu/all`); // fallback route
      });
      setItems(Array.isArray(data) ? data : data?.data || []);
    } catch (error) {
      console.error("Failed to fetch menu items", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const lowerQ = searchQuery.toLowerCase();
    return items.filter(
      (item) => 
        item.name.toLowerCase().includes(lowerQ) || 
        (item.category || "").toLowerCase().includes(lowerQ) ||
        (item.tag || "").toLowerCase().includes(lowerQ)
    );
  }, [items, searchQuery]);

  const handleExport = () => {
    if (filteredItems.length === 0) return alert("No items to export.");
    const header = "Token,Item Name,Category,Price,Tax,Status\n";
    const csv = filteredItems.map((v, i) => `${i+1},"${v.name}","${v.category || 'General'}",${v.price},5%,${v.isActive?'Active':'Inactive'}`).join("\n");
    const blob = new Blob([header + csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "menu_items.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      await axios.delete(`${POS_API_BASE_URL}/api/menu/${id}`).catch(async () => {
        await axios.delete(`${POS_API_BASE_URL}/menu/${id}`);
      });
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      alert("Failed to delete item.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        price: Number(formData.price),
        tag: formData.tag,
        category: formData.category
      };

      if (showEditModal) {
        const { data } = await axios.put(`${POS_API_BASE_URL}/api/menu/${formData.id}`, payload).catch(async () => {
           return await axios.put(`${POS_API_BASE_URL}/menu/${formData.id}`, payload);
        });
        setItems(prev => prev.map(item => item.id === formData.id ? data : item));
        setShowEditModal(false);
      } else {
        const { data } = await axios.post(`${POS_API_BASE_URL}/api/menu`, payload).catch(async () => {
           return await axios.post(`${POS_API_BASE_URL}/menu`, payload);
        });
        setItems(prev => [...prev, data]);
        setShowAddModal(false);
      }
    } catch (error) {
      alert("Failed to save menu item. Check network.");
    }
  };

  const openEdit = (item: MenuItem) => {
    setFormData({
      id: item.id,
      name: item.name,
      price: String(item.price),
      tag: item.tag || "",
      category: item.category || "General"
    });
    setShowEditModal(true);
  };

  const openAdd = () => {
    setFormData({ id: "", name: "", price: "", tag: "", category: "General" });
    setShowAddModal(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
         <h1 className="text-xl font-medium text-gray-800">Menu Items</h1>
          <div className="text-sm text-gray-500">
            <Link href="/dashboard" className="text-blue-600 hover:underline cursor-pointer">Home</Link> {`>`} <span className="text-blue-600 hover:underline cursor-pointer">Menu Configuration</span> {`>`} Items
         </div>
      </div>

      <div className="bg-white border-t-2 border-[#00a65a] shadow-sm rounded-sm">
         <div className="border-b border-gray-100 p-3">
            <div className="flex flex-wrap items-center gap-4">
               <div className="flex flex-col gap-1 w-64">
                  <div className="relative">
                     <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                     <input 
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       type="text" 
                       placeholder="Search by name, tag or category..." 
                       className="border border-gray-300 rounded pl-8 pr-2 py-1.5 text-sm w-full outline-none focus:border-blue-500" 
                     />
                  </div>
               </div>
               <div className="flex items-center gap-2 h-full ml-auto">
                  <button onClick={handleExport} className="flex items-center gap-1 border border-gray-300 bg-gray-50 text-gray-700 px-3 py-1.5 rounded text-[13px] font-bold hover:bg-gray-100">
                     <Download className="w-3 h-3" /> Export
                  </button>
                  <button onClick={openAdd} className="flex items-center gap-1 bg-[#df343b] text-white px-3 py-1.5 rounded text-[13px] font-bold hover:bg-red-700">
                     <Plus className="w-3 h-3" /> Add Item
                  </button>
               </div>
            </div>
         </div>
         
         <div className="overflow-x-auto min-h-[400px]">
             {loading ? (
                 <div className="flex items-center justify-center p-10 text-gray-500">Loading Menu Items...</div>
             ) : (
                <table className="w-full text-left text-[13px] text-gray-700">
                   <thead className="bg-[#f9fafb] border-b border-gray-200 text-gray-500 font-bold uppercase text-[11px]">
                      <tr>
                         <th className="p-3 w-16">Token</th>
                         <th className="p-3">Item Name</th>
                         <th className="p-3 w-32">Category</th>
                         <th className="p-3 w-24">Base Price</th>
                         <th className="p-3 w-20 text-center">Taxes</th>
                         <th className="p-3 w-24 text-center">Status</th>
                         <th className="p-3 w-24 text-center">Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {filteredItems.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-4 text-center text-gray-400">No items found.</td>
                        </tr>
                      ) : (
                        filteredItems.map((item, idx) => (
                           <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                             <td className="p-3 text-gray-500 font-mono">{idx + 1}</td>
                             <td className="p-3 font-medium">{item.name} <span className="text-xs text-gray-400 ml-2">({item.tag})</span></td>
                             <td className="p-3">{item.category || "General"}</td>
                             <td className="p-3">₹ {item.price.toFixed(2)}</td>
                             <td className="p-3 text-center">5%</td>
                             <td className="p-3 text-center">
                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                   {item.isActive ? 'Active' : 'Inactive'}
                                </span>
                             </td>
                             <td className="p-3 text-center">
                                <button onClick={() => openEdit(item)} className="text-blue-600 hover:text-blue-800 mr-3">
                                   <Edit className="w-4 h-4 inline" />
                                </button>
                                <button onClick={() => handleDelete(item.id, item.name)} className="text-red-600 hover:text-red-800">
                                   <Trash2 className="w-4 h-4 inline" />
                                </button>
                             </td>
                          </tr>
                        ))
                      )}
                   </tbody>
                </table>
             )}
         </div>
      </div>

      {/* Shared Modal for Add / Edit */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
           <div className="w-[450px] bg-white rounded-md shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
                 <h2 className="font-bold text-gray-800">{showAddModal ? "Add New Menu Item" : "Edit Menu Item"}</h2>
                 <button onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="text-gray-500 hover:text-red-600">
                    <X className="w-5 h-5" />
                 </button>
              </div>
              <form onSubmit={handleSave} className="p-4 space-y-4">
                 <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Item Name *</label>
                    <input autoFocus required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500" placeholder="e.g. Garlic Naan" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-xs font-bold text-gray-700 mb-1">Price (₹) *</label>
                       <input required type="number" min="0" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500" placeholder="e.g. 150" />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                       <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500">
                          <option value="General">General</option>
                          <option value="Breads">Breads</option>
                          <option value="Mains">Mains</option>
                          <option value="Starters">Starters</option>
                          <option value="Beverages">Beverages</option>
                       </select>
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Tag (Search keywords)</label>
                    <input type="text" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500" placeholder="e.g. Spicy, Vegan" />
                 </div>
                 <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                    <button type="button" onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="px-4 py-2 border border-gray-300 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-[#df343b] text-white rounded text-sm font-bold shadow-sm hover:bg-red-700">Save Item</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
