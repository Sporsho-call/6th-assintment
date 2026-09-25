"use client";
import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowDown, Clock, Flame, Star } from "lucide-react";
import banner from "@/assets/banner.png";
import { ALL_WORKOUTS } from "@/data/workouts";

export default function Home() {
  const [sortBy, setSortBy] = useState<string>("duration");

  const sortedWorkouts = [...ALL_WORKOUTS].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }
    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="bg-zinc-950 border-b border-zinc-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[#ccff00] text-xs font-black tracking-widest uppercase">
              WORKOUT LIBRARY
            </span>

            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight my-4 leading-none font-sans">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="text-zinc-400 text-sm max-w-lg mb-8 leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today's plan, and watch the week's work add up.
            </p>

            <a
              href="#library"
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-extrabold px-6 py-3 rounded-md text-sm uppercase tracking-wider hover:bg-[#b3e600] transition"
            >
              <span>BROWSE WORKOUTS</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>

          {/* Hero Banner Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md h-72 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 flex items-center justify-center">
              <Image
                src={banner}
                alt="Gym Hero Banner"
                fill
                priority
                className="object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="library"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-wide">
              THE LIBRARY
            </h2>
            <p className="text-zinc-400 text-sm">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="relative inline-block text-left">
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-1.5 text-xs text-zinc-300">
              <span className="text-zinc-500 font-semibold">Sort By:</span>

              <select
                value={sortBy}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setSortBy(e.target.value)
                }
                className="bg-transparent text-[#ccff00] focus:outline-none cursor-pointer pr-4 font-bold uppercase"
              >
                <option value="duration" className="bg-zinc-900 text-white">
                  Duration
                </option>
                <option value="calories" className="bg-zinc-900 text-white">
                  Calories
                </option>
                <option value="rating" className="bg-zinc-900 text-white">
                  Rating
                </option>
              </select>

              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 pointer-events-none -ml-4" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedWorkouts.map((item) => (
            <Link
              key={item.id}
              href={`/workout/${item.id}`}
              className="group bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative bg-zinc-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {item.muscleGroups.map((muscle) => (
                      <span
                        key={muscle}
                        className="bg-zinc-800 text-[#ccff00] text-[10px] font-black uppercase px-2 py-0.5 rounded"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-extrabold uppercase text-lg text-white group-hover:text-[#ccff00] transition">
                    {item.name}
                  </h3>

                  <p className="text-zinc-500 text-xs mt-1">{item.equipment}</p>
                </div>
              </div>

              <div className="px-4 py-3 border-t border-zinc-800/60 bg-zinc-950/40 flex items-center justify-between text-xs text-zinc-400 font-medium">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{item.duration} min</span>
                </div>

                <div className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{item.caloriesBurned} kcal</span>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span>{item.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}