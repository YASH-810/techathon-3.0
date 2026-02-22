"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ChevronDown, Loader2, Check, X, UserCircle, KeyRound, Sparkles } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ------ Styled Inline Components for Dark/Neon Vibe ------

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-[2.5rem] border border-white/10 bg-card-dark/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] text-slate-100 relative overflow-hidden", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-2 p-8 md:p-10", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-3xl font-extrabold leading-none tracking-tight text-white", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-base font-medium text-slate-400", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-8 md:p-10 pt-0 md:pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("text-sm font-bold tracking-wide text-slate-300 block", className)} {...props} />
));
Label.displayName = "Label";

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input type={type} className={cn("flex h-12 w-full rounded-xl border border-white/10 bg-background-light/50 px-4 py-2 text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-app-secondary focus:border-transparent focus:bg-background-light disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm", className)} ref={ref} {...props} />
));
Input.displayName = "Input";

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 active:scale-95 shadow-sm";
  const variants = {
    default: "bg-gradient-to-r from-app-primary to-neon-purple text-white hover:shadow-lg hover:shadow-neon-purple/30 border border-transparent",
    outline: "border-2 border-app-primary/30 bg-background-light/50 text-app-primary hover:bg-app-primary hover:text-white hover:border-app-primary",
    ghost: "hover:bg-white/10 hover:text-white",
  };
  const sizes = {
    default: "h-14 px-8 text-base",
    sm: "h-11 px-6",
    icon: "h-12 w-12",
  };
  return <button ref={ref} className={cn(baseStyles, variants[variant], sizes[size], className)} {...props} />;
});
Button.displayName = "Button";

const Separator = React.forwardRef(({ className, orientation = "horizontal", ...props }, ref) => (
  <div ref={ref} className={cn("shrink-0 bg-white/10", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)} {...props} />
));
Separator.displayName = "Separator";

const Badge = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("inline-flex items-center rounded-full border border-neon-cyan/20 bg-neon-cyan/10 px-3 py-1 text-xs font-bold text-neon-cyan shadow-sm transition-transform", className)} {...props} />
));
Badge.displayName = "Badge";

// Form Constants
const EDUCATION_STAGES = ["After 10th", "After 12th", "Graduate"];
const TIMES = ["4 hours/week", "6 hours/week", "10+ hours/week"];
const SUBJECTS_LIST = ["Algebra", "Geometry", "Physics", "Chemistry", "Biology", "History", "Civics", "Geography", "Hindi", "Marathi", "Sanskrit", "Other"];
const GRADES = ["Below Average", "Average", "Good", "Excellent"];
const CGPA_RANGES = ["Below 6", "6–7", "7–8", "8+"];

