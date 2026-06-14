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
      className="font-sans text-5xl md:text-6xl font-extrabold tracking-tight text-stone-900"
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
              <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight leading-tight mb-6 text-stone-900 select-none">
                {study.title}{" "}
                <span className="font-sans font-extrabold bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent">
                  {study.italicWord}
                </span>
              </h3>
              
              <p className="text-stone-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                {study.description}
              </p>

              {/* Dynamic Metrics Row */}
              <div id="metrics-grid-element" className="grid grid-cols-2 gap-6 sm:gap-10 border-t border-stone-200 pt-8">
                {study.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="space-y-1">
                    <div className="flex items-baseline mb-1">
                      <AnimCounter targetValue={metric.value} />
                    </div>
                    <div className="text-xs uppercase font-extrabold tracking-widest text-[#013AE0]">
                      {metric.label}
                    </div>
                    <div className="text-[11px] text-stone-500 leading-tight">
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
              <div className="relative group overflow-hidden rounded-3xl border-2 border-stone-200 bg-stone-50 shadow-[0_12px_45px_rgba(0,0,0,0.06)] hover:border-blue-500/50 hover:shadow-[0_16px_50px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-pointer">
                <img
                  src={study.imageUrl}
                  alt={study.overlayText}
                  className="w-full h-[320px] sm:h-[480px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
