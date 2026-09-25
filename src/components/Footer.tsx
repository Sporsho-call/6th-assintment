import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black text-zinc-400 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Logo & Brand Name */}
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="FitLog Logo"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
          <span className="font-black text-white text-base tracking-wider uppercase">
            FITLOG
          </span>
        </div>

        {/* Right: Copyright Text */}
        <p className="text-xs text-zinc-500 font-medium">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}