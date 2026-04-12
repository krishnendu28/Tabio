"use client";

import { Info, Plus, Sparkles } from "lucide-react";
import type { TableNode, TableStatus } from "./types";

type TableViewProps = {
  tables: TableNode[];
  onSelectTable: (tableId: string) => void;
  onAddTable: () => void;
};

export function TableView({ tables, onSelectTable, onAddTable }: TableViewProps) {
  // Stats
  const running = tables.filter((t) => t.status === "Occupied" || t.status === "Reserved").length;
  const printed = 0; // Assume 0 for now
  const acTables = tables; // For now all in AC, usually filtered by Sections

  return (
    <div className="flex h-full w-full flex-col bg-[#f1f2f6] p-4 text-[#374151]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-4">
           {/* Section Tabs */}
           <button className="rounded bg-[#df343b] px-6 py-2 text-sm font-bold text-white shadow">AC</button>
           <button className="rounded bg-white px-4 py-2 text-sm font-semibold text-[#6b7280] hover:bg-gray-50 border border-gray-200">Non AC</button>
           <button className="rounded bg-white px-4 py-2 text-sm font-semibold text-[#6b7280] hover:bg-gray-50 border border-gray-200">Rooftop</button>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold bg-white px-4 py-2 rounded border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
             <div className="h-3 w-3 rounded-full bg-emerald-500"></div> Running Table ({running})
          </div>
          <div className="flex items-center gap-2">
             <div className="h-3 w-3 rounded-full bg-gray-400"></div> Printed Table ({printed})
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
        {acTables.map((table) => {
          const isOccupied = table.status === "Occupied" || table.status === "Reserved";
          
          return (
            <button
               key={table.id}
               type="button"
               onClick={() => onSelectTable(table.id)}
               className={`group relative flex h-32 flex-col items-center justify-center rounded-lg border shadow-sm transition-shadow hover:shadow-md ${
                  isOccupied 
                    ? "border-emerald-500 bg-white" 
                    : "border-gray-200 bg-white"
               }`}
            >
               {/* Color Bar / Status indicator */}
               <div className={`absolute left-0 right-0 top-0 h-1.5 rounded-t-lg ${isOccupied ? "bg-emerald-500" : "bg-gray-200"}`} />
               
               <span className={`text-2xl font-bold ${isOccupied ? "text-emerald-600" : "text-gray-700"}`}>
                 {table.label}
               </span>
               <div className={`mt-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${isOccupied ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"}`}>
                 {isOccupied ? "Running" : "Available"}
               </div>

               {isOccupied && table.assignedOrderId && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center text-[11px] font-medium text-emerald-600">
                     Time: 00:00
                  </div>
               )}
            </button>
          );
        })}

        {/* Add Table Button */}
        <button
           type="button"
           onClick={onAddTable}
           className="flex h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-transparent text-gray-500 hover:border-gray-400 hover:bg-gray-50"
        >
           <Plus className="mb-2 h-6 w-6" />
           <span className="text-sm font-semibold">Add Table</span>
        </button>
      </div>
    </div>
  );
}
