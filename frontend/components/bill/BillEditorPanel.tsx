"use client";

import { useState } from "react";
import { CreditCard, MoreHorizontal, Search, Trash2 } from "lucide-react";
import type { MenuItem, OrderItem, OrderType, Palette, PaymentType, SectionType, SplitPayment } from "./types";

type BillEditorPanelProps = {
  isDark: boolean;
  palette: Palette;
  orderType: OrderType;
  section: SectionType;
  tableId: string | null;
  persons: number;
  mobile: string;
  customerName: string;
  menuSearch: string;
  filteredMenuItems: MenuItem[];
  menuSettingsItems: MenuItem[];
  menuAvailability: Record<string, boolean>;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  grandTotal: number;
  payment: PaymentType;
  splitPayment: SplitPayment | null;
  hasCurrentOrder: boolean;
  onMobileChange: (value: string) => void;
  onCustomerNameChange: (value: string) => void;
  onOrderTypeChange: (value: OrderType) => void;
  onSectionChange: (value: SectionType) => void;
  onPersonsChange: (value: number) => void;
  onOpenTableView: () => void;
  onMenuSearchChange: (value: string) => void;
  onMenuAvailabilityChange: (menuItemId: string, nextAvailability: boolean) => void;
  onAddItem: (menuItem: MenuItem) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onPaymentChange: (value: PaymentType) => void;
  onSplitPaymentChange: (value: SplitPayment) => void;
  onSaveAndPrint: () => void;
  onSaveAndEbill: () => void;
  onSettleAndSave: () => void;
  onKOT: () => void;
  onKOTPrint: () => void;
  isSavingAndPrinting?: boolean;
  isSavingAndEbill?: boolean;
  isSettlingAndSaving?: boolean;
  isCreatingKOT?: boolean;
  isCreatingKOTPrint: boolean;
  onReprint?: () => void;
  onSplit?: () => void;
  onVoid?: () => void;
  money: (value: number) => string;
};

