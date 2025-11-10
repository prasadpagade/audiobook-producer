"use client";

import DemoSection from "../components/DemoSection";
import Hero from "../components/Hero";
import ProcessFlow from "../components/ProcessFlow";
import AudioShowcase from "../components/AudioShowcase";
import Features from "../components/Features";
import TechStack from "../components/TechStack";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <main className="bg-slate-950 text-white overflow-hidden">
      <section id="hero" className="scroll-mt-24">
        <Hero />
      </section>

      <ProcessFlow />

      <section id="live-demo" className="scroll-mt-24">
        <DemoSection />
      </section>

      <AudioShowcase />
      <Features />
      <TechStack />
      <CTA />
      <Footer />
    </main>
  );
}
