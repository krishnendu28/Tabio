"use client";

import React from "react";
import type { OrderItem, OrderType } from "./types";

type TaxInvoiceProps = {
  orderId: string;
  date: string;
  customerName: string;
  mobile: string;
  orderType: OrderType;
  tableId: string | null;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  grandTotal: number;
};

export function TaxInvoice({
  orderId,
  date,
  customerName,
  mobile,
  orderType,
  tableId,
  items,
  subtotal,
  tax,
  grandTotal,
}: TaxInvoiceProps) {
  return (
    <div className="print-only bg-white p-8 text-black font-sans w-[80mm] mx-auto text-[12px] leading-tight">
      <div className="text-center mb-4">
        <h1 className="text-lg font-bold uppercase">Tabio Restaurant</h1>
        <p>123 Food Street, Tasty City</p>
        <p>GSTIN: 27AAAAA0000A1Z5</p>
        <p>Phone: +91 98765 43210</p>
      </div>

      <div className="border-t border-b border-black py-2 mb-2 flex justify-between uppercase font-bold text-[10px]">
        <span>Tax Invoice</span>
        <span>Original</span>
      </div>

      <div className="mb-2 text-[10px]">
        <div className="flex justify-between">
          <span>Bill No: {orderId}</span>
          <span>Date: {date}</span>
        </div>
        <div>Type: {orderType} {tableId ? `| Table: ${tableId}` : ""}</div>
        <div>Customer: {customerName || "Guest"}</div>
        {mobile && <div>Mobile: {mobile}</div>}
      </div>

      <table className="w-full text-left mb-2 border-collapse">
        <thead className="border-b border-black">
          <tr className="text-[10px] uppercase">
            <th className="py-1">Item</th>
            <th className="py-1 text-center">Qty</th>
            <th className="py-1 text-right">Price</th>
            <th className="py-1 text-right">Amt</th>
          </tr>
        </thead>
        <tbody className="border-b border-black">
          {items.map((item, idx) => (
            <tr key={idx} className="text-[10px]">
              <td className="py-1">{item.name}</td>
              <td className="py-1 text-center">{item.qty}</td>
              <td className="py-1 text-right">{item.price.toFixed(2)}</td>
              <td className="py-1 text-right">{(item.qty * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col items-end gap-1 text-[11px]">
        <div className="flex justify-between w-full max-w-[150px]">
          <span>Sub Total:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between w-full max-w-[150px]">
          <span>CGST (2.5%):</span>
          <span>₹{(tax / 2).toFixed(2)}</span>
        </div>
        <div className="flex justify-between w-full max-w-[150px]">
          <span>SGST (2.5%):</span>
          <span>₹{(tax / 2).toFixed(2)}</span>
        </div>
        <div className="flex justify-between w-full max-w-[150px] font-bold border-t border-black pt-1">
          <span>Grand Total:</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 text-center text-[10px]">
        <p className="font-bold">Thank You! Visit Again</p>
        <p>Software by Tabio</p>
      </div>
    </div>
  );
}