export function BillEditorPanel(props: BillEditorPanelProps) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const {
    orderType,
    section,
    tableId,
    persons,
    mobile,
    customerName,
    menuSearch,
    filteredMenuItems,
    items,
    subtotal,
    tax,
    grandTotal,
    payment,
    onMobileChange,
    onCustomerNameChange,
    onOrderTypeChange,
    onSectionChange,
    onPersonsChange,
    onOpenTableView,
    onMenuSearchChange,
    onAddItem,
    onUpdateQty,
    onPaymentChange,
    onSaveAndPrint,
    onSaveAndEbill,
    onKOT,
    onKOTPrint,
    onReprint,
    onSplit,
    onVoid,
  } = props;

  return (
    <div className="flex h-full w-full flex-col bg-white text-[12px] text-[#374151]">
      {/* Top Details Form */}
      <div className="flex flex-col gap-2 border-b border-[#e5e7eb] bg-[#f9fafb] p-3">
        {/* Row 1 */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1.5 font-medium cursor-pointer">
            <input
              type="radio"
              checked={orderType === "Delivery"}
              onChange={() => onOrderTypeChange("Delivery")}
              className="accent-[#df343b] w-3.5 h-3.5"
            />
            Delivery
          </label>
          <label className="flex items-center gap-1.5 font-medium cursor-pointer">
            <input
              type="radio"
              checked={orderType === "Takeaway"}
              onChange={() => onOrderTypeChange("Takeaway")}
              className="accent-[#df343b] w-3.5 h-3.5"
            />
            Pick Up
          </label>
          <label className="flex items-center gap-1.5 font-medium cursor-pointer">
            <input
              type="radio"
              checked={orderType === "Dine-In"}
              onChange={() => onOrderTypeChange("Dine-In")}
              className="accent-[#df343b] w-3.5 h-3.5"
            />
            Dine In
          </label>

          <select
            value={section}
            onChange={(e) => onSectionChange(e.target.value as SectionType)}
            className="rounded border border-[#d1d5db] bg-white px-2 py-1 text-[11px] outline-none focus:border-[#df343b]"
          >
            <option>AC</option>
            <option>Non-AC</option>
            <option>Rooftop</option>
          </select>

          <div className="flex items-center gap-2">
            <span className="font-medium">Table No.</span>
            <input
              readOnly
              value={tableId || ""}
              onClick={onOpenTableView}
              className="w-12 rounded border border-[#df343b] bg-white px-2 py-1 text-center text-[12px] outline-none cursor-pointer text-[#df343b]"
            />
            <button type="button" className="text-[11px] font-semibold text-blue-600 hover:text-blue-800">
              View Kot
            </button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span className="font-medium">Persons:</span>
            <input
              type="number"
              value={persons}
              onChange={(e) => onPersonsChange(Number(e.target.value))}
              className="w-12 rounded border border-[#d1d5db] bg-white px-2 py-1 outline-none focus:border-[#df343b]"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex items-center gap-2">
          <span className="font-medium w-12">Mobile:</span>
          <input
            type="text"
            placeholder="Enter min. 10 digit no."
            value={mobile}
            onChange={(e) => onMobileChange(e.target.value)}
            className="w-40 rounded border border-[#d1d5db] bg-white px-2 py-1.5 text-[11px] outline-none focus:border-[#df343b]"
          />
          <span className="font-medium ml-2 w-10">Name:</span>
          <input
             type="text"
             placeholder="Enter name..."
             value={customerName}
             onChange={(e) => onCustomerNameChange(e.target.value)}
             className="w-48 rounded border border-[#d1d5db] bg-white px-2 py-1.5 text-[11px] outline-none focus:border-[#df343b]"
          />
        </div>

        {/* Row 3 - Search */}
        <div className="flex items-center gap-2 mt-1">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1.5 h-4 w-4 text-[#9ca3af]" />
            <input
              type="text"
              placeholder="Search items..."
              value={menuSearch}
              onChange={(e) => onMenuSearchChange(e.target.value)}
              className="w-full rounded border border-[#d1d5db] bg-white pl-8 pr-2 py-1.5 text-[12px] outline-none focus:border-[#df343b]"
            />
            {menuSearch && filteredMenuItems.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-auto rounded border border-gray-200 bg-white shadow-lg">
                {filteredMenuItems.map((mi) => (
                  <button
                    key={mi.id}
                    type="button"
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-xs hover:bg-gray-50"
                    onClick={() => {
                      onAddItem(mi);
                      onMenuSearchChange("");
                    }}
                  >
                    <span>{mi.name}</span>
                    <span className="font-semibold text-gray-700">₹{mi.price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Special Note"
            className="flex-1 rounded border border-[#d1d5db] bg-[#f3f4f6] px-2 py-1.5 text-[12px] outline-none"
          />
        </div>
      </div>

      {/* Main Cart & Totals Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Cart Table */}
        <div className="flex-1 border-r border-[#e5e7eb] flex flex-col">
          <div className="grid grid-cols-[1fr_50px_60px_60px_30px] border-b border-[#df343b] bg-[#df343b] px-2 py-1.5 text-[11px] font-bold text-white">
            <span>Item</span>
            <span className="text-center">Qty.</span>
            <span className="text-right">Price</span>
            <span className="text-right">Amount</span>
            <span />
          </div>
          <div className="flex-1 overflow-auto p-1">
            {items.length === 0 ? (
              <div className="flex h-full items-center justify-center text-[#9ca3af]">Cart is empty</div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="group grid grid-cols-[1fr_80px_50px_60px_30px] items-center border-b border-gray-100 p-2 text-xs">
                  <span className="font-medium text-gray-800 break-words pr-2">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="flex h-5 w-5 items-center justify-center rounded bg-gray-200 font-bold hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-4 text-center font-semibold">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="flex h-5 w-5 items-center justify-center rounded bg-[#df343b] text-white font-bold hover:bg-red-700"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-right text-gray-600">{item.price.toFixed(2)}</span>
                  <span className="text-right font-medium text-gray-800">{(item.qty * item.price).toFixed(2)}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateQty(item.id, -item.qty)}
                    className="ml-auto text-gray-400 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Calculation Summary */}
        <div className="w-[35%] bg-gray-50 flex flex-col pt-2 text-[11px] font-medium text-[#4b5563]">
          <div className="flex justify-between px-3 py-1.5">
            <span>Sub Total</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between px-3 py-1.5">
            <span>Discount</span>
            <span>(0.00)</span>
          </div>
          <div className="flex justify-between px-3 py-1.5 font-bold text-gray-800">
            <span>Total (₹)</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between px-3 py-1.5">
            <span>Delivery Charge</span>
            <span>0.00</span>
          </div>
          <div className="flex justify-between px-3 py-1.5">
            <span>Container Charge</span>
            <span>0.00</span>
          </div>
           <div className="flex justify-between px-3 py-1.5">
            <span>Taxes</span>
            <span>{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between px-3 py-1.5">
            <span>Round Off</span>
            <span>0.00</span>
          </div>

          <div className="mt-auto border-t-2 border-dashed border-gray-300"></div>
          
          <div className="flex items-center justify-between border-b border-[#df343b] px-3 py-3 font-bold text-[#df343b] bg-red-50 text-[14px]">
            <div className="flex items-center gap-1.5">
              <CreditCard className="h-4 w-4" />
              <span>Grand Total (₹)</span>
            </div>
            <span>{grandTotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between px-3 py-2 bg-gray-100">
            <span>Customer Paid</span>
            <span>0</span>
          </div>
          <div className="flex justify-between px-3 py-2 bg-gray-100">
            <span>Return to Customer</span>
            <span>0.00</span>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-[#e5e7eb] bg-white p-2 flex flex-col gap-2">
        {/* Payments row */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_0.5fr] gap-2">
          <button
            type="button"
            className={`flex items-center justify-center rounded py-1.5 font-bold text-[11px] ${payment === "Cash" ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"}`}
            onClick={() => onPaymentChange("Cash")}
          >
            Cash
          </button>
          <button
            type="button"
            className={`flex items-center justify-center rounded py-1.5 font-bold text-[11px] ${payment === "Card" ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"}`}
            onClick={() => onPaymentChange("Card")}
          >
            Card
          </button>
          <button
            type="button"
            className={`flex items-center justify-center rounded py-1.5 font-bold text-[11px] ${payment === "Due" ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"}`}
            onClick={() => onPaymentChange("Due")}
          >
            Due
          </button>
          <button
            type="button"
            className={`flex items-center justify-center rounded py-1.5 font-bold text-[11px] ${payment === "Other" ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"}`}
            onClick={() => onPaymentChange("Other")}
          >
            Other
          </button>
          <div className="relative">
            <button
              type="button"
              className={`flex w-full items-center justify-center rounded py-1.5 font-bold text-[11px] bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200`}
              onClick={() => setShowMoreMenu(!showMoreMenu)}
            >
               More <MoreHorizontal className="ml-1 h-3 w-3" />
            </button>
            {showMoreMenu && (
              <div className="absolute bottom-full right-0 mb-1 w-32 rounded bg-white p-1 shadow-xl border border-gray-200 z-50 flex flex-col font-medium text-gray-700 text-left">
                <button 
                  className="text-left px-3 py-1.5 hover:bg-gray-100 rounded" 
                  onClick={() => { onReprint?.(); setShowMoreMenu(false); }}
                >
                  Reprint
                </button>
                <button 
                  className="text-left px-3 py-1.5 hover:bg-gray-100 rounded" 
                  onClick={() => { onSplit?.(); setShowMoreMenu(false); }}
                >
                  Split
                </button>
                <button 
                  className="text-left px-3 py-1.5 hover:bg-gray-100 rounded text-red-600" 
                  onClick={() => { onVoid?.(); setShowMoreMenu(false); }}
                >
                  Void
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons row */}
        <div className="flex items-center gap-2">
          <button 
             type="button" 
             className="flex-1 rounded py-2 font-bold text-[12px] bg-[#df343b] text-white hover:bg-red-700 active:bg-red-800"
             onClick={onSaveAndPrint}
          >
            Save & Print
          </button>
          <button 
             type="button" 
             className="flex-1 rounded py-2 font-bold text-[12px] bg-[#df343b] text-white hover:bg-red-700 active:bg-red-800"
             onClick={onSaveAndEbill}
          >
            Save & EBill
          </button>
          <button 
             type="button" 
             className="px-6 rounded py-2 font-bold text-[12px] bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Reset
          </button>
          <button 
             type="button" 
             className="px-6 rounded py-2 font-bold text-[12px] bg-gray-600 text-white hover:bg-gray-700"
             onClick={onKOT}
          >
            KOT
          </button>
           <button 
             type="button" 
             className="px-6 rounded py-2 font-bold text-[12px] bg-gray-600 text-white hover:bg-gray-700"
             onClick={onKOTPrint}
          >
            KOT & Print
          </button>
        </div>
      </div>
    </div>
  );
}
