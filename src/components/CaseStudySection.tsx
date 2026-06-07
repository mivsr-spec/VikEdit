import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { CASE_STUDIES } from "../data";

// Sub-component to count up beautifully on viewport entry
function AnimCounter({ targetValue }: { targetValue: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [current, setCurrent] = useState<number | string>("");

  useEffect(() => {
    const match = targetValue.match(/^([\d.,]+)(.*)$/);
    if (!match) {
      setCurrent(targetValue);
      return;
    }

    const numVal = parseFloat(match[1].replace(/,/g, ""));
    const suffixStr = match[2] || "";

    if (!isInView) {
      setCurrent(`0${suffixStr}`);
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 1200; // 1.2s for smooth counting
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentVal = progress === 1 ? numVal : numVal * easeOutQuad(progress);

      const formattedNum = Math.floor(currentVal).toLocaleString();
      setCurrent(`${formattedNum}${suffixStr}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, targetValue]);

  return (
    <span 
      ref={ref} 
      className="font-sans text-5xl md:text-6xl font-extrabold tracking-tight text-[#1A1A1A]"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      {current || targetValue}
    </span>
  );
}

export default function CaseStudySection() {
  return (
    <div className="space-y-24 md:space-y-36">
      {CASE_STUDIES.map((study, idx) => {
        const isReversed = idx % 2 === 1;

        return (
          <div
            key={study.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
          >
            {/* Left Column for non-reversed, Right Column for reversed (Text / Title) */}
            <div
              className={`lg:col-span-6 ${
                isReversed ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <h3 className="text-3xl md:text-5xl font-sans font-bold text-[#1A1A1A] tracking-tight leading-tight mb-6">
                {study.title}
                <span className="italic font-serif font-medium font-normal text-slate-800">
                  {study.italicWord}
                </span>
              </h3>
              
              <p className="text-[#6B6B6B] text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                {study.description}
              </p>

              {/* Dynamic Metrics Row */}
              <div id="metrics-grid-element" className="grid grid-cols-2 gap-6 sm:gap-10 border-t border-[#E8E6E1] pt-8">
                {study.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="space-y-1">
                    <div className="flex items-baseline mb-1">
                      <AnimCounter targetValue={metric.value} />
                    </div>
                    <div className="text-xs uppercase font-bold tracking-widest text-[#1A1A1A]">
                      {metric.label}
                    </div>
                    <div className="text-[11px] text-[#999999] leading-tight">
                      {metric.sublabel}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image display col */}
            <div
              className={`lg:col-span-6 ${
                isReversed ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <div className="relative group overflow-hidden rounded-3xl border border-[#E8E6E1] shadow-xs cursor-pointer">
                {/* Visual Glow and Soft overlay filter */}
                <div className="absolute inset-0 bg-stone-900/10 z-10 transition-colors duration-500 group-hover:bg-stone-900/20" />
                
                <img
                  src={study.imageUrl}
                  alt={study.overlayText}
                  className="w-full h-[320px] sm:h-[480px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Styled Bottom Overlay Card */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-20 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent pt-24 flex flex-col justify-end">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-xl flex items-center justify-between text-left transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-stone-300 block mb-1">
                        Client Partner
                      </span>
                      <span className="text-white font-sans text-xl md:text-2xl font-extrabold tracking-tight">
                        {study.overlayText}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-md border border-white/25 group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-current" strokeWidth="2.5">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Subtle top indicator badge instead of bottom for better layout spacing */}
                <div className="absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-[10px] text-white/90">
                  ✨ Repurposed Format
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
