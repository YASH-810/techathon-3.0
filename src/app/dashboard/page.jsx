"use client";

import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TrendingUp, Clock, BookOpen, Target, CheckCircle2, Circle, GraduationCap, MessageSquare, X, Send, Loader2, Sparkles, BrainCircuit, Rocket } from "lucide-react";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ------ Styled Inline Components for Dark/Neon Polish ------

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-3xl border border-white/10 bg-card-dark/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.3)] text-slate-100 transition-all", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-bold leading-none tracking-tight text-white", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-app-primary/10 text-app-primary border-app-primary/30",
    secondary: "bg-neon-purple/10 text-neon-purple border-neon-purple/30",
    success: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    destructive: "bg-neon-pink/10 text-neon-pink border-neon-pink/30",
    gradient: "bg-gradient-to-r from-app-primary to-neon-purple text-white border-transparent shadow-sm",
  };
  return (
    <div
      ref={ref}
      className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold transition-transform hover:scale-105", variants[variant], className)}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

const Progress = React.forwardRef(({ className, value, indicatorClassName, ...props }, ref) => (
  <div ref={ref} className={cn("relative h-3 w-full overflow-hidden rounded-full bg-background-light shadow-inner border border-white/5", className)} {...props}>
    <div 
      className={cn("h-full w-full flex-1 transition-all duration-1000 ease-out", indicatorClassName || "bg-gradient-to-r from-app-primary to-neon-purple")} 
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }} 
    />
  </div>
));
Progress.displayName = "Progress";

const Button = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 active:scale-95 shadow-sm";
  const variants = {
    default: "bg-gradient-to-r from-app-secondary to-app-primary text-white hover:shadow-lg hover:shadow-app-secondary/30",
    outline: "border-2 border-app-secondary/50 bg-background-light/50 text-app-secondary hover:bg-app-secondary/10",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
  };
  return <button ref={ref} className={cn(baseStyles, variants[variant], "h-12 px-6 py-2", className)} {...props} />;
});
Button.displayName = "Button";

// ------ Mock AI Output Data (Fallback) ------

const FALLBACK_DATA = {
  primaryMatch: {
    title: "AI Solutions Architect",
    matchPercentage: 96,
    description: "Your unique blend of analytical systems thinking and creative problem solving perfectly aligns with building large-scale AI infrastructures.",
    marketDemand: "Hyper Growth",
    salaryRange: "$120k - $180k / year",
    readinessTime: "6 - 8 months"
  },
  otherMatches: [
    { title: "Full Stack Engineer", match: 89, desc: "Combine frontend skills with backend logic to build comprehensive apps." },
    { title: "Product Manager", match: 82, desc: "Use your leadership and structured thinking to guide tech products." },
    { title: "Data Scientist", match: 78, desc: "Leverage mathematics and code to uncover hidden patterns." }
  ],
  skillGap: {
    strong: ["Systems Thinking", "Logic", "Basic Python"],
    improving: ["Cloud Architecture", "Machine Learning Basics", "SQL"],
    missing: ["Neural Networks", "TensorFlow/PyTorch", "MLOps"]
  },
  roadmap: [
    {
      phase: 1,
      title: "Core Mathematics & Python",
      duration: "6 Weeks",
      status: "completed",
      progress: 100,
      skills: "Linear Algebra, Statistics, Advanced Python"
    },
    {
      phase: 2,
      title: "Machine Learning Foundations",
      duration: "10 Weeks",
      status: "in-progress",
      progress: 35,
      skills: "Scikit-Learn, Pandas, Model Evaluation"
    },
    {
      phase: 3,
      title: "Deep Learning & Deployment",
      duration: "8 Weeks",
      status: "not-started",
      progress: 0,
      skills: "PyTorch, Docker, Cloud APIs"
    }
  ],
  scoreBreakdown: [
    { label: "Cognitive Affinity", value: 29, max: 30 },
    { label: "Skill Baseline", value: 26, max: 30 },
    { label: "Academic Trajectory", value: 19, max: 20 },
    { label: "Market Velocity", value: 20, max: 20 }
  ]
};

// ------ Dashboard Component ------

