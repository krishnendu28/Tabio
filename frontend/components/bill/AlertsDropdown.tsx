"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bell, Info, TriangleAlert, CheckCircle2, X } from "lucide-react";

type AlertItem = {
  _id: string;
  message: string;
  type: "Info" | "Warning" | "Error" | "Request";
  read: boolean;
  createdAt: string;
  tableId?: string;
};

const POS_API_BASE_URL = process.env.NEXT_PUBLIC_POS_API_BASE_URL ?? "http://localhost:8000";

export function AlertsDropdown({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAlerts();
    }
  }, [isOpen]);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${POS_API_BASE_URL}/api/alerts`).catch(() => 
        axios.get(`${POS_API_BASE_URL}/alerts`)
      );
      setAlerts(response.data);
    } catch (error) {
      console.error("Failed to fetch alerts", error);
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id: string) => {
    try {
      await axios.patch(`${POS_API_BASE_URL}/api/alerts/${id}/read`).catch(() => 
        axios.patch(`${POS_API_BASE_URL}/alerts/${id}/read`)
      );
      setAlerts(prev => prev.map(a => a._id === id ? { ...a, read: true } : a));
    } catch (err) {
      console.error(err);
    }
  };

  const clearAll = async () => {
    try {
      await axios.delete(`${POS_API_BASE_URL}/api/alerts`).catch(() => 
        axios.delete(`${POS_API_BASE_URL}/alerts`)
      );
      setAlerts([]);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full z-[100] mt-2 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-[#df343b]" />
          <span className="text-sm font-bold text-gray-800">Notifications</span>
        </div>
        <div className="flex items-center gap-3">
           <button onClick={clearAll} className="text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase">Clear All</button>
           <button onClick={onClose} className="rounded-full hover:bg-gray-200 p-0.5"><X className="h-4 w-4 text-gray-400" /></button>
        </div>
      </div>

      <div className="max-h-[400px] overflow-auto">
        {loading ? (
            <div className="flex justify-center p-8"><div className="h-5 w-5 animate-spin rounded-full border-2 border-[#df343b] border-t-transparent"></div></div>
        ) : alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10 text-center">
             <div className="bg-gray-50 rounded-full p-4 mb-3">
                <Bell className="h-8 w-8 text-gray-200" />
             </div>
             <p className="text-sm text-gray-400 font-medium">No new alerts</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {alerts.map((alert) => (
              <div 
                key={alert._id} 
                className={`flex gap-3 p-4 transition-colors hover:bg-gray-50 cursor-pointer ${!alert.read ? "bg-red-50/30" : ""}`}
                onClick={() => !alert.read && markRead(alert._id)}
              >
                <div className="shrink-0 mt-0.5">
                   <AlertIcon type={alert.type} />
                </div>
                <div className="flex flex-col gap-0.5">
                   <p className={`text-[12px] leading-tight ${alert.read ? "text-gray-500" : "text-gray-800 font-bold"}`}>
                      {alert.message}
                   </p>
                   <span className="text-[10px] text-gray-400">
                      {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {alert.tableId && ` • Table ${alert.tableId}`}
                   </span>
                </div>
                {!alert.read && <div className="ml-auto w-2 h-2 rounded-full bg-[#df343b] shrink-0 mt-1.5 "></div>}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-100 p-3 bg-gray-50 text-center">
         <button className="text-[11px] font-bold text-[#df343b] hover:underline">View All Notifications</button>
      </div>
    </div>
  );
}

function AlertIcon({ type }: { type: string }) {
   switch (type) {
      case "Warning": return <TriangleAlert className="h-4 w-4 text-amber-500" />;
      case "Error": return <X className="h-4 w-4 text-rose-500" />;
      case "Request": return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      default: return <Info className="h-4 w-4 text-gray-400" />;
   }
}
