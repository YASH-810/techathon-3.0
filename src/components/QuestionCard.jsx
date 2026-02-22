"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles, BrainCircuit } from "lucide-react";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ------ Styled Inline Components for Dark/Neon Polish ------

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-[2.5rem] border border-white/10 bg-card-dark/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] text-slate-100 relative overflow-hidden", className)} {...props} />
));
Card.displayName = "Card";

const Badge = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("inline-flex items-center rounded-full border border-app-primary/30 bg-app-primary/10 px-4 py-1.5 text-xs font-bold shadow-sm transition-colors text-neon-purple", className)} {...props} />
));
Badge.displayName = "Badge";

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <div ref={ref} className={cn("relative h-2.5 w-full overflow-hidden rounded-full bg-background-light shadow-inner border border-white/5", className)} {...props}>
    <div 
      className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-app-secondary to-app-primary transition-all duration-700 ease-out shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
      style={{ width: `${value || 0}%` }} 
    />
  </div>
));
Progress.displayName = "Progress";

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 active:scale-95 shadow-sm";
  const variants = {
    default: "bg-gradient-to-r from-app-primary to-neon-purple text-white hover:shadow-lg hover:shadow-app-primary/30",
    outline: "border-2 border-white/10 bg-background-light/50 shadow-sm hover:bg-white/10 text-slate-300 hover:text-white hover:border-white/20",
    ghost: "hover:bg-white/5 hover:text-white text-slate-400",
  };
  const sizes = {
    default: "h-14 px-8 text-base",
    sm: "h-11 px-6",
  };
  return <button ref={ref} className={cn(baseStyles, variants[variant], sizes[size], className)} {...props} />;
});
Button.displayName = "Button";

// ------ Main Reusable Component ------

export function QuestionCard({
  question,
  selectedOptionTag,
  onSelect,
  onNext,
  onPrev,
  isFirst,
  isLast,
  progress,
  questionNumber,
  totalQuestions,
  isSubmitting,
  onSubmit
}) {
  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both relative z-10">
      
      {/* Dynamic Background Elements for Question Wrap */}
      <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-app-secondary/10 blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[250px] h-[250px] rounded-full bg-neon-purple/10 blur-[80px] pointer-events-none z-0" />

      {/* Title Header */}
      <div className="mb-10 text-center space-y-3 relative z-10">
        <Badge className="bg-gradient-to-r from-app-secondary to-app-primary text-white border-0 shadow-app-primary/30 shadow-lg mb-2">
          <BrainCircuit className="w-4 h-4 mr-2 text-white" /> Neuro-Mapping Phase
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
          Aptitude Discovery
        </h1>
        <p className="text-slate-400 font-medium">Calibrating your cognitive and passion metrics.</p>
      </div>

      <Card className="overflow-hidden">
        
        {/* Top Header with Progress & Badge */}
        <div className="p-8 border-b border-white/5 bg-background-light/40 backdrop-blur-md relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
            <span className="text-sm font-bold text-slate-400 tracking-widest uppercase">
              Phase {question.sectionName.split(' ')[0]} Metrics
            </span>
            <span className="text-sm font-black text-neon-cyan bg-neon-cyan/10 px-4 py-1.5 rounded-full border border-neon-cyan/20">
              {questionNumber} / {totalQuestions}
            </span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Question Area */}
        <div className="p-8 md:p-10 relative z-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-8 leading-tight tracking-tight">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, idx) => {
              const isSelected = selectedOptionTag === option.tag;
              return (
                <button
                  key={idx}
                  onClick={() => onSelect(option.tag)}
                  className={cn(
                    "w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-start gap-5 focus:outline-none group",
                    isSelected 
                      ? "border-app-secondary bg-app-secondary/10 shadow-lg shadow-app-secondary/10 scale-[1.02] ring-2 ring-app-secondary/30" 
                      : "border-white/10 bg-background-light/50 hover:border-app-primary/50 hover:bg-background-light hover:shadow-sm text-slate-300"
                  )}
                >
                  <div className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 shadow-sm transition-all duration-300",
                    isSelected 
                      ? "border-app-secondary bg-app-secondary text-background-dark shadow-neon-cyan/40" 
                      : "border-slate-600 bg-background-dark group-hover:border-app-primary group-hover:bg-app-primary/10"
                  )}>
                    <Check className={cn("w-3.5 h-3.5 transition-transform duration-300", isSelected ? "scale-100" : "scale-0 opacity-0")} />
                  </div>
                  <span className={cn(
                    "text-lg leading-relaxed transition-colors duration-300", 
                    isSelected ? "text-white font-bold" : "text-slate-400 font-medium group-hover:text-slate-200"
                  )}>
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation Area */}
        <div className="p-8 md:p-10 pt-0 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 relative z-10">
          <Button
            type="button"
            variant="ghost"
            onClick={onPrev}
            disabled={isFirst || isSubmitting}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5 mr-3" /> Revert
          </Button>

          {!isLast ? (
            <Button
              type="button"
              onClick={onNext}
              disabled={!selectedOptionTag}
              className="w-full sm:w-auto shadow-app-primary/20 bg-gradient-to-r from-neon-purple to-neon-pink group"
            >
              Lock Selection <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={onSubmit}
              disabled={!selectedOptionTag || isSubmitting}
              className="w-full sm:w-auto shadow-app-primary/20 shadow-xl relative overflow-hidden group border-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" /> Processing Neural Map...
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative flex items-center">
                    Engage Analysis Matrix <Sparkles className="w-5 h-5 ml-3 transition-all group-hover:scale-110 group-hover:rotate-12" />
                  </span>
                </>
              )}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
