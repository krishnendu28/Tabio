"use client";

import { BarChart3, Box, FileText, List, LogOut, PieChart, RefreshCcw, Settings, SlidersHorizontal, Store } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function BillSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  const navigation = [
    { label: "Billing", icon: FileText, href: "/bill" },
    { label: "Operations", icon: SlidersHorizontal, href: "/bill/operations" },
    { label: "Dashboard", icon: BarChart3, href: "/dashboard" },
    { label: "Live View", icon: PieChart, href: "/bill/live-view" },
    { label: "Items", icon: Box, href: "/dashboard/items" },
    { label: "KOTs", icon: List, href: "/dashboard/kot" },
    { label: "Addons", icon: Settings, href: "/dashboard/addons" },
    { label: "Settings", icon: Settings, href: "/bill/settings" },
  ];

  return (
    <aside className="hidden h-full w-24 flex-col border-r border-[#e5e7eb] bg-white lg:flex">
      {/* Logo Block */}
      <div className="flex h-16 w-full items-center justify-center bg-[#df343b] text-white">
        <div className="flex flex-col items-center">
          <Store className="h-6 w-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Tabio</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">POSS</span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col py-2">
        {navigation.map((entry) => {
          // Petpooja highlights "Billing" whether Table View or Generate Bill is active.
          const isBillingRoot = entry.href === "/bill";
          const isActive = isBillingRoot
            ? normalizedPath === "/bill"
            : normalizedPath === entry.href || normalizedPath.startsWith(`${entry.href}/`);

          return (
            <Link
              key={entry.label}
              href={entry.href}
              className={`flex flex-col items-center justify-center gap-1.5 py-3 ${
                isActive
                  ? "border-l-4 border-[#df343b] bg-[#fdf2f2] text-[#df343b]"
                  : "border-l-4 border-transparent text-[#6b7280] hover:bg-[#f9fafb] hover:text-[#374151]"
              }`}
            >
              <entry.icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{entry.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-[#e5e7eb] py-2">
        <button
          type="button"
          onClick={() => alert("Tabio POS is up to date!")}
          className="flex w-full flex-col items-center justify-center gap-1 py-3 text-[#6b7280] hover:bg-[#f9fafb] hover:text-[#374151]"
        >
          <RefreshCcw className="h-5 w-5" />
          <span className="text-[10px] font-medium">Check</span>
          <span className="text-[10px] font-medium -mt-1">Updates</span>
        </button>
        <div className="py-2 text-center text-[10px] text-[#9ca3af]">
          121.0.3
        </div>
        <Link
          href="/login"
          className="flex w-full flex-col items-center justify-center gap-1 py-3 text-[#6b7280] hover:bg-rose-50 hover:text-rose-600"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-[10px] font-medium">Logout</span>
        </Link>
      </div>
    </aside>
  );
}