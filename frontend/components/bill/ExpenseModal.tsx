"use client";

import { Calendar, Trash2, X } from "lucide-react";
import { useState } from "react";

type ExpenseModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ExpenseRow = {
  id: string;
  paidFrom: string;
  reason: string;
  amount: string;
  paidTo: string;
  taxPct: string;
  taxAmt: string;
  totalAmt: string;
  billNo: string;
  remark: string;
};

export function ExpenseModal({ isOpen, onClose }: ExpenseModalProps) {
  const [rows, setRows] = useState<ExpenseRow[]>(
    Array.from({ length: 10 }).map((_, i) => ({
      id: String(i + 1),
      paidFrom: "",
      reason: "",
      amount: "",
      paidTo: "",
      taxPct: "",
      taxAmt: "",
      totalAmt: "",
      billNo: "",
      remark: "",
    }))
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
      <div className="flex h-[90vh] w-[95vw] flex-col overflow-hidden rounded bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#f9fafb] px-4 py-3">
          <h2 className="text-[14px] font-bold text-[#374151]">Add Expense / Withdrawn</h2>
          <button type="button" onClick={onClose} className="rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Top Controls */}
        <div className="border-b border-gray-200 p-3 flex items-center gap-2">
           <span className="text-[12px] font-semibold text-gray-700">Date :</span>
           <div className="relative">
              <Calendar className="absolute left-2 top-1.5 h-4 w-4 text-gray-500" />
              <input type="date" className="rounded border border-gray-300 pl-8 pr-2 py-1 text-[12px] outline-none" defaultValue="2026-03-28" />
           </div>
        </div>

        {/* Grid Area */}
        <div className="flex-1 overflow-auto bg-[#f9fafb] p-2">
          <div className="overflow-x-auto rounded border border-gray-200 bg-white">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-[#df343b] text-left text-[11px] font-bold text-white">
                <tr>
                  <th className="w-10 px-2 py-2 text-center">Sn.</th>
                  <th className="w-32 px-2 py-2">Paid From *</th>
                  <th className="w-40 px-2 py-2">Reason *</th>
                  <th className="w-24 px-2 py-2">Amount *</th>
                  <th className="w-32 px-2 py-2">Paid To *</th>
                  <th className="w-20 px-2 py-2">Tax(%)</th>
                  <th className="w-20 px-2 py-2">Tax Amt</th>
                  <th className="w-24 px-2 py-2">Total Amt</th>
                  <th className="w-24 px-2 py-2">Bill Image</th>
                  <th className="w-16 px-2 py-2 text-center">Action</th>
                  <th className="w-28 px-2 py-2">Bill No.</th>
                  <th className="px-2 py-2">Remark</th>
                </tr>
              </thead>
              <tbody className="bg-white text-[11px] text-gray-800">
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-2 py-1.5 text-center font-medium">{row.id}</td>
                    <td className="px-1 py-1.5">
                      <select className="w-full rounded border border-gray-300 bg-white px-1 py-1 outline-none">
                        <option value="">Select Category</option>
                        <option value="cash">Cash</option>
                        <option value="bank">Bank</option>
                      </select>
                    </td>
                    <td className="px-1 py-1.5">
                      <select className="w-full rounded border border-gray-300 bg-white px-1 py-1 outline-none">
                        <option value="">Select Category</option>
                        <option value="vendor">Vendor Payment</option>
                        <option value="salary">Salary</option>
                      </select>
                    </td>
                    <td className="px-1 py-1.5"><input type="number" className="w-full rounded border border-gray-300 px-2 py-1 outline-none" /></td>
                    <td className="px-1 py-1.5"><input type="text" className="w-full rounded border border-gray-300 px-2 py-1 outline-none" /></td>
                    <td className="px-1 py-1.5"><input type="number" className="w-full rounded border border-gray-300 px-2 py-1 outline-none" /></td>
                    <td className="px-1 py-1.5"><input type="number" className="w-full rounded border border-gray-300 bg-gray-100 px-2 py-1 outline-none" readOnly /></td>
                    <td className="px-1 py-1.5"><input type="number" className="w-full rounded border border-gray-300 bg-gray-100 px-2 py-1 outline-none" readOnly /></td>
                    <td className="px-1 py-1.5"><input type="file" className="w-full text-[10px]" /></td>
                    <td className="px-1 py-1.5 text-center"><button type="button" className="rounded bg-red-100 p-1 text-red-600 hover:bg-red-200"><Trash2 className="h-4 w-4" /></button></td>
                    <td className="px-1 py-1.5"><input type="text" className="w-full rounded border border-gray-300 px-2 py-1 outline-none" /></td>
                    <td className="px-1 py-1.5"><input type="text" className="w-full rounded border border-gray-300 px-2 py-1 outline-none" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-gray-200 bg-white px-4 py-3">
          <button type="button" className="rounded border border-gray-300 px-4 py-1.5 text-[12px] font-semibold text-gray-700 hover:bg-gray-50">Clear All</button>
          <button type="button" onClick={onClose} className="rounded border border-gray-300 px-4 py-1.5 text-[12px] font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
          <button type="button" onClick={onClose} className="rounded bg-[#df343b] px-6 py-1.5 text-[12px] font-bold text-white hover:bg-red-700">Save</button>
        </div>
      </div>
    </div>
  );
}
