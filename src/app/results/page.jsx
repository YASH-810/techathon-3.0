"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TrendingUp, Check, Target, Loader2, Sparkles, Navigation } from "lucide-react";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ------ Styled Inline Components for Dark/Neon Polish ------

const Card = React.forwardRef(({ className, selected, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      "rounded-[2rem] border bg-card-dark/80 backdrop-blur-xl shadow-lg transition-all duration-300", 
      selected ? "ring-2 ring-app-secondary border-app-secondary shadow-[0_0_30px_rgba(6,182,212,0.2)] scale-[1.02]" : "border-white/10 hover:border-app-primary/50 hover:bg-card-dark hover:shadow-xl",
      className
    )} 
    {...props} 
  />
));
Card.displayName = "Card";

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-background-light border-white/10 text-slate-300",
    gradient: "bg-gradient-to-r from-app-primary to-neon-purple text-white border-transparent shadow-[0_4px_10px_rgba(168,85,247,0.3)]",
    success: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20",
  };
  return <div ref={ref} className={cn("inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-bold whitespace-nowrap", variants[variant], className)} {...props} />;
});
Badge.displayName = "Badge";

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-2xl text-base font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary disabled:pointer-events-none disabled:opacity-50 active:scale-95 shadow-sm";
  const variants = {
    default: "bg-gradient-to-r from-app-secondary to-app-primary text-white shadow-xl shadow-app-primary/20",
    outline: "border-2 border-white/10 bg-background-light/50 hover:bg-white/5 text-white",
  };
  return <button ref={ref} className={cn(baseStyles, variants[variant], "h-14 px-8 py-2 w-full", className)} {...props} />;
});
Button.displayName = "Button";

// ------ Main Page Component ------

export default function ResultsPage() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState([]);
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRecommendations([
        {
          _id: "65d8c11e0a29",
          title: "AI Solutions Architect",
          matchPercentage: 96,
          reason: "Your unique blend of analytical systems thinking and creative problem solving perfectly aligns with building large-scale AI infrastructures.",
          marketDemand: 98
        },
        {
          _id: "65d8c11e0a30",
          title: "Full Stack Engineer",
          matchPercentage: 89,
          reason: "Leverages your business mindset and coding baseline effectively into a high-growth sector.",
          marketDemand: 92
        },
        {
          _id: "65d8c11e0a32",
          title: "Product Manager",
          matchPercentage: 82,
          reason: "Capitalizes on your high communication and leadership metrics combined with structural planning.",
          marketDemand: 88
        }
      ]);
      setIsLoading(false);
    }, 1800);
  }, []);

  const handleSelectCareer = async () => {
    if (!selectedCareerId) return;
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center relative overflow-hidden text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-app-primary/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-neon-cyan/20 rounded-full blur-[80px]" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-white/10 border-t-app-secondary rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-app-primary mb-2">Compiling Trajectories...</h2>
          <p className="text-slate-400 font-bold tracking-widest uppercase text-sm">Nexus AI Subroutine Active</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-app-primary/30 relative overflow-hidden text-slate-100">
      
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-app-primary/20 to-neon-purple/20 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-app-secondary/20 to-neon-cyan/10 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Header Title */}
        <div className="text-center space-y-4 pt-4">
          <Badge variant="gradient" className="mb-4 text-sm px-6 py-2">
            <Sparkles className="w-4 h-4 mr-2" /> Neuro-Mapping Phase Complete
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white pb-2">
            Calculated Vectors
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Based on your psychometric calibration, our engine identified these optimal trajectories. Select your prime directive to generate the milestone payload.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {recommendations.map((career, idx) => {
             const isSelected = selectedCareerId === career._id;
             const isTopMatch = idx === 0;

             return (
               <Card 
                 key={career._id} 
                 selected={isSelected} 
                 className={cn("flex flex-col relative overflow-hidden cursor-pointer group hover:-translate-y-2", isTopMatch && "lg:-mt-6 lg:mb-6 border-app-primary/50")}
                 onClick={() => setSelectedCareerId(career._id)}
               >
                 {isTopMatch && (
                   <div className="bg-gradient-to-r from-app-primary to-neon-purple text-white text-xs font-black uppercase tracking-widest text-center py-2 w-full shadow-md relative z-20">
                     Optimal Synergy Found
                   </div>
                 )}

                 <div className="p-8 md:p-10 flex-1 flex flex-col relative z-10 w-full h-full">
                   
                   {/* Selection Indicator */}
                   <div className={cn(
                     "absolute top-8 right-8 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all bg-background-light z-20 shadow-sm",
                     isSelected ? "border-app-secondary" : "border-white/20 group-hover:border-app-primary"
                   )}>
                      <div className={cn("h-3 w-3 rounded-full bg-app-secondary transition-all", isSelected ? "scale-100 opacity-100" : "scale-0 opacity-0")} />
                   </div>

                   {/* Main Metric */}
                   <div className="flex flex-col items-center justify-center mb-8 pt-4">
                     <div className={cn(
                       "w-24 h-24 rounded-full flex items-center justify-center border-[6px] mb-4 shadow-inner relative transition-colors duration-500",
                       isSelected ? "border-app-secondary/20 bg-app-secondary/10" : "border-background-light bg-background-light"
                     )}>
                       {isSelected && <div className="absolute inset-0 rounded-full border-[6px] border-app-secondary scale-105 animate-pulse opacity-50 pointer-events-none" />}
                       <Target className={cn("w-10 h-10 absolute opacity-20", isSelected ? "text-app-secondary" : "text-slate-500")} />
                       <span className={cn("text-3xl font-black relative z-10", isSelected ? "text-neon-cyan drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" : "text-white")}>{career.matchPercentage}%</span>
                     </div>
                     <h2 className={cn("text-2xl font-extrabold text-center", isSelected ? "text-white" : "text-slate-200")}>{career.title}</h2>
                   </div>
                   
                   <div className="flex items-center justify-center gap-2 mb-8">
                     <Badge variant="success" className="px-4 py-1.5 flex items-center gap-2 text-sm bg-neon-cyan/20 border-neon-cyan/30 text-neon-cyan shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                       <TrendingUp className="w-4 h-4" /> {career.marketDemand >= 90 ? "Hyper Growth" : "Stable Growth"} Target
                     </Badge>
                   </div>

                   <div className="space-y-4 flex-1 bg-background-light/50 -mx-4 -mb-4 p-6 rounded-2xl border border-white/5">
                     <h4 className="text-xs font-bold uppercase tracking-widest text-app-primary flex items-center gap-2">
                       <Navigation className="w-4 h-4" /> Algorithmic Reasoning
                     </h4>
                     <p className="text-sm text-slate-400 leading-relaxed font-medium">
                       {career.reason}
                     </p>
                   </div>
                 
                 </div>
               </Card>
             );
          })}
        </div>

        {/* Action Footer */}
        <div className="flex justify-center pt-8 border-t border-white/10 mt-10">
          <div className="max-w-md w-full space-y-4">
            <Button 
              onClick={handleSelectCareer} 
              disabled={!selectedCareerId || isSubmitting}
              className={cn("h-16 text-lg group", (!selectedCareerId || isSubmitting) && "opacity-70")}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" /> Fetching Dashboard Link...
                </>
              ) : (
                <>
                   Lock Trajectory <Check className="w-6 h-6 ml-2 transition-transform group-hover:scale-110" />
                </>
              )}
            </Button>
            <p className="text-xs text-center text-slate-500 font-bold uppercase tracking-widest">
              You can adjust coordinates in settings later.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
