"use client";

import { Resources } from "@/components/Resources";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main className="pt-8">
        <Resources />
      </main>
      <Footer />
    </>
  );
}
