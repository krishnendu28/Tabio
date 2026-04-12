"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import type { MenuItem } from "./types";

type AddonGroup = {
  id: string;
  name: string;
  isVeg: boolean;
  min: number;
  max: number;
  type: "multiple" | "single";
  items: { id: string; name: string; price: number; isVeg: boolean }[];
};

// DUMMY ADDONS FOR NOW
const DUMMY_ADDONS: AddonGroup[] = [
  {
    id: "group1",
    name: "Veg Add-on",
    isVeg: true,
    min: 0,
    max: 3,
    type: "multiple",
    items: [
      { id: "a1", name: "Cheese", price: 20, isVeg: true },
      { id: "a2", name: "Mayo", price: 20, isVeg: true },
      { id: "a3", name: "Spicy", price: 20, isVeg: true },
      { id: "a4", name: "Peri Peri", price: 15, isVeg: true },
    ],
  },
  {
    id: "group2",
    name: "NON Veg Add On",
    isVeg: false,
    min: 0,
    max: 4,
    type: "single",
    items: [
      { id: "a5", name: "Cheese", price: 20, isVeg: false },
      { id: "a6", name: "Mayo", price: 20, isVeg: false },
      { id: "a7", name: "Chicken", price: 20, isVeg: false },
      { id: "a8", name: "Spicy", price: 10, isVeg: false },
      { id: "a9", name: "Peri Peri", price: 10, isVeg: false },
      { id: "a10", name: "Shezwan Dip", price: 20, isVeg: false },
    ],
  },
];

type AddonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  baseItem: MenuItem | null;
  onSave: (addons: { id: string; qty: number; price: number }[]) => void;
};

export function AddonModal({ isOpen, onClose, baseItem, onSave }: AddonModalProps) {
  const [search, setSearch] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>({});

  if (!isOpen || !baseItem) return null;

  const handleToggleAddon = (groupId: string, itemId: string, isSingle: boolean) => {
    setSelectedAddons((prev) => {
       const next = { ...prev };
       if (isSingle) {
          // In single mode, clear other items in this group
          DUMMY_ADDONS.find(g => g.id === groupId)?.items.forEach(i => {
             if (i.id !== itemId) delete next[i.id];
          });
       }
       if (next[itemId]) {
          delete next[itemId];
       } else {
          next[itemId] = 1;
       }
       return next;
    });
  };

  const handleUpdateQty = (itemId: string, delta: number) => {
    setSelectedAddons((prev) => {
       const qty = prev[itemId] || 0;
       const nextQty = Math.max(0, qty + delta);
       const next = { ...prev };
       if (nextQty === 0) {
          delete next[itemId];
       } else {
          next[itemId] = nextQty;
       }
       return next;
    });
  };

  const handleSave = () => {
    const arr = Object.entries(selectedAddons).map(([id, qty]) => {
      // Find price
      for (const g of DUMMY_ADDONS) {
         const item = g.items.find(i => i.id === id);
         if (item) return { id, qty, price: item.price };
      }
      return { id, qty, price: 0 };
    });
    onSave(arr);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/60 p-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h2 className="text-[14px] font-bold text-[#374151]">
            {baseItem.name} | ₹{baseItem.price.toFixed(2)}
          </h2>
          <button type="button" onClick={onClose} className="rounded-full bg-gray-100 p-1 text-gray-600 hover:bg-gray-200">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search addon item"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded border border-gray-300 py-2 pl-9 pr-3 text-[12px] outline-none focus:border-[#df343b]"
            />
          </div>

          <div className="flex flex-col gap-6">
            {DUMMY_ADDONS.map((group) => (
              <div key={group.id}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-[12px] font-bold text-gray-800">{group.name}</span>
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600">
                    {group.type === "multiple" ? "Multiple Add-ons" : "Single Add-on Only"} (Min: {group.min}, Max: {group.max})
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {group.items
                    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
                    .map((item) => {
                      const qty = selectedAddons[item.id] || 0;
                      const isSelected = qty > 0;

                      return (
                        <div
                          key={item.id}
                          className={`relative flex h-16 cursor-pointer flex-col justify-center rounded border p-2 text-center transition-colors ${
                            isSelected ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => {
                             if (!isSelected) {
                                handleToggleAddon(group.id, item.id, group.type === "single");
                             }
                          }}
                        >
                          <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l ${item.isVeg ? "bg-emerald-500" : "bg-red-500"}`} />
                          
                          {isSelected ? (
                            <>
                              <div className="absolute -top-2 left-1/2 flex -translate-x-1/2 items-center overflow-hidden rounded-full border border-emerald-500 bg-white text-[11px] shadow-sm">
                                <button type="button" onClick={(e) => { e.stopPropagation(); handleUpdateQty(item.id, -1); }} className="px-2 py-0.5 hover:bg-emerald-50 text-gray-600">-</button>
                                <span className="bg-emerald-500 px-2 py-0.5 font-bold text-white">{qty}</span>
                                <button type="button" onClick={(e) => { e.stopPropagation(); handleUpdateQty(item.id, 1); }} className="px-2 py-0.5 hover:bg-emerald-50 text-gray-600">+</button>
                              </div>
                              <span className="mt-2 text-[11px] font-medium text-gray-800">{item.name}</span>
                              <span className="text-[10px] text-gray-500">₹{item.price}</span>
                            </>
                          ) : (
                            <>
                              <span className="text-[11px] font-medium text-gray-800">{item.name}</span>
                              <span className="text-[10px] text-gray-500">₹{item.price}</span>
                            </>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-200 px-4 py-3">
          <button 
             type="button" 
             onClick={onClose}
             className="rounded border border-gray-300 bg-white px-6 py-1.5 text-[12px] font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
             type="button" 
             onClick={handleSave}
             className="rounded bg-[#df343b] px-6 py-1.5 text-[12px] font-bold text-white hover:bg-red-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
