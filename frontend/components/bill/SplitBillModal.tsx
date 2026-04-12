"use client";

import { X, Trash2 } from "lucide-react";
import { useState } from "react";

type SplitPortion = {
  id: string;
  percentage: number;
  amount: number;
};

type SplitBillModalProps = {
  isOpen: boolean;
  onClose: () => void;
  grandTotal: number;
  onSave: (splits: SplitPortion[]) => void;
};

export function SplitBillModal({ isOpen, onClose, grandTotal, onSave }: SplitBillModalProps) {
  const [persons, setPersons] = useState(2);
  const [splits, setSplits] = useState<SplitPortion[]>([
    { id: "1", percentage: 50, amount: grandTotal / 2 },
    { id: "2", percentage: 50, amount: grandTotal / 2 },
  ]);

  if (!isOpen) return null;

  const handlePersonsChange = (delta: number) => {
    const next = Math.max(2, persons + delta);
    setPersons(next);
    
    // Auto recalculate equally
    const perPerson = 100 / next;
    const amount = grandTotal / next;
    const newSplits = Array.from({ length: next }).map((_, i) => ({
      id: String(i + 1),
      percentage: perPerson,
      amount: amount
    }));
    setSplits(newSplits);
  };

  const handleSave = () => {
    onSave(splits);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-[500px] overflow-hidden rounded bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#f9fafb] px-4 py-3">
          <h2 className="text-[14px] font-bold text-[#374151]">Split Bill</h2>
          <button type="button" onClick={onClose} className="rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 text-[12px] text-gray-700">
          <div className="mb-4 flex items-center gap-4">
            <span className="font-semibold">Portion / Person</span>
            <div className="flex items-center rounded border border-gray-300">
              <button 
                type="button" 
                onClick={() => handlePersonsChange(-1)}
                className="px-3 py-1 font-bold border-r border-gray-300 hover:bg-gray-100"
              >
                -
              </button>
              <input 
                readOnly 
                value={persons} 
                className="w-12 text-center text-[12px] outline-none"
              />
              <button 
                type="button" 
                onClick={() => handlePersonsChange(1)}
                className="px-3 py-1 font-bold border-l border-gray-300 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded border border-gray-200">
            <table className="w-full">
               <thead className="bg-[#f9fafb] text-left text-[11px] uppercase text-gray-500">
                  <tr>
                     <th className="px-3 py-2 text-center">Action</th>
                     <th className="px-3 py-2">Select Portion/Percentage</th>
                     <th className="px-3 py-2 text-right">Amount (₹)</th>
                     <th className="px-3 py-2 text-right">Remaining Amount (₹)</th>
                  </tr>
               </thead>
               <tbody>
                  {splits.map((split, i) => {
                     const remaining = grandTotal - splits.slice(0, i + 1).reduce((acc, s) => acc + s.amount, 0);
                     return (
                        <tr key={split.id} className="border-t border-gray-100">
                           <td className="px-3 py-2 text-center text-red-500 cursor-pointer">
                              <Trash2 className="mx-auto h-4 w-4" />
                           </td>
                           <td className="px-3 py-2">
                              <select className="w-full rounded border border-gray-300 px-2 py-1 text-[11px] outline-none">
                                 <option>{split.percentage.toFixed(2)}%</option>
                                 <option>Custom</option>
                              </select>
                           </td>
                           <td className="px-3 py-2 text-right">
                              <input 
                                className="w-full text-right outline-none border border-gray-300 rounded px-2 py-1 text-[11px]" 
                                value={split.amount.toFixed(2)} 
                                readOnly
                              />
                           </td>
                           <td className="px-3 py-2 text-right font-medium text-gray-800">
                              {remaining > 0 ? remaining.toFixed(2) : "0.00"}
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-200 bg-[#f9fafb] px-4 py-3">
          <button 
            type="button" 
            onClick={onClose}
            className="rounded border border-gray-300 bg-white px-4 py-1.5 text-[12px] font-semibold text-gray-700 hover:bg-gray-50"
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
