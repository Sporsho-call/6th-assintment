import type { Metadata } from "next";
import "./globals.css";

import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <PlanProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toast />
        </PlanProvider>
      </body>
    </html>
  );
}