export default function RegistrationForm() {
  const [phase, setPhase] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, trigger, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      educationStage: "After 10th",
      weeklyTime: "",
      subjects: [],
      degreeName: "",
      majorSubject: "",
      cgpaRange: ""
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects"
  });

  const educationStage = watch("educationStage");
  const weeklyTime = watch("weeklyTime");
  const selectedSubjects = watch("subjects");

  const unselectedSubjects = SUBJECTS_LIST.filter(
    s => s === "Other" || !selectedSubjects?.find(sub => sub.name === s)
  );

  const onNext = async () => {
    const valid = await trigger(["fullName", "email", "password", "educationStage", "weeklyTime"]);
    if (valid) {
      setPhase(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1500));
    console.log("Registered Data:", data);
    setIsSubmitting(false);
    alert("Registration Flow Completed Successfully!");
  };

  const handleAddSubject = (e) => {
    const val = e.target.value;
    if (val) {
      append({ name: val, customName: "", grade: "" });
      e.target.value = ""; 
    }
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center p-4 md:p-8 font-sans antialiased text-slate-100 relative overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-app-primary/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-app-secondary/10 blur-[120px]" />
      </div>

      <Card className="w-full max-w-xl z-10">
        <CardHeader className="text-center border-b border-white/10 relative z-10 md:static pt-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center shadow-lg shadow-neon-pink/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <CardTitle className="tracking-tight mt-2 md:mt-0">Initiate Profile</CardTitle>
          <CardDescription className="pt-2">
             {phase === 1 ? "Phase 1: Biometric & Contact" : "Phase 2: Academic Trajectory"}
          </CardDescription>
          
          {/* Glowing Progress Bar */}
          <div className="w-full h-1.5 bg-background-light rounded-full mt-6 overflow-hidden max-w-[200px] mx-auto relative border border-white/5">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-app-secondary to-app-primary transition-all duration-700 ease-out shadow-[0_0_10px_rgba(6,182,212,0.8)]" 
              style={{ width: phase === 1 ? "50%" : "100%" }} 
            />
          </div>
        </CardHeader>

        <CardContent className="pt-8 min-h-[450px] relative z-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* -------------------- PHASE 1 -------------------- */}
            <div className={cn("space-y-6 transition-all duration-500 ease-out", phase === 1 ? "opacity-100 block animate-in fade-in zoom-in-95" : "opacity-0 hidden")}>
              
              <div className="space-y-5">
                <div className="space-y-2 focus-within:text-neon-cyan group">
                  <Label htmlFor="fullName" className="transition-colors group-focus-within:text-neon-cyan flex items-center gap-2"><UserCircle className="w-4 h-4" /> Full Name</Label>
                  <Input id="fullName" placeholder="e.g. Samuel Bennett" {...register("fullName", { required: "Full name is required" })} />
                  {errors.fullName && <p className="text-neon-pink text-xs font-bold animate-in fade-in">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2 focus-within:text-neon-cyan group">
                  <Label htmlFor="email" className="transition-colors group-focus-within:text-neon-cyan">Secure Comm Link (Email)</Label>
                  <Input id="email" type="email" placeholder="samuel@university.edu" {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" } })} />
                  {errors.email && <p className="text-neon-pink text-xs font-bold animate-in fade-in">{errors.email.message}</p>}
                </div>

                <div className="space-y-2 focus-within:text-neon-cyan group">
                  <Label htmlFor="password" className="transition-colors group-focus-within:text-neon-cyan flex items-center gap-2"><KeyRound className="w-4 h-4" /> Passcode</Label>
                  <Input id="password" type="password" placeholder="••••••••" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Must be at least 6 characters" } })} />
                  {errors.password && <p className="text-neon-pink text-xs font-bold animate-in fade-in">{errors.password.message}</p>}
                </div>
              </div>

              <Separator className="my-8" />

              <div className="space-y-5">
                <div className="space-y-2 focus-within:text-neon-cyan group relative">
                  <Label htmlFor="weeklyTime" className="transition-colors group-focus-within:text-neon-cyan">Bandwidth (Weekly Time Allocation)</Label>
                  <div className="relative">
                    <select
                      id="weeklyTime"
                      {...register("weeklyTime", { required: "Please select availability" })}
                      className={cn(
                        "flex h-12 w-full appearance-none rounded-xl border border-white/10 bg-background-light/50 px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-app-secondary focus:bg-background-light text-white shadow-sm cursor-pointer",
                        !weeklyTime && "text-slate-500"
                      )}
                      defaultValue=""
                    >
                      <option value="" disabled hidden className="bg-background-dark text-slate-500">Select your availability...</option>
                      {TIMES.map(t => <option key={t} className="bg-background-dark text-white font-medium" value={t}>{t}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-4 h-4 w-4 text-slate-400 pointer-events-none transition-transform group-focus-within:-rotate-180" />
                  </div>
                  {errors.weeklyTime && <p className="text-neon-pink text-xs font-bold animate-in fade-in">{errors.weeklyTime.message}</p>}
                </div>
              </div>

              <div className="pt-4">
                <Button type="button" onClick={onNext} className="w-full text-lg group bg-gradient-to-r from-app-secondary to-app-primary">
                  Advance to Phase 2
                  <ChevronDown className="ml-2 w-5 h-5 opacity-80 -rotate-90 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* -------------------- PHASE 2 -------------------- */}
            <div className={cn("space-y-6 transition-all duration-500 ease-out", phase === 2 ? "opacity-100 block animate-in fade-in slide-in-from-right-4" : "opacity-0 hidden")}>
              
              {["After 10th", "After 12th"].includes(educationStage) && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="space-y-2">
                     <Label className="text-lg text-white">Skill Nodes</Label>
                     <p className="text-sm font-medium text-slate-400">Attach academic nodes and rank your proficiency.</p>
                  </div>
                   
                  <div className="relative group">
                     <select 
                       className="flex h-12 w-full appearance-none rounded-xl border border-neon-cyan/30 bg-background-light px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-neon-cyan text-neon-cyan shadow-sm cursor-pointer hover:bg-white/5"
                       onChange={handleAddSubject}
                       defaultValue=""
                     >
                       <option value="" disabled className="bg-background-dark text-slate-500">Click to mount a subject node...</option>
                       {unselectedSubjects.map(sub => <option key={sub} value={sub} className="bg-background-dark text-white">{sub}</option>)}
                     </select>
                     <ChevronDown className="absolute right-4 top-4 h-4 w-4 text-neon-cyan pointer-events-none transition-transform group-focus-within:-rotate-180" />
                  </div>

                  <div className="space-y-4 pt-2">
                     {fields.length === 0 && (
                       <div className="p-8 text-center border-2 border-dashed rounded-2xl bg-white/5 border-white/10 animate-in fade-in">
                         <p className="text-sm font-bold text-slate-500">Awaiting node selection.</p>
                       </div>
                     )}
                     
                     {fields.map((item, index) => (
                       <div key={item.id} className="p-5 rounded-2xl border border-white/5 bg-background-light shadow-[0_4px_15px_rgba(0,0,0,0.2)] relative animate-in slide-in-from-top-2 fade-in zoom-in-95 duration-200 isolate">
                         <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                           
                           <div className="flex-1 space-y-3">
                             <div className="flex items-center gap-2">
                                <Badge className="shadow-none border border-neon-cyan/20 bg-neon-cyan/10 text-neon-cyan">{item.name}</Badge>
                             </div>
                             
                             {item.name === "Other" && (
                               <div className="animate-in slide-in-from-top-1 fade-in">
                                 <Input 
                                   placeholder="Identify custom node" 
                                   className="h-10 text-sm bg-background-dark border-white/10"
                                   {...register(`subjects.${index}.customName`, { required: "Custom node name required" })} 
                                 />
                                 {errors?.subjects?.[index]?.customName && <p className="text-neon-pink text-[10px] font-bold mt-1">{errors.subjects[index].customName.message}</p>}
                               </div>
                             )}
                           </div>
                           
                           <div className="w-full sm:w-48 shrink-0 group">
                             <div className="relative">
                               <select
                                 {...register(`subjects.${index}.grade`, { required: "Required" })}
                                 className={cn(
                                   "flex h-10 w-full appearance-none rounded-lg border border-white/10 bg-background-dark px-3 py-1.5 text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-app-primary cursor-pointer text-white",
                                   !selectedSubjects?.[index]?.grade && "text-slate-500 shadow-sm"
                                 )}
                                 defaultValue=""
                               >
                                  <option value="" disabled hidden>Rank Proficiency</option>
                                  {GRADES.map(g => <option key={g} className="bg-background-dark text-white" value={g}>{g}</option>)}
                               </select>
                               <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-500 pointer-events-none group-focus-within:rotate-180 transition-transform" />
                             </div>
                             {errors?.subjects?.[index]?.grade && <p className="text-neon-pink text-[10px] font-bold mt-1">{errors.subjects[index].grade.message}</p>}
                           </div>

                         </div>
                         
                         <button 
                           type="button" 
                           onClick={() => remove(index)}
                           className="absolute -top-3 -right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-card-dark bg-background-light shadow-sm text-slate-400 hover:text-neon-pink hover:border-neon-pink/50 hover:bg-neon-pink/10 focus:outline-none focus:ring-2 focus:ring-neon-pink transition-colors"
                         >
                           <X className="h-4 w-4" />
                         </button>
                       </div>
                     ))}
                  </div>
                </div>
              )}

              {educationStage === "Graduate" && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="space-y-2 focus-within:text-neon-cyan group">
                    <Label htmlFor="degreeName" className="transition-colors group-focus-within:text-neon-cyan">Degree Certification</Label>
                    <Input id="degreeName" placeholder="e.g. B.Tech, BSc" {...register("degreeName", { required: "Degree name is required" })} />
                    {errors.degreeName && <p className="text-neon-pink text-xs font-bold animate-in fade-in">{errors.degreeName.message}</p>}
                  </div>
                  
                  <div className="space-y-2 focus-within:text-neon-cyan group">
                    <Label htmlFor="majorSubject" className="transition-colors group-focus-within:text-neon-cyan">Core Discipline</Label>
                    <Input id="majorSubject" placeholder="e.g. Computer Science" {...register("majorSubject", { required: "Major subject is required" })} />
                    {errors.majorSubject && <p className="text-neon-pink text-xs font-bold animate-in fade-in">{errors.majorSubject.message}</p>}
                  </div>

                  <div className="space-y-2 focus-within:text-neon-cyan group">
                    <Label htmlFor="cgpaRange" className="transition-colors group-focus-within:text-neon-cyan">CGPA Calibration</Label>
                    <div className="relative">
                      <select
                        id="cgpaRange"
                        {...register("cgpaRange", { required: "CGPA is required" })}
                         className={cn(
                          "flex h-12 w-full appearance-none rounded-xl border border-white/10 bg-background-light/50 px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-app-secondary text-white shadow-sm cursor-pointer",
                          !watch("cgpaRange") && "text-slate-500"
                        )}
                        defaultValue=""
                      >
                         <option value="" disabled hidden className="bg-background-dark text-slate-500">Select your bracket...</option>
                         {CGPA_RANGES.map(c => <option key={c} className="bg-background-dark text-white font-bold" value={c}>{c}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-4 h-4 w-4 text-slate-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
                    </div>
                    {errors.cgpaRange && <p className="text-neon-pink text-xs font-bold animate-in fade-in">{errors.cgpaRange.message}</p>}
                  </div>
                </div>
              )}

              <Separator className="my-6" />

              <div className="flex flex-col-reverse sm:flex-row items-center gap-4 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setPhase(1)} className="w-full sm:w-auto h-14">
                  Revert
                </Button>
                <div className="w-full sm:flex-1">
                  <Link href="/quiz">
                  <Button type="submit" className="w-full shadow-app-primary/20 shadow-xl">
                    Finalize Comm-Link
                  </Button>
                  </Link>
                </div>
              </div>
              
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}