"use client";

import { Bell, HandMetal, PieChart, Power, Settings, ShoppingCart, Store } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function TopHeader() {
  const pathname = usePathname();
  const title = pathname.includes("/operations")
    ? "Operations"
    : pathname.includes("/reports")
    ? "Reports"
    : pathname.includes("/settings")
    ? "Settings"
    : pathname.includes("/live-view")
    ? "Live View"
    : pathname.includes("/dashboard/kot")
    ? "Canceled KOTs"
    : pathname.includes("/dashboard/items")
    ? "Menu Items"
    : "Generate Bill";

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-[#e5e7eb] bg-white px-4">
      {/* Title / Info */}
      <div className="flex items-center gap-4">
        <h1 className="text-[16px] font-bold text-[#374151]">{title}</h1>
      </div>

      {/* Top right actions */}
      <div className="flex items-center gap-1">
        <Link href="/dashboard/items" className="flex flex-col items-center justify-center rounded px-3 py-1 text-[#6b7280] hover:bg-[#f9fafb]">
          <Power className="mb-1 h-4 w-4" />
          <span className="text-[9px] font-semibold text-[#6b7280]">Item On Off</span>
        </Link>
        <button type="button" onClick={() => alert("Store switching dialog goes here")} className="flex flex-col items-center justify-center rounded px-3 py-1 text-[#6b7280] hover:bg-[#f9fafb]">
          <Store className="mb-1 h-4 w-4" />
          <span className="text-[9px] font-semibold text-[#6b7280]">Store</span>
        </button>
        <button type="button" onClick={() => alert("Opening Cash Drawer...")} className="flex flex-col items-center justify-center rounded px-3 py-1 text-[#6b7280] hover:bg-[#f9fafb]">
          <ShoppingCart className="mb-1 h-4 w-4" />
          <span className="text-[9px] font-semibold text-[#6b7280]">Drawer</span>
        </button>
        <Link href="/bill/live-view" className="flex flex-col items-center justify-center rounded px-3 py-1 text-[#6b7280] hover:bg-[#f9fafb]">
          <PieChart className="mb-1 h-4 w-4" />
          <span className="text-[9px] font-semibold text-[#6b7280]">Live View</span>
        </Link>
        <Link href="/bill" className="flex flex-col items-center justify-center rounded px-3 py-1 text-[#6b7280] hover:bg-[#f9fafb]">
          <ShoppingCart className="mb-1 h-4 w-4" />
          <span className="text-[9px] font-semibold text-[#6b7280]">Orders</span>
        </Link>
        <button type="button" onClick={() => alert("Showing Hold Bills...")} className="flex flex-col items-center justify-center rounded px-3 py-1 text-[#6b7280] hover:bg-[#f9fafb]">
          <HandMetal className="mb-1 h-4 w-4" />
          <span className="text-[9px] font-semibold text-[#6b7280]">Hold</span>
        </button>
        <button type="button" onClick={() => alert("No new notifications")} className="flex flex-col items-center justify-center rounded px-3 py-1 text-[#6b7280] hover:bg-[#f9fafb]">
          <Bell className="mb-1 h-4 w-4" />
          <span className="text-[9px] font-semibold text-[#6b7280]">Alerts</span>
        </button>

        {/* Support Red Button */}
        <div onClick={() => alert("Support request initiated")} className="ml-2 flex flex-col items-end rounded bg-rose-50 px-3 py-1.5 text-right text-[#df343b] hover:bg-rose-100 cursor-pointer">
          <span className="text-[13px] font-bold">07969 223344</span>
          <span className="text-[9px] font-medium tracking-wide">Request Support &gt;</span>
        </div>
      </div>
    </header>
  );
}
