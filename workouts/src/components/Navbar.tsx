"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black tracking-wider text-xl uppercase">
          <Image 
            src={logo} 
            alt="FitLog Logo" 
            width={32} 
            height={32} 
            className="w-8 h-8 object-contain" 
          />
          <span>FITLOG</span>
        </Link>

        <div className="flex items-center gap-2 bg-zinc-900/60 p-1 rounded-full border border-zinc-800">
          <Link
            href="/"
            className={`px-5 py-1.5 rounded-full text-xs font-semibold transition ${
              pathname === "/" ? "bg-zinc-800 text-[#ccff00]" : "text-zinc-400 hover:text-white"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`px-5 py-1.5 rounded-full text-xs font-semibold transition ${
              pathname === "/my-plan" ? "bg-zinc-800 text-[#ccff00]" : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 bg-[#ccff00] text-black font-extrabold px-3.5 py-1 rounded-full text-xs hover:bg-[#b3e600] transition"
          >
            <span>Plan</span>
            <span className="bg-black/20 px-1.5 py-0.5 rounded-full">{plan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-2 border border-zinc-700 bg-zinc-900 text-zinc-300 font-bold px-3.5 py-1 rounded-full text-xs hover:border-zinc-500 transition"
          >
            <span>Saved</span>
            <span className="bg-zinc-800 px-1.5 py-0.5 rounded-full text-zinc-400">{saved.length}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}