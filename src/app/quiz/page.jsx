"use client";

import React, { useState, useMemo } from "react";
import quizData from "./quizData.json";
import { QuestionCard } from "@/components/QuestionCard";
import { Sparkles } from "lucide-react";

export default function CareerQuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = useMemo(() => {
    return quizData.reduce((acc, section) => {
      const sectionQs = section.questions.map((q) => ({
        ...q,
        sectionName: section.section,
      }));
      return [...acc, ...sectionQs];
    }, []);
  }, []);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleSelect = (tag) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: tag,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 2500));
    setIsSubmitting(false);
    setIsCompleted(true);
    console.log("Quiz Results Payload:", answers);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative completion blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/20 rounded-full blur-[100px] z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-app-primary/10 rounded-full blur-[80px] z-0" />

        <div className="bg-card-dark/80 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 max-w-lg w-full text-center relative z-10 animate-in zoom-in-95 fade-in duration-700">
          <div className="w-24 h-24 bg-gradient-to-br from-neon-cyan to-app-secondary text-background-dark rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-neon-cyan/20 rotate-3">
            <Sparkles className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white mb-4">Neural Mapping Complete</h2>
          <p className="text-slate-400 mb-10 leading-relaxed font-medium text-lg">
            Nexus AI has synthesized your psychometric profile and is formulating your optimal career vectors.
          </p>
          <button 
            onClick={() => window.location.href = "/results"} 
            className="w-full inline-flex items-center justify-center bg-gradient-to-r from-app-secondary to-app-primary text-white font-bold text-lg h-16 rounded-2xl hover:shadow-2xl hover:shadow-app-secondary/30 transition-all active:scale-95 border border-transparent"
          >
            Initialize Readout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark flex py-12 px-4 md:py-20 font-sans antialiased relative overflow-hidden selection:bg-app-primary/30">
      
      {/* Dynamic Background Elements for Quiz Route Overlay */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-app-primary/20 to-neon-purple/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-app-secondary/20 to-neon-cyan/10 blur-[100px]" />
      </div>

      <div key={currentQuestion.id} className="w-full flex justify-center h-fit">
        <QuestionCard
          question={currentQuestion}
          selectedOptionTag={answers[currentQuestion.id]}
          onSelect={handleSelect}
          onNext={handleNext}
          onPrev={handlePrev}
          isFirst={currentIndex === 0}
          isLast={currentIndex === totalQuestions - 1}
          progress={progress}
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