export default function CareerDashboardPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! I'm your Nexus AI Career Guide. What specific insights from your dashboard would you like to explore?" }
  ]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          if (isMounted) {
            setData(FALLBACK_DATA);
            setIsLoading(false);
          }
          return;
        }

        const res = await fetch(`/api/dashboard?userId=${userId}`);
        const result = await res.json();

        if (result.success && isMounted) {
          setData(result.data);
        } else if (isMounted) {
          setData(FALLBACK_DATA);
        }
      } catch (error) {
        if (isMounted) setData(FALLBACK_DATA);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchDashboardData();

    return () => { isMounted = false; };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: inputValue }]);
    setInputValue("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "bot", content: `That's a visionary perspective. Considering your ${data?.primaryMatch?.matchPercentage || 96}% synergy, anchoring yourself with Phase 1 skills will give you immense leverage.` }]);
    }, 1200);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center relative overflow-hidden text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-app-primary/20 rounded-full blur-[80px]" />
        <Sparkles className="w-12 h-12 text-neon-cyan animate-pulse mb-6 relative z-10" />
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-app-primary relative z-10 text-center">Synthesizing Neuro-Profile</h2>
        <p className="text-slate-400 mt-2 font-medium relative z-10 text-center">Calibrating multidimensional career metrics...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-background-dark p-4 md:p-8 font-sans selection:bg-app-primary/30 text-white relative pb-32 overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-app-primary/10 to-neon-purple/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-app-secondary/10 to-neon-cyan/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Header Title */}
        <div className="space-y-2 text-center md:text-left pt-6">
          <Badge variant="gradient" className="mb-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] px-4 py-1.5"><BrainCircuit className="w-4 h-4 mr-2" /> AI Intelligence Report</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Your Command Center
          </h1>
          <p className="text-lg text-slate-400 font-medium">Trajectory mapped based on your neural and skill fingerprint.</p>
        </div>

        {/* --- SECTION 1: HERO / TOP MATCH --- */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-app-primary to-neon-cyan p-[2px] shadow-[0_10px_40px_rgba(6,182,212,0.2)]">
          <div className="absolute inset-0 bg-gradient-to-br from-app-primary via-neon-purple to-neon-cyan rounded-[2.5rem] opacity-30 blur-sm pointer-events-none" />
          
          <div className="relative bg-background-light/90 backdrop-blur-xl rounded-[2.4rem] overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              
              <div className="p-10 flex flex-col items-center justify-center text-white text-center border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-neon-cyan/20 rounded-full blur-[50px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4 ring-1 ring-white/20 shadow-xl">
                  <Rocket className="w-10 h-10 text-neon-cyan drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                </div>
                <h2 className="text-7xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-neon-cyan drop-shadow-lg">{data.primaryMatch.matchPercentage}%</h2>
                <span className="text-neon-cyan font-bold tracking-[0.2em] uppercase text-xs">Maximum Synergy</span>
              </div>
              
              <div className="col-span-1 md:col-span-2 p-10 flex flex-col justify-center text-white relative">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <div className="px-4 py-1.5 rounded-full bg-app-secondary/20 border border-app-secondary/30 text-neon-cyan text-sm font-bold flex items-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <TrendingUp className="w-4 h-4 mr-2" /> {data.primaryMatch.marketDemand}
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-sm">{data.primaryMatch.title}</h1>
                <p className="text-slate-300 leading-relaxed text-lg max-w-2xl mb-8 font-medium">
                  {data.primaryMatch.description}
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-8 pt-6 border-t border-white/10">
                  <div className="bg-white/5 px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <p className="text-xs font-bold text-app-primary uppercase tracking-widest mb-1">Base Salary Projection</p>
                    <p className="font-bold text-xl text-white">{data.primaryMatch.salaryRange}</p>
                  </div>
                  <div className="bg-white/5 px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <p className="text-xs font-bold text-app-secondary uppercase tracking-widest mb-1">Estimated Velocity</p>
                    <p className="font-bold text-xl text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-neon-cyan" />
                      {data.primaryMatch.readinessTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: TOP 3 MATCHES --- */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-app-primary/10 border border-app-primary/30 rounded-xl">
              <GraduationCap className="w-6 h-6 text-app-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Alternative Vectors</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.otherMatches.map((career, idx) => (
              <Card key={idx} className="hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(168,85,247,0.15)] group flex flex-col bg-card-dark">
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 border-b border-white/5">
                  <CardTitle className="text-lg text-white">{career.title}</CardTitle>
                  <div className="w-12 h-12 rounded-2xl bg-background-light flex items-center justify-center font-black text-neon-purple border border-white/10 shrink-0 group-hover:scale-110 group-hover:border-neon-purple/50 transition-all text-lg shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                    {career.match}%
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 pt-6">
                  <p className="text-sm text-slate-400 mb-8 flex-1 font-medium leading-relaxed">{career.desc}</p>
                  <Button variant="outline" className="w-full">
                    Simulate Pathway
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* --- SECTION 3: SKILL GAP ANALYSIS --- */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-app-secondary/10 border border-app-secondary/30 rounded-xl">
                <Target className="w-6 h-6 text-app-secondary" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">Capability Matrix</h2>
            </div>
            <Card className="h-full bg-card-dark">
              <CardContent className="p-8 space-y-8">
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-widest">
                    <div className="w-3 h-3 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)]" /> Validated Strengths
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.skillGap.strong.map(skill => (
                      <Badge key={skill} variant="success" className="px-4 py-1.5">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-widest">
                    <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" /> Growth Areas
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.skillGap.improving.map(skill => (
                      <Badge key={skill} variant="warning" className="px-4 py-1.5">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-widest">
                    <div className="w-3 h-3 rounded-full bg-neon-pink shadow-[0_0_10px_rgba(244,114,182,0.8)]" /> Missing Criticals
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.skillGap.missing.map(skill => (
                      <Badge key={skill} variant="destructive" className="px-4 py-1.5">{skill}</Badge>
                    ))}
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* --- SECTION 5: MATCH SCORE BREAKDOWN --- */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neon-purple/10 border border-neon-purple/30 rounded-xl">
                <BrainCircuit className="w-6 h-6 text-neon-purple" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">Algorithmic Breakdown</h2>
            </div>
            <Card className="h-full bg-card-dark relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />
              <CardContent className="p-8 space-y-8 relative z-10">
                <p className="text-sm text-slate-400 font-medium">Visualization of the weighted parameters dictating your {data.primaryMatch.matchPercentage}% match score.</p>
                {data.scoreBreakdown.map((item, idx) => {
                  const percent = Math.round((item.value / item.max) * 100);
                  const isHigh = percent >= 80;
                  const isMed = percent >= 50 && percent < 80;
                  return (
                    <div key={idx} className="space-y-3">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-slate-200">{item.label}</span>
                        <span className={isHigh ? "text-neon-cyan" : isMed ? "text-neon-purple" : "text-slate-500"}>
                          {item.value} / {item.max} ({percent || 0}%)
                        </span>
                      </div>
                      <Progress 
                        value={percent} 
                        className="h-3 bg-background-light" 
                        indicatorClassName={
                          isHigh ? "bg-gradient-to-r from-app-secondary to-neon-cyan" : 
                          isMed ? "bg-gradient-to-r from-app-primary to-neon-purple" : 
                          "bg-slate-600"
                        } 
                      />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* --- SECTION 4: PERSONALIZED ROADMAP --- */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-app-secondary/10 border border-app-secondary/30 rounded-xl">
              <BookOpen className="w-6 h-6 text-app-secondary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Dynamic Learning Pathway</h2>
          </div>
          <Card className="bg-card-dark overflow-hidden py-0">
            <CardContent className="p-0 sm:flex rounded-[1.5rem] bg-background-light/30">
              {data.roadmap?.map((phase, idx) => (
                <div key={idx} className={cn(
                  "flex-1 p-8 relative transition-colors hover:bg-white/5 rounded-2xl",
                  idx !== data.roadmap.length - 1 && "sm:border-r border-white/5"
                )}>
                  {/* Phase header styling based on status */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shadow-inner font-bold text-sm",
                      phase.status === "completed" ? "bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.3)]" : 
                      phase.status === "in-progress" ? "bg-app-primary text-white shadow-app-primary/40 shadow-lg" : 
                      "bg-background-light border border-white/10 text-slate-500"
                    )}>
                      0{phase.phase}
                    </div>
                    <Badge variant={phase.status === "completed" ? "success" : phase.status === "in-progress" ? "default" : "outline"} className="uppercase tracking-widest text-[10px] px-3 border-white/10 text-slate-300">
                      {phase.duration}
                    </Badge>
                  </div>
                  
                  <h3 className={cn("text-xl font-bold mb-3", phase.status === "not-started" ? "text-slate-500" : "text-white")}>
                    {phase.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-8 font-medium h-10 leading-relaxed">{phase.skills}</p>
                  
                  <div className="relative pt-4 border-t border-white/5">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className={phase.progress > 0 ? "text-slate-300" : "text-slate-600"}>Completion</span>
                      <span className={phase.progress > 0 ? "text-neon-cyan" : "text-slate-600"}>{phase.progress}%</span>
                    </div>
                    <Progress 
                      value={phase.progress} 
                      className="h-2 bg-background-light" 
                      indicatorClassName={phase.status === "completed" ? "bg-neon-cyan" : phase.status === "in-progress" ? "bg-app-primary" : "bg-white/10"} 
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* --- SECTION 6: NEXT ACTION --- */}
        <div className="relative rounded-3xl bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan p-[2px] mt-12 shadow-[0_0_40px_rgba(192,132,252,0.3)]">
          <Card className="border-0 bg-background-light/90 backdrop-blur-3xl overflow-hidden relative rounded-[23px]"> 
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-app-primary/20 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none" />
            
            <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 text-center md:text-left flex-1">
                <Badge className="bg-app-primary/20 text-neon-purple hover:bg-app-primary/30 border border-neon-purple/20 mb-2 px-4 shadow-none">Immediate Directive</Badge>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Initiate Module: {data.roadmap?.[0]?.title || "Fundamentals"}</h2>
                <p className="text-slate-400 text-base md:text-lg font-medium flex items-center justify-center md:justify-start gap-2">
                  <Clock className="w-5 h-5 text-neon-cyan" /> Estimated Time Investment: <span className="text-white font-bold">{data.roadmap?.[0]?.duration || "4 Weeks"}</span>
                </p>
              </div>
              <Button className="w-full md:w-auto h-16 px-10 text-lg shadow-xl shrink-0 group">
                Engage Learning Protocol <Rocket className="w-5 h-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* --- AI CHATBOT FAB & WINDOW --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Chat Window */}
        <div className={cn(
          "bg-card-dark/95 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-3xl w-[350px] sm:w-[400px] mb-6 overflow-hidden flex flex-col transition-all duration-500 origin-bottom-right",
          isChatOpen ? "opacity-100 scale-100 h-[500px]" : "opacity-0 scale-90 h-0 pointer-events-none"
        )}>
          {/* Header */}
          <div className="bg-gradient-to-r from-app-primary to-neon-purple text-white p-5 flex items-center justify-between shrink-0 shadow-sm relative z-10">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <Sparkles className="w-4 h-4 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-neon-cyan border-2 border-app-primary animate-pulse shadow-[0_0_10px_rgba(34,211,238,1)]" />
              </div>
              <div>
                <span className="font-bold block leading-tight">Nexus AI</span>
                <span className="text-[10px] text-white/70 font-bold tracking-widest uppercase">Career Copilot Online</span>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="text-white/70 hover:text-white transition-colors bg-white/10 p-1.5 rounded-full hover:bg-white/20 border border-transparent">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-background-light/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "px-5 py-3 rounded-2xl text-sm max-w-[85%] leading-relaxed font-medium shadow-sm transition-all animate-in fade-in slide-in-from-bottom-2 border",
                  msg.role === "user" 
                    ? "bg-gradient-to-br from-app-primary to-neon-purple text-white rounded-tr-sm border-transparent" 
                    : "bg-background-dark border-white/10 text-slate-300 rounded-tl-sm text-shadow-sm"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-card-dark border-t border-white/10 shrink-0">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Nexus anything..."
                className="flex-1 text-sm bg-background-light border border-white/10 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-app-secondary focus:bg-background-dark transition-all placeholder:text-slate-500 text-white shadow-inner"
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim()}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-app-secondary to-app-primary text-background-dark disabled:opacity-50 transition-all hover:scale-105 active:scale-95 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                <Send className="w-5 h-5 ml-0.5 mt-0.5 text-white" />
              </button>
            </form>
          </div>
        </div>

        {/* Floating Action Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={cn(
            "w-16 h-16 flex items-center justify-center rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95 focus:outline-none z-50",
            isChatOpen ? "bg-background-light text-neon-pink border border-neon-pink/50" : "bg-gradient-to-r from-app-primary to-neon-purple text-white"
          )}
        >
          {isChatOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
        </button>
      </div>

    </div>
  );
}
