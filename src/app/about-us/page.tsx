"use client";

import { Header } from "@/components/Header";
import { AboutUs } from "@/components/AboutUs";

export default function AboutUsPage() {
  return (
    <div className="bg-[#FFF3E0] min-h-screen">
      <Header />
      <main className="pt-10">
        <AboutUs />
      </main>
    </div>
  );
}
