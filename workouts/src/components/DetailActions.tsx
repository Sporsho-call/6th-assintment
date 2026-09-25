"use client";

import {
  Check,
  BookmarkPlus
} from "lucide-react";

import { Workout } from "@/types";
import { usePlan } from "@/context/PlanContext";

export default function DetailActions({
  workout
}: {
  workout: Workout;
}) {
  const {
    addToPlan,
    addToSaved,
    plan
  } = usePlan();

  const full = plan.length >= 5;

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">

      <button
        disabled={full}
        onClick={() => addToPlan(workout)}
        className="flex items-center justify-center gap-2 rounded-md bg-[#ccff00] px-4 py-3 text-xs font-black uppercase text-black disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Check size={16} />

        {full
          ? "Plan Full"
          : "Add to today's plan"}
      </button>

      <button
        onClick={() => addToSaved(workout)}
        className="flex items-center justify-center gap-2 rounded-md border border-zinc-700 px-4 py-3 text-xs font-black uppercase text-white hover:border-[#ccff00] hover:text-[#ccff00]"
      >
        <BookmarkPlus size={16} />

        Save for later
      </button>

    </div>
  );
}
