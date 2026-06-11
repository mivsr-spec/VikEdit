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
      className={`relative w-full rounded-2xl bg-neutral-900 border text-left overflow-hidden p-6 cursor-pointer transition-all duration-500 ease-in-out select-none transform hover:-translate-y-1 ${
        isHovered
          ? "border-blue-500/40 shadow-[0_12px_32px_rgba(59,130,246,0.1)] max-h-[500px]"
          : "border-neutral-800 shadow-[0_4px_18px_rgba(0,0,0,0.2)] max-h-[94px]"
      }`}
      style={{
        transitionProperty: "max-height, border-color, box-shadow, transform",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient soft blue glow spot that intensifies on hover */}
      <div
        className={`absolute right-[-10%] top-[-10%] w-48 h-48 rounded-full bg-blue-500/5 blur-[40px] pointer-events-none transition-opacity duration-700 ${
          isHovered ? "opacity-100" : "opacity-0"
         }`}
      />

      {/* Header containing number, title, and elegant icon container */}
      <div className="flex items-center gap-4 relative z-10 h-11">
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
            isHovered
              ? "bg-blue-950 text-blue-400 border border-blue-800/60 scale-105"
              : "bg-neutral-800 border border-neutral-700/60 text-stone-300"
          }`}
        >
          {getIcon()}
        </div>
        <h3 className={`font-sans font-bold text-base md:text-lg tracking-tight transition-colors duration-300 ${isHovered ? "text-blue-400" : "text-white"}`}>
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
        <p className="text-stone-300 text-[14px] md:text-[14px] leading-relaxed font-sans font-normal">
          {body}
        </p>
      </div>
    </div>
  );
}
