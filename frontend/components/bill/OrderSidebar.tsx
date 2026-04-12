"use client";

import { Search } from "lucide-react";
import { BillOrder } from "./types";

type OrderSidebarProps = {
  activeTab: "Dine In" | "Pick Up" | "Delivery" | "KOT";
  onTabChange: (tab: "Dine In" | "Pick Up" | "Delivery" | "KOT") => void;
  orders: BillOrder[];
  selectedOrderId: string;
  onSelectOrder: (orderId: string) => void;
};

export function OrderSidebar({
  activeTab,
  onTabChange,
  orders,
  selectedOrderId,
  onSelectOrder,
}: OrderSidebarProps) {
  const tabs = ["Dine In", "Pick Up", "Delivery", "KOT"] as const;

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "Dine In") return order.type === "Dine-In";
    if (activeTab === "Pick Up") return order.type === "Takeaway";
    if (activeTab === "Delivery") return order.type === "Delivery";
    return true; // KOT shows all for now or specific KOT logic
  });

  return (
    <aside className="hidden h-full: calc(100vh - 64px) w-80 flex-col border-r border-[#e5e7eb] bg-[#fdfdfd] lg:flex">
      {/* Top Search Bars */}
      <div className="grid grid-cols-3 gap-2 border-b border-[#e5e7eb] p-2">
        <label className="relative block">
          <input
            type="text"
            placeholder="Table No."
            className="w-full rounded border border-[#e5e7eb] px-2 py-1.5 text-xs outline-none focus:border-[#df343b]"
          />
        </label>
        <label className="relative block">
          <input
            type="text"
            placeholder="Bill No"
            className="w-full rounded border border-[#e5e7eb] px-2 py-1.5 text-xs outline-none focus:border-[#df343b]"
          />
        </label>
        <label className="relative block">
          <input
            type="text"
            placeholder="KOT No."
            className="w-full rounded border border-[#e5e7eb] px-2 py-1.5 text-xs outline-none focus:border-[#df343b]"
          />
        </label>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#e5e7eb]">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`flex-1 px-1 py-2 text-[11px] font-semibold transition-colors ${
              activeTab === tab
                ? "border-b-2 border-[#df343b] text-[#df343b]"
                : "border-b-2 border-transparent text-[#4b5563] hover:bg-[#f9fafb]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-3 border-b border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-[10px] font-bold text-[#374151]">
        <span>Order No.</span>
        <span>Table No.</span>
        <span className="text-right">(₹)</span>
      </div>

      {/* Order List */}
      <div className="flex-1 overflow-auto bg-[#fdfdfd]">
        {filteredOrders.length === 0 ? (
          <div className="p-4 text-center text-xs text-[#9ca3af]">No orders</div>
        ) : (
          filteredOrders.map((order) => {
            const isSelected = order.id === selectedOrderId;
            return (
              <button
                key={order.id}
                type="button"
                onClick={() => onSelectOrder(order.id)}
                className={`grid w-full grid-cols-3 border-b border-[#f3f4f6] px-3 py-3 text-left text-[11px] transition-colors ${
                  isSelected ? "bg-[#ffeada] font-medium" : "hover:bg-[#f9fafb]"
                }`}
              >
                <span className={isSelected ? "text-[#df343b]" : "text-[#4b5563]"}>
                  {order.id.replace("#B-", "")}
                </span>
                <span className="text-[#4b5563]">{order.tableId || "-"}</span>
                <span className="text-right text-[#4b5563]">{order.amount.toFixed(2)}</span>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}
