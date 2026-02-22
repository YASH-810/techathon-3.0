"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Target, BookOpen, BarChart3, TrendingUp, CheckCircle, ShieldCheck, PieChart, Activity } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background-dark font-sans text-slate-100 selection:bg-app-primary/30 overflow-hidden relative">
      
      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/10 bg-background-dark/95 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-app-primary/10 flex items-center justify-center border border-app-primary/20 shadow-sm">
              <BrainCircuit className="w-5 h-5 text-app-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Nexus<span className="text-app-secondary font-medium">Nav</span></span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/registration" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
              Log In
            </Link>
            <Link href="/registration">
              <button className="h-10 px-5 rounded-lg bg-app-primary hover:bg-app-primary/90 text-white text-sm font-semibold transition-all shadow-sm">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        
        {/* ======================================
            SECTION 1 — HERO SECTION
            ====================================== */}
        <section className="pt-24 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card-dark border border-white/10 text-sm font-semibold text-slate-300 mb-4 shadow-sm">
              <SparklesIcon className="w-4 h-4 text-app-secondary" /> AI-Powered Career Intelligence
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
              Discover the Right <br className="hidden md:block" />
              <span className="text-app-secondary">Career Path with AI.</span>
            </h1>
            
            <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
              Personalized career guidance, skill gap analysis, and roadmap planning — powered by intelligent matching.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/registration" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto h-14 px-8 rounded-xl bg-app-primary hover:bg-app-primary/90 text-white font-semibold text-lg transition-all flex items-center justify-center gap-2 shadow-sm">
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/quiz" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto h-14 px-8 rounded-xl bg-card-dark hover:bg-white/10 text-white font-semibold text-lg border border-white/10 transition-all flex items-center justify-center gap-2 shadow-sm">
                  Take Career Quiz
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ======================================
            SECTION 2 — HOW IT WORKS
            ====================================== */}
        <section className="py-24 px-6 bg-background-light border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black tracking-tight text-white mb-4">How It Works</h2>
              <p className="text-lg text-slate-400 font-medium">Three simple steps to clarify your trajectory.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Take the Career Quiz",
                  desc: "Complete our comprehensive assessment covering cognitive skills, academic background, and availability.",
                  icon: <Target className="w-6 h-6 text-app-primary" />
                },
                {
                  step: "02",
                  title: "Get Top 3 AI-Matched Careers",
                  desc: "Our engine analyzes your profile against market data to find your highest-probability career vectors.",
                  icon: <PieChart className="w-6 h-6 text-app-secondary" />
                },
                {
                  step: "03",
                  title: "Follow Your Personalized Roadmap",
                  desc: "Execute on a dynamic, week-by-week learning pathway tailored strictly to your skill gaps.",
                  icon: <BookOpen className="w-6 h-6 text-neon-pink" />
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-card-dark p-8 rounded-3xl border border-white/5 shadow-sm relative overflow-hidden group hover:border-white/20 transition-colors">
                  <div className="absolute top-0 right-0 p-8 text-8xl font-black text-background-dark opacity-40 pointer-events-none group-hover:scale-110 transition-transform origin-top-right">
                    {item.step}
                  </div>
                  
                  <div className="w-12 h-12 rounded-xl bg-background-dark flex items-center justify-center mb-6 relative z-10 border border-white/5 shadow-sm">
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 relative z-10">{item.title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================
            SECTION 3 — KEY FEATURES
            ====================================== */}
        <section className="py-24 px-6 bg-background-dark">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-black tracking-tight text-white mb-4">A Complete Navigational Suite</h2>
              <p className="text-lg text-slate-400 font-medium">Everything you need to transition from uncertain to highly skilled.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "AI-Powered Matching", desc: "Correlates your unique traits against thousands of real-time job profiles.", icon: <BrainCircuit className="w-5 h-5 text-white" />, bg: "bg-app-primary" },
                { title: "Skill Gap Analysis", desc: "Clearly identify what you know, what you need to improve, and what you're missing completely.", icon: <BarChart3 className="w-5 h-5 text-background-dark" />, bg: "bg-app-secondary" },
                { title: "Career Match Breakdown", desc: "Understand exactly why a career was recommended to you with transparent metric weighting.", icon: <Activity className="w-5 h-5 text-white" />, bg: "bg-neon-pink" },
                { title: "Personalized Roadmap", desc: "A linear, step-by-step educational timeline adapted to your specific free time.", icon: <Target className="w-5 h-5 text-white" />, bg: "bg-neon-purple" },
                { title: "Weekly Skill Tracking", desc: "Log your progress and watch your readiness score increase dynamically.", icon: <TrendingUp className="w-5 h-5 text-background-dark" />, bg: "bg-neon-cyan" },
                { title: "Growth Dashboard", desc: "A centralized command center controlling your entire educational trajectory.", icon: <PieChart className="w-5 h-5 text-white" />, bg: "bg-app-primary" },
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-5 p-6 rounded-2xl bg-card-dark border border-white/5 hover:bg-white/5 transition-colors shadow-sm">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm", feature.bg)}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-slate-400 font-medium leading-snug">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ======================================
            SECTION 4 — WHY CHOOSE US
            ====================================== */}
        <section className="py-24 px-6 bg-background-light border-y border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Minimalist style grid with deep text spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-12 text-left">
              {[
                { title: "Data-Driven Decisions", desc: "Stop relying on intuition. We analyze large market datasets to compute actual demands and psychometric realities.", icon: <BarChart3 className="w-6 h-6 text-app-secondary" /> },
                { title: "Transparent Scoring", desc: "You'll always know exactly how your matching algorithm was calculated, with clear reasoning.", icon: <ShieldCheck className="w-6 h-6 text-app-primary" /> },
                { title: "Continuous Tracking", desc: "This isn't just a one-time quiz. It's a platform designed to dynamically log and build your knowledge base.", icon: <Activity className="w-6 h-6 text-neon-pink" /> },
                { title: "Structured Engineering", desc: "We provide executable timelines and learning phases, not abstract suggestions.", icon: <CheckCircle className="w-6 h-6 text-neon-cyan" /> },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </section>

        {/* ======================================
            SECTION 5 — FINAL CTA
            ====================================== */}
        <section className="py-32 px-6 bg-background-dark text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-black tracking-tight text-white mb-6">Start Building Your Future Today</h2>
            <p className="text-lg text-slate-400 font-medium mb-10">
              Create your account now and get immediate access to your personalized career roadmap and dashboard.
            </p>
            <Link href="/registration">
              <button className="h-14 px-10 rounded-xl bg-app-primary hover:bg-app-primary/90 text-white font-semibold text-lg shadow-sm transition-all focus:ring-2 focus:ring-app-primary focus:outline-none">
                Create Free Account
              </button>
            </Link>
          </div>
        </section>

      </main>

      {/* ======================================
          FOOTER
          ====================================== */}
      <footer className="border-t border-white/5 bg-background-dark py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-card-dark flex items-center justify-center border border-white/5 text-app-primary">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Nexus<span className="text-app-secondary font-medium">Nav</span></span>
          </div>

          <div className="flex items-center gap-6 text-sm font-semibold text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/registration" className="hover:text-white transition-colors">Register</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          </div>

        </div>
        <div className="max-w-6xl mx-auto mt-8 text-center md:text-left text-sm font-medium text-slate-500">
          &copy; {new Date().getFullYear()} NexusNav Careers. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

function SparklesIcon(props) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M12 3v3h3v3h-3v3h-3v-3H6V6h3V3h3ZM21 9v2h2v2h-2v2h-2v-2h-2v-2h2V9h2ZM11 16v2h2v2h-2v2H9v-2H7v-2h2v-2h2Z" />
    </svg>
  );
}
