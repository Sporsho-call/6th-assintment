"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Plus,
  Bookmark,
  ArrowLeft,
} from "lucide-react";

import { usePlan } from "../../../context/PlanContext";
import { ALL_WORKOUTS } from "../../../data/workouts";

export default function WorkoutDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { addToPlan, addToSaved } = usePlan();

  const workoutId = Number(id);

  const item = ALL_WORKOUTS.find(
    (workout) => workout.id === workoutId
  );

  if (!item) {
    return (
      <div className="min-h-screen bg-black text-white p-12 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Workout not found!
        </h1>

        <button
          onClick={() => router.push("/")}
          className="bg-[#ccff00] text-black px-5 py-2 rounded-md font-bold"
        >
          Back to Workouts
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden h-[450px]">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white">
              {item.name}
            </h1>

            <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 my-4">
              {item.muscleGroups.map((tag) => (
                <span
                  key={tag}
                  className="bg-zinc-800 text-[#ccff00] text-xs font-bold px-3 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 my-6 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-500 font-semibold uppercase">
                  EQUIPMENT
                </span>

                <span className="text-zinc-200 font-medium">
                  {item.equipment}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-500 font-semibold uppercase">
                  DIFFICULTY
                </span>

                <span className="text-zinc-200 font-medium">
                  {item.difficulty}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-500 font-semibold uppercase">
                  SETS / REPS
                </span>

                <span className="text-zinc-200 font-medium">
                  {item.sets} / {item.reps}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-500 font-semibold uppercase">
                  DURATION
                </span>

                <span className="text-zinc-200 font-medium">
                  {item.duration} min
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-500 font-semibold uppercase">
                  CALORIES
                </span>

                <span className="text-zinc-200 font-medium">
                  {item.caloriesBurned} kcal
                </span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-zinc-500 font-semibold uppercase">
                  RATING
                </span>

                <span className="text-yellow-400 font-medium">
                  {item.rating} / 5.0
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-black uppercase text-zinc-400 tracking-wider mb-3">
                INSTRUCTIONS
              </h3>

              <ol className="space-y-2 text-sm text-zinc-300">
                {item.instructions.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-[#ccff00] font-bold">
                      {index + 1}.
                    </span>

                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => addToPlan(item)}
                className="flex-1 bg-[#ccff00] text-black font-extrabold py-3 px-4 rounded-md text-sm uppercase flex items-center justify-center gap-2 hover:bg-[#b3e600] transition"
              >
                <Plus className="w-4 h-4" />
                Add to today's plan
              </button>

              <button
                onClick={() => addToSaved(item)}
                className="border border-zinc-700 bg-zinc-900 text-zinc-300 font-bold py-3 px-4 rounded-md text-sm uppercase flex items-center justify-center gap-2 hover:border-zinc-500 transition"
              >
                <Bookmark className="w-4 h-4" />
                Save for later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}