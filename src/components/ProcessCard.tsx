import { useState } from "react";
import { Sparkles, UploadCloud, Video, Layers } from "lucide-react";

interface ProcessCardProps {
  num: number;
  title: string;
  body: string;
}

export default function ProcessCard({ num, title, body }: ProcessCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Map numbers to elegant icons matching requirements
  const getIcon = () => {
    switch (num) {
      case 1:
        return <Sparkles className="w-5 h-5" />;
      case 2:
        return <UploadCloud className="w-5 h-5" />;
      case 3:
        return <Video className="w-5 h-5" />;
      case 4:
        return <Layers className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div
      className={`relative w-full rounded-2xl bg-white border text-left overflow-hidden p-6 cursor-pointer transition-all duration-500 ease-in-out select-none transform hover:-translate-y-1 ${
        isHovered
          ? "border-violet-500/50 shadow-[0_12px_32px_rgba(139,92,246,0.08)] max-h-[500px]"
          : "border-[#E8E6E1] shadow-[0_4px_18px_rgba(26,26,26,0.015)] max-h-[94px]"
      }`}
      style={{
        transitionProperty: "max-height, border-color, box-shadow, transform",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient soft purple/violet glow spot that intensifies on hover */}
      <div
        className={`absolute right-[-10%] top-[-10%] w-48 h-48 rounded-full bg-violet-500/5 blur-[40px] pointer-events-none transition-opacity duration-700 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Header containing number, title, and elegant icon container */}
      <div className="flex items-center gap-4 relative z-10 h-11">
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
            isHovered
              ? "bg-violet-50 text-violet-600 border border-violet-200 scale-105"
              : "bg-[#F5F3EF] border border-[#E8E6E1]/70 text-[#1A1A1A]/70"
          }`}
        >
          {getIcon()}
        </div>
        <h3 className="font-sans font-bold text-base md:text-lg text-[#1A1A1A] tracking-tight">
          {title}
        </h3>
      </div>

      {/* Body text revealed on hover with a smooth fade & slide up transition */}
      <div
        className={`mt-4 relative z-10 transition-all duration-500 ease-in-out ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        style={{
          transitionDelay: isHovered ? "150ms" : "0ms",
        }}
      >
        <p className="text-[#6B6B6B] text-[14px] md:text-[14px] leading-relaxed font-sans font-normal">
          {body}
        </p>
      </div>
    </div>
  );
}
