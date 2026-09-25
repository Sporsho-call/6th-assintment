"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Check, Trash2, ArrowRight } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function MyPlanPage() {
  const { plan, saved, completed, markAsDone, removeFromPlan, removeFromSaved } = usePlan();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  // Calculate total stats
  const totalWorkouts = plan.length;
  const totalDuration = plan.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = plan.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Title */}
        <h1 className="text-3xl font-black uppercase tracking-tight">MY PLAN</h1>
        <p className="text-zinc-500 text-xs mt-1">Your personal workout queue for today.</p>

        {/* Top Stats Header Card */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 my-6 grid grid-cols-3 divide-x divide-zinc-800 text-center">
          <div>
            <p className="text-3xl font-black text-[#ccff00]">{totalWorkouts}</p>
            <p className="text-[10px] font-extrabold uppercase text-zinc-500 tracking-wider mt-1">WORKOUTS</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white">{totalDuration}</p>
            <p className="text-[10px] font-extrabold uppercase text-zinc-500 tracking-wider mt-1">TOTAL MIN</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white">{totalCalories}</p>
            <p className="text-[10px] font-extrabold uppercase text-zinc-500 tracking-wider mt-1">EST. KCAL</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-zinc-800 mb-6">
          <button
            onClick={() => setActiveTab("plan")}
            className={`pb-3 px-4 text-xs font-bold uppercase transition border-b-2 ${
              activeTab === "plan"
                ? "border-[#ccff00] text-[#ccff00]"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            Today's Plan ({plan.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-3 px-4 text-xs font-bold uppercase transition border-b-2 ${
              activeTab === "saved"
                ? "border-[#ccff00] text-[#ccff00]"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        {/* Tab 1: Today's Plan */}
        {activeTab === "plan" && (
          <div>
            {plan.length === 0 ? (
              <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-12 text-center my-8">
                <p className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-2">NO WORKOUTS ADDED YET</p>
                <p className="text-zinc-500 text-xs mb-6">Pick exercises from the library to build your plan.</p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-extrabold px-5 py-2.5 rounded text-xs uppercase hover:bg-[#b3e600] transition"
                >
                  BROWSE WORKOUTS <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {plan.map((item) => {
                  const isCompleted = completed.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-3 sm:p-4 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md bg-zinc-950" />
                        <div>
                          <h3 className="text-sm font-extrabold uppercase text-white">{item.name}</h3>
                          <p className="text-[11px] text-zinc-500 mt-0.5">
                            {item.duration} min • {item.caloriesBurned} kcal
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => markAsDone(item)}
                          disabled={isCompleted}
                          className={`px-3 py-1.5 rounded text-xs font-black uppercase flex items-center gap-1.5 transition ${
                            isCompleted
                              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                              : "bg-[#ccff00] text-black hover:bg-[#b3e600]"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          {isCompleted ? "Done" : "Mark as Done"}
                        </button>
                        <button
                          onClick={() => removeFromPlan(item.id)}
                          className="text-zinc-500 hover:text-red-400 p-1 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Workouts */}
        {activeTab === "saved" && (
          <div>
            {saved.length === 0 ? (
              <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-12 text-center my-8">
                <p className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-2">NO SAVED WORKOUTS</p>
                <p className="text-zinc-500 text-xs mb-6">Save exercises to quickly access them later.</p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-extrabold px-5 py-2.5 rounded text-xs uppercase hover:bg-[#b3e600] transition"
                >
                  BROWSE WORKOUTS <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {saved.map((item) => (
                  <div
                    key={item.id}
                    className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-3 sm:p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md bg-zinc-950" />
                      <div>
                        <h3 className="text-sm font-extrabold uppercase text-white">{item.name}</h3>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{item.equipment}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromSaved(item.id)}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold uppercase flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}