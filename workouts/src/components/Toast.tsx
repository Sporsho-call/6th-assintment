"use client";

import { usePlan } from "../context/PlanContext";

export default function Toast() {
  const { toast } = usePlan();

  if (!toast) {
    return null;
  }

  const borderColor =
    toast.type === "error"
      ? "border-red-500"
      : toast.type === "info"
      ? "border-blue-500"
      : "border-[#ccff00]";

  const dotColor =
    toast.type === "error"
      ? "bg-red-500"
      : toast.type === "info"
      ? "bg-blue-500"
      : "bg-[#ccff00]";

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 bg-zinc-900 ${borderColor} text-white px-4 py-3 rounded-lg shadow-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2`}
    >
      <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>

      <span>{toast.message}</span>
    </div>
  );
}