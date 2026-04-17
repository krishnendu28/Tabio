"use client";

import React from "react";
import { X, Store, MapPin, Phone, Mail, Globe, Clock, ShieldCheck } from "lucide-react";

export function StoreInfoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="relative h-32 bg-gradient-to-r from-[#df343b] to-[#f43f5e]">
           <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 transition-colors">
              <X className="h-5 w-5" />
           </button>
           <div className="absolute -bottom-10 left-8 rounded-2xl border-4 border-white bg-white p-4 shadow-xl">
              <Store className="h-10 w-10 text-[#df343b]" />
           </div>
        </div>

        <div className="mt-12 p-8 pt-4">
           <div className="mb-6">
              <h2 className="text-2xl font-black text-gray-800">Tabio Store #01</h2>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                 <ShieldCheck className="h-4 w-4" />
                 <span>Verified Production Instance</span>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                 <InfoRow icon={MapPin} label="Address" value="123 Food Street, Sector 5, Tasty City, IN" />
                 <InfoRow icon={Phone} label="Contact" value="+91 98765 43210" />
                 <InfoRow icon={Mail} label="Email" value="support@tabiorestaurant.com" />
              </div>
              <div className="space-y-4">
                 <InfoRow icon={Globe} label="Website" value="www.tabio.app" />
                 <InfoRow icon={Clock} label="Operational Hours" value="10:00 AM - 11:30 PM" />
                 <InfoRow icon={ShieldCheck} label="License No" value="FSSAI-12345678901234" />
              </div>
           </div>

           <div className="mt-8 rounded-xl bg-gray-50 p-4 border border-gray-100 italic text-sm text-gray-500">
              "Tabio POS is designed for high-performance restaurant environments. For administrative changes or multi-store setup, please contact the central management console."
           </div>
        </div>

        <div className="bg-gray-100 px-8 py-5 flex justify-between items-center">
           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Version 121.0.3</span>
           <button onClick={onClose} className="bg-[#df343b] text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:hover:shadow-lg hover:shadow-[#df343b]/20 transition-all active:scale-95">
              Done
           </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: any) {
   return (
      <div className="flex gap-3">
         <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-500">
            <Icon className="h-4 w-4" />
         </div>
         <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
            <span className="text-sm font-semibold text-gray-700">{value}</span>
         </div>
      </div>
   )
}
