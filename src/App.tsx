import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Layers, 
  Play, 
  Users, 
  ArrowUpRight, 
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  MousePointer,
  Sparkles,
  Quote,
  Video,
  UploadCloud,
  Cpu,
  EyeOff,
  Mic,
  X,
  Check
} from "lucide-react";

import { VortexBackground } from "./components/VortexBackground";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";
import ContactForm from "./components/ContactForm";
import InteractivePhone from "./components/InteractivePhone";
import CaseStudySection from "./components/CaseStudySection";
import ComparisonTable from "./components/ComparisonTable";
import { TestimonialsSection } from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";
import ProcessCard from "./components/ProcessCard";

import { 
  SERVICE_ITEMS, 
  TEAM_MEMBERS, 
  BLOG_ITEMS,
  TESTIMONIALS 
} from "./data";

const StrategyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#1A1A1A]" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 12l10 10 10-10L12 2z" />
    <path d="M12 6L6 12l6 6 6-6L12 6z" strokeWidth="1.2" opacity="0.6" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const CreateManageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#1A1A1A]" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="3" />
    <rect x="10" y="4" width="4" height="1.5" rx="0.75" fill="currentColor" stroke="none" />
    <path d="M7 17h10" />
    <circle cx="12" cy="19" r="1.2" fill="currentColor" />
  </svg>
);

const ReviewRefineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#1A1A1A]" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 8h10" />
    <path d="M7 12h8" />
    <path d="M7 16h4" />
    <circle cx="16" cy="15" r="1.5" fill="currentColor" />
  </svg>
);

const StackedCard = ({ index, children }: { index: number; children: ReactNode }) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: anchorRef,
    offset: ["start start", "end start"]
  });

  const isLast = index === 2;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.88]);
  const y = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : 25]);

  return (
    <div className="relative w-full">
      {/* Invisible anchor playing as natural flow placeholder */}
      <div 
        ref={anchorRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none invisible" 
      />
      
      {/* Actual sticky deck card in a zig-zag format */}
      <motion.div
        whileHover={{
          scale: isMobile ? 1 : 1.015,
          rotate: 0,
          x: 0,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        style={{
          position: isMobile ? "static" : "sticky",
          top: isMobile ? "auto" : `calc(100px + ${index * 24}px)`,
          zIndex: 10 + index,
          scale: isMobile ? 1 : scale,
          opacity: isMobile ? 1 : opacity,
          y: isMobile ? 0 : y,
          rotate: isMobile ? 0 : (index === 0 ? -1.5 : index === 1 ? 1.5 : -0.5),
          x: isMobile ? 0 : (index === 0 ? -24 : index === 1 ? 24 : -12),
        }}
        className="w-full bg-white rounded-3xl border border-[#E8E6E1] p-8 md:p-12 shadow-[0_10px_35px_-6px_rgba(26,26,26,0.08),0_10px_10px_-5px_rgba(26,26,26,0.04)] hover:shadow-[0_25px_50px_-12px_rgba(26,26,26,0.15)] transition-shadow duration-300 transform-gpu"
      >
        {children}
      </motion.div>
    </div>
  );
};

interface ServiceDataItem {
  title: string;
  description: string;
}

const SERVICES_DATA: ServiceDataItem[] = [
  {
    title: "Short-Form Content",
    description: "High-retention Reels, Shorts, and vertical videos with fast-paced cuts, eye-catching captions, and motion graphics that stop the scroll and keep viewers watching."
  },
  {
    title: "Long-Form Repurposing",
    description: "Turn your hour-long podcast or YouTube video into 10+ bite-sized clips. We extract the best moments so one recording fuels weeks of content across all platforms."
  },
  {
    title: "Multi-Platform Formatting",
    description: "Every platform has different rules. We resize, reformat, and optimize your content for Instagram, YouTube, LinkedIn, and beyond so it looks native and performs better everywhere."
  },
  {
    title: "Corporate & Course Videos",
    description: "Polished webinars, training videos, marketing content, and online courses. We make your business content look professional, clear, and engaging for your audience."
  },
  {
    title: "Content Workflow",
    description: "Upload your raw footage. We handle the rest editing, revisions, formatting, and delivery. No back-and-forth chaos. Just consistent, ready-to-post content on your schedule."
  }
];

const FACELESS_SERVICES_DATA: ServiceDataItem[] = [
  {
    title: "AI-Generated Visuals",
    description: "Custom AI imagery and animations synced with narration for unique, copyright-safe content."
  },
  {
    title: "Kinetic Typography",
    description: "Text-on-screen reels with motion graphics, perfect for quotes, lists, and educational content."
  },
  {
    title: "Podcast-to-Visual Content",
    description: "Your audio (or AI voiceover) paired with B-roll, captions, and dynamic visuals no camera required."
  },
  {
    title: "Screen Recording Edits",
    description: "Tutorials, software demos, and walkthroughs with zoom effects, captions, and annotations."
  },
  {
    title: "Reddit & Story Channels",
    description: "Engaging narrated stories paired with gameplay, stock visuals, or kinetic text."
  }
];

export interface PortfolioItem {
  id: string;
  category: "short-form" | "corporate" | "faceless" | "workflow";
  tag: string;
  title: string;
  description: string;
  image: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "short-form-content",
    category: "short-form",
    tag: "High Retention",
    title: "Short-Form Content",
    description: "High-retention Reels & Shorts with fast-paced cuts, eye-catching captions, and motion graphics that stop the scroll.",
    image: "https://images2.imgbox.com/21/20/bZ2VNuja_o.png"
  },
  {
    id: "long-form-repurposing",
    category: "workflow",
    tag: "Repurposing",
    title: "Long-Form Repurposing",
    description: "Turn your hour-long podcast into 10+ bite-sized clips. We extract the best moments so one recording fuels weeks of content.",
    image: "https://images2.imgbox.com/96/d0/yx2ys49b_o.png"
  },
  {
    id: "multi-platform-formatting",
    category: "short-form",
    tag: "Optimization",
    title: "Multi-Platform Formatting",
    description: "We resize and reformat content for Instagram, YouTube, and LinkedIn so it looks native and performs better everywhere.",
    image: "https://images2.imgbox.com/eb/cc/6UEUkWxn_o.png"
  },
  {
    id: "corporate-courses",
    category: "corporate",
    tag: "Professional",
    title: "Corporate & Courses",
    description: "Polished webinars, training videos, and marketing content. We make your business content look professional and engaging.",
    image: "https://images2.imgbox.com/44/f9/oj2ZFV3S_o.png"
  },
  {
    id: "faceless-content",
    category: "faceless",
    tag: "New Service",
    title: "Faceless Content",
    description: "AI voiceovers, stock footage, and kinetic typography. Build authority and grow audiences without ever showing your face.",
    image: "https://images2.imgbox.com/a5/48/aCQQEenH_o.png"
  },
  {
    id: "content-workflow",
    category: "workflow",
    tag: "Systematic",
    title: "Content Workflow",
    description: "Upload your raw footage. We handle the rest editing, revisions, formatting, and delivery. No back-and-forth chaos.",
    image: "https://images2.imgbox.com/a0/b7/8mYD7omb_o.png"
  }
];

const renderFacelessPreviewMockup = (index: number) => {
  switch (index) {
    case 0:
      return (
        <motion.div
          key="ai-generated"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full flex items-center justify-center min-h-[350px] md:min-h-[450px]"
        >
          {/* Subtle glow background */}
          <div className="absolute inset-0 bg-stone-100/50 rounded-[32px] overflow-hidden">
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#D4D0C8] rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-stone-200 rounded-full blur-2xl opacity-60" />
          </div>

          {/* Social Video Mockup */}
          <div className="relative w-[180px] sm:w-[220px] h-[320px] sm:h-[400px] rounded-[28px] bg-[#1A1A1A] border-4 border-[#1A1A1A] shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Visual thumbnail */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" 
                alt="AI Generated Visual" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/45" />
            </div>

            {/* Social Header */}
            <div className="relative z-10 p-3 flex justify-between items-center text-white">
              <span className="text-[10px] font-mono tracking-wider opacity-90 font-bold">AI Render</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Content scanning or loading visual overlays */}
            <div className="relative z-10 flex flex-col items-center justify-center text-white/90 gap-1.5">
              <motion.div 
                animate={{ scale: [1, 1.08, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-10 h-10 rounded-full bg-[#1A1A1A]/70 backdrop-blur-sm border border-emerald-400/30 flex items-center justify-center text-emerald-400"
              >
                <Cpu className="w-5 h-5 animate-pulse" />
              </motion.div>
              <span className="text-[9px] font-mono tracking-widest uppercase text-emerald-300 font-bold">SYNTHESIZING...</span>
            </div>

            {/* In-video smart captions overlay */}
            <div className="relative z-10 px-4 py-2 flex flex-col gap-1 items-center">
              <div className="bg-emerald-400 text-black px-2 py-0.5 rounded-md font-sans text-[10px] sm:text-xs font-black uppercase text-center shadow-md">
                100% PATENT FREE
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-[12px] p-2 text-[9px] leading-snug text-center">
                Custom AI imagery synced with strategic story loops.
              </div>
            </div>

            {/* Static bottom bar */}
            <div className="relative z-10 p-3 flex flex-col gap-1.5 bg-black/40 backdrop-blur-md">
              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                <motion.div animate={{ width: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="bg-emerald-400 h-full" />
              </div>
              <div className="flex justify-between text-[10px] text-white/80 font-mono">
                <span>@vikedit_ai</span>
                <span className="text-emerald-400">Copyright Safe</span>
              </div>
            </div>
          </div>

          {/* Floating badges matching style */}
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
            className="absolute top-10 right-4 sm:right-6 bg-white border border-[#E8E6E1] p-3 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#999999] block font-mono font-bold">GENERATED</span>
              <span className="text-xs font-bold text-black font-sans">AI-Powered</span>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 4.5, delay: 0.5, ease: "easeInOut" }} 
            className="absolute bottom-12 left-4 sm:left-6 bg-[#1A1A1A] text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
          >
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <span className="text-[10px] text-white/60 block font-mono font-bold">PRIVACY LOCK</span>
              <span className="text-xs font-bold font-sans">No Camera Needed</span>
            </div>
          </motion.div>
        </motion.div>
      );

    case 1:
      return (
        <motion.div
          key="kinetic-typography"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full flex items-center justify-center min-h-[350px] md:min-h-[450px]"
        >
          {/* Subtle glow background */}
          <div className="absolute inset-0 bg-[#E8E6E1]/40 rounded-[32px] overflow-hidden">
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-stone-300 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#E8E6E1] rounded-full blur-2xl opacity-60" />
          </div>

          {/* Social Video Mockup */}
          <div className="relative w-[180px] sm:w-[220px] h-[320px] sm:h-[400px] rounded-[28px] bg-black border-4 border-black shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Social Header */}
            <div className="relative z-10 p-3 flex justify-between items-center text-white">
              <span className="text-[10px] font-mono tracking-wider opacity-90 font-bold">Typography</span>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            </div>

            {/* Kinetic Text Center Stage */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center gap-2 px-4 h-36">
              <motion.span 
                animate={{ 
                  scale: [1, 1.2, 0.9, 1],
                  rotate: [0, -3, 3, 0] 
                }} 
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="text-3xl font-sans font-black tracking-tight text-white leading-none block"
              >
                IDEAS
              </motion.span>
              <motion.span 
                animate={{ 
                  scale: [0.9, 1.1, 1.1, 0.9],
                  color: ["#FFFFFF", "#FACC15", "#FFFFFF", "#FFFFFF"]
                }} 
                transition={{ repeat: Infinity, duration: 1.8, delay: 0.3, ease: "easeInOut" }}
                className="text-2xl font-serif italic text-yellow-400 leading-none block"
              >
                RULE
              </motion.span>
              <motion.span 
                animate={{ 
                  scale: [1, 0.9, 1.2, 1],
                }} 
                transition={{ repeat: Infinity, duration: 1.8, delay: 0.6, ease: "easeInOut" }}
                className="text-sm font-mono tracking-widest text-[#999999] uppercase leading-none block"
              >
                &amp; PERFORM
              </motion.span>
            </div>

            {/* In-video caption overlay */}
            <div className="relative z-10 px-4 py-2 flex flex-col gap-1 items-center">
              <div className="bg-yellow-400 text-black px-2 py-0.5 rounded-md font-sans text-[10px] sm:text-xs font-black uppercase text-center shadow-md animate-bounce">
                TEXT ONLY 🌟
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-[12px] p-2 text-[9px] leading-snug text-center w-full">
                Kinetic motion graphic layouts designed to hook scrolling eyes.
              </div>
            </div>

            {/* Static bottom bar */}
            <div className="relative z-10 p-3 flex flex-col gap-1.5 bg-black/40 backdrop-blur-md">
              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                <motion.div animate={{ width: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }} className="bg-yellow-400 h-full" />
              </div>
              <div className="flex justify-between text-[10px] text-white/80 font-mono">
                <span>@vikedit_text</span>
                <span className="text-yellow-400">High Retention</span>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
            className="absolute top-10 right-4 sm:right-6 bg-white border border-[#E8E6E1] p-3 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
          >
            <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#999999] block font-mono font-bold">CONVERSION</span>
              <span className="text-xs font-bold text-black font-sans">+180% Engagement</span>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 4.5, delay: 0.5, ease: "easeInOut" }} 
            className="absolute bottom-12 left-4 sm:left-6 bg-[#1A1A1A] text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
          >
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Layers className="w-4 h-4 text-yellow-300" />
            </div>
            <div>
              <span className="text-[10px] text-white/60 block font-mono font-bold">TYPOGRAPHY</span>
              <span className="text-xs font-bold font-sans">Kinetic Reels</span>
            </div>
          </motion.div>
        </motion.div>
      );

    case 2:
      return (
        <motion.div
          key="podcast-to-visual"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full flex items-center justify-center min-h-[350px] md:min-h-[450px]"
        >
          {/* Subtle glow background */}
          <div className="absolute inset-0 bg-[#E8E6E1]/40 rounded-[32px] overflow-hidden">
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#D4D0C8] rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#E8E6E1] rounded-full blur-2xl opacity-60" />
          </div>

          {/* Social Video Mockup */}
          <div className="relative w-[180px] sm:w-[220px] h-[320px] sm:h-[400px] rounded-[28px] bg-[#1A1A1A] border-4 border-[#1A1A1A] shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=600&auto=format&fit=crop" 
                alt="Microphone / Voiceover setup" 
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
            </div>

            {/* Social Header */}
            <div className="relative z-10 p-3 flex justify-between items-center text-white">
              <span className="text-[10px] font-mono tracking-wider opacity-90 font-bold">Podcast-to-Visual</span>
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            </div>

            {/* Centered waveform dynamic */}
            <div className="relative z-10 flex flex-col items-center justify-center text-white/95 gap-2 mt-4 font-mono">
              <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-400/40 flex items-center justify-center text-violet-300">
                <Mic className="w-5 h-5 animate-bounce-slow" />
              </div>
              <div className="flex gap-1 items-end h-7 pt-1">
                <motion.div animate={{ height: [8, 24, 8] }} transition={{ repeat: Infinity, duration: 1.0 }} className="w-1 bg-violet-400 rounded-sm" />
                <motion.div animate={{ height: [12, 32, 12] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-violet-400 rounded-sm" />
                <motion.div animate={{ height: [20, 10, 20] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1 bg-violet-400 rounded-sm" />
                <motion.div animate={{ height: [15, 28, 15] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-1 bg-violet-400 rounded-sm" />
                <motion.div animate={{ height: [6, 18, 6] }} transition={{ repeat: Infinity, duration: 1.4 }} className="w-1 bg-violet-400 rounded-sm" />
              </div>
              <span className="text-[8px] font-mono tracking-widest text-[#E8E6E1]">VOICEOVER SYNCING</span>
            </div>

            {/* Captions */}
            <div className="relative z-10 px-4 py-2 flex flex-col gap-1 items-center">
              <div className="bg-violet-500 text-white px-2 py-0.5 rounded-md font-sans text-[10px] sm:text-xs font-bold uppercase text-center shadow-md">
                B-ROLL SYNCHRONIZED
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-[12px] p-2 text-[9px] leading-snug text-center w-full">
                Your audio paired with strategic visual storytelling.
              </div>
            </div>

            {/* Static bottom bar */}
            <div className="relative z-10 p-3 flex flex-col gap-1.5 bg-black/40 backdrop-blur-md">
              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                <motion.div animate={{ width: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 5.5, ease: "linear" }} className="bg-violet-400 h-full" />
              </div>
              <div className="flex justify-between text-[10px] text-white/80 font-mono">
                <span>@vikedit_audio</span>
                <span className="text-violet-400">No Camera Needed</span>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
            className="absolute top-10 right-4 sm:right-6 bg-white border border-[#E8E6E1] p-3 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
          >
            <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
              <EyeOff className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#999999] block font-mono font-bold">PRIVACY</span>
              <span className="text-xs font-bold text-black font-sans">No Camera Needed</span>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 4.5, delay: 0.5, ease: "easeInOut" }} 
            className="absolute bottom-12 left-4 sm:left-6 bg-[#1A1A1A] text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
          >
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Mic className="w-4 h-4 text-violet-300" />
            </div>
            <div>
              <span className="text-[10px] text-white/60 block font-mono font-bold">AUDIO COUPLING</span>
              <span className="text-xs font-bold font-sans">Waveform Sync</span>
            </div>
          </motion.div>
        </motion.div>
      );

    case 3:
      return (
        <motion.div
          key="screen-recording"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full flex items-center justify-center min-h-[350px] md:min-h-[450px]"
        >
          {/* Subtle glow background */}
          <div className="absolute inset-0 bg-stone-100/50 rounded-[32px] overflow-hidden">
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#D4D0C8] rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#E8E6E1] rounded-full blur-2xl opacity-60" />
          </div>

          {/* Social Video Mockup */}
          <div className="relative w-[180px] sm:w-[220px] h-[320px] sm:h-[400px] rounded-[28px] bg-[#1A1A1A] border-4 border-stone-800 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop" 
                alt="Screencast tutorial dashboard representation" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />
            </div>

            {/* Social Header */}
            <div className="relative z-10 p-3 flex justify-between items-center text-white">
              <span className="text-[10px] font-mono tracking-wider opacity-90 font-bold">Screencast / Demos</span>
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            </div>

            {/* Dynamic zoom crop box marker overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto transition-transform duration-500">
              <motion.div 
                animate={{ scale: [0.95, 1.05, 0.95], borderColor: ["#F97316", "#FACC15", "#F97316"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-24 h-16 border-2 border-dashed border-orange-500 rounded-lg flex items-center justify-center bg-black/45 backdrop-blur-[1px] relative"
              >
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-orange-400" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-orange-400" />
                <span className="text-[8px] font-mono text-orange-300 font-bold tracking-wider uppercase animate-pulse">ZOOM 2.5X</span>
              </motion.div>
            </div>

            {/* In-video smart captions overlay */}
            <div className="relative z-10 px-4 py-2 flex flex-col gap-1 items-center">
              <div className="bg-orange-500 text-white px-2 py-0.5 rounded-md font-sans text-[10px] sm:text-xs font-extrabold uppercase text-center shadow-md">
                DYNAMIC CROP
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-[12px] p-2 text-[9px] leading-snug text-center w-full">
                Professional walkthroughs with zoom highlights and clear annotations.
              </div>
            </div>

            {/* Static bottom bar */}
            <div className="relative z-10 p-3 flex flex-col gap-1.5 bg-black/40 backdrop-blur-md">
              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                <motion.div animate={{ width: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 5 }} className="bg-orange-500 h-full" />
              </div>
              <div className="flex justify-between text-[10px] text-white/80 font-mono">
                <span>@vikedit_pro</span>
                <span className="text-orange-400">Annotations Active</span>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
            className="absolute top-10 right-4 sm:right-6 bg-white border border-[#E8E6E1] p-3 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
          >
            <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#999999] block font-mono font-bold">TUTORIALS</span>
              <span className="text-xs font-bold text-black font-sans">Zoom Highlights</span>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 4.5, delay: 0.5, ease: "easeInOut" }} 
            className="absolute bottom-12 left-4 sm:left-6 bg-[#1A1A1A] text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
          >
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4 text-orange-300" />
            </div>
            <div>
              <span className="text-[10px] text-white/60 block font-mono font-bold">CLARITY</span>
              <span className="text-xs font-bold font-sans">Full annotations</span>
            </div>
          </motion.div>
        </motion.div>
      );

    case 4:
      return (
        <motion.div
          key="reddit-story"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full flex items-center justify-center min-h-[350px] md:min-h-[450px]"
        >
          {/* Subtle glow background */}
          <div className="absolute inset-0 bg-[#E8E6E1]/40 rounded-[32px] overflow-hidden">
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#D4D0C8] rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#E8E6E1] rounded-full blur-2xl opacity-60" />
          </div>

          {/* Social Video Mockup */}
          <div className="relative w-[180px] sm:w-[220px] h-[320px] sm:h-[400px] rounded-[28px] bg-[#1A1A1A] border-4 border-[#1A1A1A] shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop" 
                alt="Immersive gameplay footage simulation" 
                className="w-full h-full object-cover opacity-75"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35" />
            </div>

            {/* Social Header */}
            <div className="relative z-10 p-3 flex justify-between items-center text-white">
              <span className="text-[10px] font-mono tracking-wider opacity-90 font-bold">Story Channels</span>
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            </div>

            {/* Simulated Reddit/Post Interface Box on top */}
            <div className="relative z-10 mx-3 mt-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-left text-white text-[8px] flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <div className="w-3.5 h-3.5 bg-rose-500 rounded-full flex items-center justify-center text-[6px] font-bold">r/</div>
                <span className="font-sans font-semibold text-stone-300">r/AskReddit</span>
                <span className="text-[#999999] opacity-70 font-mono">&middot; 3h ago</span>
              </div>
              <p className="font-sans font-bold text-white line-clamp-3 text-[9px] leading-tight">
                AITA for refusing to edit my client's video after they sent me "raw clips" filmed in a dark cave on a 2012 flip phone?
              </p>
            </div>

            {/* Captions in video */}
            <div className="relative z-10 px-4 py-2 flex flex-col gap-1 items-center">
              <div className="bg-rose-500 text-white px-2 py-0.5 rounded-md font-sans text-[10px] sm:text-xs font-black uppercase text-center shadow-md animate-pulse">
                VIRAL FORMAT 🚀
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-[12px] p-2 text-[9px] leading-snug text-center w-full">
                Bite-sized stories voiced by customized voiceovers with gameplay loops below.
              </div>
            </div>

            {/* Static bottom bar */}
            <div className="relative z-10 p-3 flex flex-col gap-1.5 bg-black/40 backdrop-blur-md">
              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                <motion.div animate={{ width: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }} className="bg-rose-500 h-full" />
              </div>
              <div className="flex justify-between text-[10px] text-white/80 font-mono">
                <span>@vikedit_stories</span>
                <span className="text-rose-500">99.2% Hook</span>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
            className="absolute top-10 right-4 sm:right-6 bg-white border border-[#E8E6E1] p-3 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
          >
            <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#999999] block font-mono font-bold">ENGAGEMENT</span>
              <span className="text-xs font-bold text-black font-sans">+180% Engagement</span>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 4.5, delay: 0.5, ease: "easeInOut" }} 
            className="absolute bottom-12 left-4 sm:left-6 bg-[#1A1A1A] text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
          >
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Users className="w-4 h-4 text-rose-400" />
            </div>
            <div>
              <span className="text-[10px] text-white/60 block font-mono font-bold">CHANNELS</span>
              <span className="text-xs font-bold font-sans">Story Narrative</span>
            </div>
          </motion.div>
        </motion.div>
      );

    default:
      return null;
  }
};

const renderPreviewMockup = (index: number) => {
  switch (index) {
    case 0:
      return (
        <motion.div
          key="short-form"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full flex items-center justify-center min-h-[350px] md:min-h-[450px]"
        >
          {/* Subtle glow background */}
          <div className="absolute inset-0 bg-[#E8E6E1]/40 rounded-[32px] overflow-hidden">
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#D4D0C8] rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#E8E6E1] rounded-full blur-2xl opacity-60" />
          </div>

          {/* Social Video Mockup */}
          <div className="relative w-[180px] sm:w-[220px] h-[320px] sm:h-[400px] rounded-[28px] bg-[#1A1A1A] border-4 border-[#1A1A1A] shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Visual thumbnail */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop" 
                alt="Short-form" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            </div>

            {/* Social Header */}
            <div className="relative z-10 p-3 flex justify-between items-center text-white">
              <span className="text-[10px] font-mono tracking-wider opacity-90">0:15 / Reels</span>
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            </div>

            {/* Sound wave graphic container in center */}
            <div className="relative z-10 flex flex-col items-center justify-center text-white/90 gap-1 mt-6">
              <div className="flex gap-0.5 items-end h-8">
                <motion.div animate={{ height: [12, 28, 12] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.1 }} className="w-1 bg-[#F5F3EF] rounded-sm" />
                <motion.div animate={{ height: [18, 38, 18] }} transition={{ repeat: Infinity, duration: 0.9, delay: 0.3 }} className="w-1 bg-[#F5F3EF] rounded-sm" />
                <motion.div animate={{ height: [8, 22, 8] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-1 bg-[#F5F3EF] rounded-sm" />
                <motion.div animate={{ height: [14, 30, 14] }} transition={{ repeat: Infinity, duration: 1.1, delay: 0.7 }} className="w-1 bg-[#F5F3EF] rounded-sm" />
                <motion.div animate={{ height: [22, 10, 22] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} className="w-1 bg-[#F5F3EF] rounded-sm" />
              </div>
              <span className="text-[9px] font-mono tracking-widest uppercase text-white/50">AUDIO ENGAGEMENT</span>
            </div>

            {/* In-video smart captions overlay */}
            <div className="relative z-10 px-4 py-2 flex flex-col gap-1 items-center">
              <div className="bg-yellow-400 text-black px-2 py-0.5 rounded-md font-sans text-[11px] sm:text-xs font-black uppercase text-center shadow-md animate-bounce">
                STOP SCROLLING 💥
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-[12px] p-2 text-[9px] leading-snug text-center">
                High-retention editing that hooks them first.
              </div>
            </div>

            {/* Static bottom bar */}
            <div className="relative z-10 p-3 flex flex-col gap-1.5 bg-black/40 backdrop-blur-md">
              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                <motion.div animate={{ width: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 5, ease: "linear" }} className="bg-white h-full" />
              </div>
              <div className="flex justify-between text-[10px] text-white/80 font-mono">
                <span>@vikedit</span>
                <span className="text-yellow-400">98.7% Retention</span>
              </div>
            </div>
          </div>

          {/* Floating badge right */}
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
            className="absolute top-10 right-4 sm:right-6 bg-white border border-[#E8E6E1] p-3 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#999999] block font-mono">RETENTION</span>
              <span className="text-xs font-bold text-black font-sans">+245% Average</span>
            </div>
          </motion.div>

          {/* Floating badge left */}
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 4.5, delay: 0.5, ease: "easeInOut" }} 
            className="absolute bottom-12 left-4 sm:left-6 bg-[#1A1A1A] text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
          >
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>
            <div>
              <span className="text-[10px] text-white/60 block font-mono">AUTO HOOKS</span>
              <span className="text-xs font-bold font-sans">Active Editing</span>
            </div>
          </motion.div>
        </motion.div>
      );

    case 1:
      return (
        <motion.div
          key="long-form"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full flex flex-col justify-center items-center min-h-[350px] md:min-h-[450px] p-4"
        >
          {/* Background overlay */}
          <div className="absolute inset-0 bg-[#E8E6E1]/40 rounded-[32px]" />

          {/* Repurposing Splitter Graphics */}
          <div className="relative w-full max-w-[340px] space-y-6 z-10 flex flex-col items-center">
            
            {/* Long Form Source Card */}
            <div className="w-full bg-white border border-[#E8E6E1] p-4 rounded-2xl shadow-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white flex-shrink-0 animate-pulse">
                <Video className="w-5 h-5 animate-bounce-slow" />
              </div>
              <div className="flex-grow min-w-0 text-left">
                <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block">LONG-FORM RAW INPUT</span>
                <span className="text-xs font-bold text-black font-sans block truncate">YouTube / Podcast ep_83.mp4</span>
                <span className="text-[10px] text-[#6B6B6B] block">Duration: 1h 12m 30s</span>
              </div>
              <span className="bg-[#F5F3EF] text-black px-2 py-0.5 rounded text-[10px] font-mono flex-shrink-0">16:9</span>
            </div>

            {/* Split Arrow Connectors - SVG Animation */}
            <div className="w-20 h-12 relative flex justify-center py-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50">
                <path d="M 50 0 L 50 20 Q 50 35 15 35 M 50 20 L 50 45 M 50 20 Q 50 35 85 35" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                <circle cx="50" cy="0" r="3" fill="#1A1A1A" />
                <polygon points="15,35 18,31 18,39" fill="#1A1A1A" />
                <polygon points="50,45 46,41 54,41" fill="#1A1A1A" />
                <polygon points="85,35 82,31 82,39" fill="#1A1A1A" />
              </svg>
            </div>

            {/* Bite Sized Target Cards Grid */}
            <div className="grid grid-cols-3 gap-2 w-full">
              {[
                { title: "Hook Intro", time: "0:45", icon: "💎", badge: "Shorts" },
                { title: "Key Insight", time: "1:10", icon: "💡", badge: "Reels" },
                { title: "Epic Ending", time: "0:30", icon: "🚀", badge: "LinkedIn" }
              ].map((clip, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white border border-[#E8E6E1] p-2.5 rounded-xl text-center shadow-sm flex flex-col justify-between"
                >
                  <span className="text-lg block mb-1">{clip.icon}</span>
                  <div>
                    <h4 className="text-[10px] font-bold text-black leading-tight truncate">{clip.title}</h4>
                    <span className="text-[9px] text-[#6B6B6B] block font-mono mt-0.5">{clip.time}</span>
                  </div>
                  <span className="mt-2 bg-[#F5F3EF] text-stone-600 rounded-md py-0.5 text-[8px] font-mono tracking-tighter block uppercase">
                    {clip.badge}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Floating Stats Indicator */}
            <div className="bg-black text-white text-[11px] font-mono py-1.5 px-4 rounded-full shadow-lg">
              🎯 1 Recording = 10+ Optimized Clips
            </div>

          </div>
        </motion.div>
      );

    case 2:
      return (
        <motion.div
          key="multi-platform"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full flex items-center justify-center min-h-[350px] md:min-h-[450px] p-4"
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-[#E8E6E1]/40 rounded-[32px] overflow-hidden" />

          {/* Canvas stacking mockup representing resizing */}
          <div className="relative w-full max-w-[340px] h-[300px] flex items-center justify-center">
            
            {/* 16:9 Landscape Frame */}
            <motion.div 
              style={{ rotateZ: -3 }}
              className="absolute w-[240px] h-[135px] bg-[#FFFFFF] border border-[#E8E6E1] rounded-xl shadow-lg p-3 z-10 flex flex-col justify-between text-left"
            >
              <div className="flex justify-between items-center pb-1 border-b border-stone-200/50">
                <span className="text-[8px] font-mono text-rose-500 font-bold uppercase tracking-wider">▲ Landscape 16:9</span>
                <span className="text-[8px] font-mono text-stone-400">YouTube Native</span>
              </div>
              <div className="flex-grow flex items-center justify-center text-center">
                <span className="text-[10px] font-sans font-bold text-black/60 truncate">Full Horizontal Showcase</span>
              </div>
              <div className="bg-[#F5F3EF] p-1 rounded text-[8px] text-[#6B6B6B] block font-mono text-center">1920 x 1080px</div>
            </motion.div>

            {/* 1:1 Square Frame */}
            <motion.div 
              style={{ rotateZ: 3, x: 20, y: -10 }}
              className="absolute w-[180px] h-[180px] bg-[#FFFFFF] border-2 border-stone-200 rounded-xl shadow-xl p-3 z-20 flex flex-col justify-between text-left"
            >
              <div className="flex justify-between items-center pb-1 border-b border-stone-200/50">
                <span className="text-[8px] font-mono text-[#1877F2] font-bold uppercase tracking-wider">■ Square 1:1</span>
                <span className="text-[8px] font-mono text-stone-400">LinkedIn Feed</span>
              </div>
              <div className="flex-grow flex flex-col justify-center items-center gap-1.5">
                <div className="w-full h-8 bg-stone-100 rounded flex items-center justify-center">
                  <span className="text-[9px] text-[#6B6B6B]">Visual Crop Zone</span>
                </div>
                <p className="text-[8px] font-serif leading-none italic text-center">Optimized safe spacing block</p>
              </div>
              <div className="bg-[#F5F3EF] p-0.5 rounded text-[8px] text-[#6B6B6B] block font-mono text-center">1080 x 1080px</div>
            </motion.div>

            {/* 9:16 Portrait Frame */}
            <motion.div 
              style={{ rotateZ: -1 }}
              whileHover={{ scale: 1.03 }}
              className="absolute w-[140px] h-[240px] bg-black text-white rounded-2xl shadow-2xl p-2.5 z-30 flex flex-col justify-between border border-neutral-800 text-left"
            >
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-mono text-yellow-400 font-bold uppercase">✦ Portrait 9:16</span>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              </div>

              {/* Crop Box visualization overlays */}
              <div className="flex-grow my-2 border border-dashed border-white/20 rounded-md relative flex items-center justify-center flex-col gap-1 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-4 bg-white/5 backdrop-blur-xs text-[7px] text-white/60 text-center uppercase tracking-widest flex items-center justify-center font-mono">SAFE AREA</div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </div>
                <span className="text-[8px] font-bold tracking-tight text-white/90">Smart Anchor</span>
                <div className="absolute inset-x-0 bottom-0 h-4 bg-white/5 backdrop-blur-xs text-[7px] text-white/60 text-center uppercase tracking-widest flex items-center justify-center font-mono">SAFE AREA</div>
              </div>

              <div className="bg-white/10 p-0.5 rounded text-[7px] text-white/80 block font-mono text-center">1080 x 1920px</div>
            </motion.div>

          </div>

          {/* Small Floating tags */}
          <div className="absolute bottom-5 right-6 bg-white border border-[#E8E6E1]/80 px-2.5 py-1 rounded-full text-[9px] font-mono text-black font-semibold shadow-md z-40">
            ✓ Automated Crop Safe Zones
          </div>
        </motion.div>
      );

    case 3:
      return (
        <motion.div
          key="corporate-courses"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full flex items-center justify-center min-h-[350px] md:min-h-[450px] p-4"
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-[#E8E6E1]/40 rounded-[32px]" />

          {/* Premium Video Player UI/UX Mockup */}
          <div className="relative w-full max-w-[340px] bg-white border border-[#E8E6E1] rounded-2xl shadow-xl overflow-hidden z-10 flex flex-col text-left">
            {/* Header */}
            <div className="bg-[#F5F3EF] px-4 py-3 border-b border-[#E8E6E1] flex justify-between items-center">
              <div className="flex gap-1.55">
                <div className="w-2 h-2 rounded-full bg-stone-300" />
                <div className="w-2 h-2 rounded-full bg-stone-300" />
                <div className="w-2 h-2 rounded-full bg-stone-300" />
              </div>
              <span className="text-[9px] font-mono text-[#6B6B6B] tracking-wider font-semibold">COURSE_RENDERER_P3.MP4</span>
              <div className="w-3" />
            </div>

            {/* Video Canvas view */}
            <div className="relative aspect-[16/10] bg-[#1A1A1A] text-white p-4 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop" 
                  alt="Webinar/Course representation" 
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
              </div>

              {/* Watermark in corner */}
              <div className="relative z-10 flex justify-end">
                <span className="bg-black/40 backdrop-blur-md text-white/50 border border-white/10 rounded px-1.5 py-0.5 text-[7px] font-mono">VIKEDIT WEBINAR ENGINE</span>
              </div>

              {/* Split layout in slide overlay */}
              <div className="relative z-10 flex gap-2 items-end">
                {/* Visual slide card */}
                <div className="bg-black/60 border border-white/10 p-2 rounded-lg w-[60%] flex flex-col gap-1">
                  <span className="text-[7px] font-mono text-yellow-400 font-bold uppercase block">LECTURE PRESENTATION</span>
                  <h5 className="text-[9px] font-bold leading-tight line-clamp-1">03. Content Infrastructure Strategies</h5>
                  <div className="w-full bg-white/20 h-0.5 rounded-full mt-1" />
                </div>
                {/* Speaker avatar video overlay */}
                <div className="w-12 h-12 rounded-lg border-2 border-white overflow-hidden relative shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200&auto=format&fit=crop" 
                    alt="Speaker mockup" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-t from-red-600 to-transparent" />
                </div>
              </div>

              {/* Media Player Controls */}
              <div className="relative z-10 space-y-1 mt-2.5">
                <div className="flex justify-between text-[7px] font-mono text-white/60">
                  <span>04:12</span>
                  <span>10:00</span>
                </div>
                <div className="w-full bg-white/25 h-1 rounded-full overflow-hidden relative">
                  <div className="bg-emerald-400 w-[42%] h-full rounded-full" />
                </div>
                <div className="flex justify-between items-center pt-1.5">
                  <div className="flex gap-2 text-white/80">
                    <Play className="w-3 h-3 fill-current" />
                    <span className="text-[8px] font-mono">POLISHED WEBINAR</span>
                  </div>
                  <span className="text-[8px] text-emerald-400 font-mono font-semibold">Clear & Corporate</span>
                </div>
              </div>
            </div>

            {/* Bottom info section */}
            <div className="p-3 bg-white space-y-1.5">
              <span className="text-[9px] font-mono text-stone-400 uppercase tracking-wider block font-bold">CHAPTER ENHANCEMENTS</span>
              <div className="grid grid-cols-2 gap-1.5 text-[9.5px] text-[#6B6B6B]">
                <div className="bg-[#F5F3EF] p-1.5 rounded-lg border border-[#E8E6E1]/55 text-black font-semibold">
                  🚀 Lesson Intros Added
                </div>
                <div className="bg-[#F5F3EF] p-1.5 rounded-lg border border-[#E8E6E1]/55 text-black font-semibold">
                  🎙️ Noise Cancellation
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      );

    case 4:
      return (
        <motion.div
          key="content-workflow"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full flex flex-col justify-center items-center min-h-[350px] md:min-h-[450px] p-4"
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-[#E8E6E1]/40 rounded-[32px] overflow-hidden" />

          {/* Workflow/Pipeline cards board */}
          <div className="relative w-full max-w-[340px] space-y-3.5 z-10 text-left">
            {/* Step 1: Upload progress card */}
            <div className="bg-white border border-[#E8E6E1] p-3.5 rounded-xl shadow-md flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-center text-[8.5px] font-mono text-[#6B6B6B] mb-0.5">
                  <span>RAW_FOOTAGE_EP84.MOV</span>
                  <span className="text-emerald-600 font-bold">92% UPLOADED</span>
                </div>
                <div className="w-full bg-[#F5F3EF] h-1.5 rounded-full overflow-hidden">
                  <motion.div animate={{ width: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 6 }} className="bg-emerald-500 h-full rounded-full" />
                </div>
              </div>
            </div>

            {/* Step 2: Editorial Magic active card */}
            <div className="bg-[#1A1A1A] text-white border border-neutral-800 p-3.5 rounded-xl shadow-md flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 text-yellow-300 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">PIPELINE CURRENT STAGE</span>
                  <span className="text-xs font-bold text-white block">Magic Edits / Auto Captions</span>
                </div>
              </div>
              <div className="bg-white/10 px-2 py-0.5 rounded text-[8px] font-mono border border-white/5 animate-pulse text-white">ACTIVE</div>
            </div>

            {/* Step 3: Calendar grid scheduler output mockup */}
            <div className="bg-white border border-[#E8E6E1] p-3 rounded-xl shadow-md space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono text-stone-400 block font-semibold">CONTENT DEPLOYMENT CALENDAR</span>
                <span className="text-[8px] bg-stone-100 text-[#1A1A1A] py-0.5 px-2 rounded-full font-bold">Auto Publish Active</span>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-[8px] font-semibold text-[#1A1A1A] text-center bg-[#F5F3EF] p-1.5 rounded-lg border border-[#E8E6E1]/60">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                <span className="opacity-30">24</span><span className="opacity-30">25</span>
                <span className="bg-stone-300/40 rounded py-0.5 text-center font-bold">26</span>
                <span className="bg-[#1A1A1A] text-white rounded py-0.5 font-bold animate-pulse">27 🎬</span>
                <span className="bg-stone-300/40 rounded py-0.5 font-bold">28</span>
                <span className="opacity-30">29</span><span className="opacity-30">30</span>
              </div>
              <p className="text-[8.5px] text-[#6B6B6B] leading-none text-center">Consistent, predictable distribution with zero chaos.</p>
            </div>
          </div>
        </motion.div>
      );

    default:
      return null;
  }
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentView, setView] = useState("home"); // home, about, work, services, blog
  const [activeService, setActiveService] = useState(0);
  const [activeFacelessService, setActiveFacelessService] = useState(0);
  const [portfolioFilter, setPortfolioFilter] = useState("all");
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // States for final CTA contact card
  const [ctaName, setCtaName] = useState("");
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaCountryCode, setCtaCountryCode] = useState("+91");
  const [ctaPhone, setCtaPhone] = useState("");
  const [ctaMessage, setCtaMessage] = useState("");
  const [ctaIsSubmitting, setCtaIsSubmitting] = useState(false);
  const [ctaIsSubmitted, setCtaIsSubmitted] = useState(false);
  const [ctaError, setCtaError] = useState("");

  // Scroll to top automatically when view changes
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#")) {
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentView]);

  // Handle scrolling to sections when landing on home view (especially from other views)
  useEffect(() => {
    if (currentView === "home") {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#")) {
        const targetId = hash.substring(1);
        let attempts = 0;
        const interval = setInterval(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            clearInterval(interval);
            // clear hash after small delay to keep URL clean
            setTimeout(() => {
              window.history.replaceState(null, "", " ");
            }, 1000);
          }
          attempts++;
          if (attempts > 30) { // max 1.5 seconds of polling
            clearInterval(interval);
          }
        }, 50);
        return () => clearInterval(interval);
      }
    }
  }, [currentView]);

  return (
    <div className="bg-black min-h-screen text-stone-200 relative selection:bg-neutral-800 selection:text-white overflow-x-hidden">
      {/* Dynamic interactive custom cursor pointer */}
      <Cursor />

      {/* Preloader animation screen */}
      <AnimatePresence mode="wait">
        {loading && (
          <Loader key="preloader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          id="main-scroller-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col min-h-screen"
        >
          {/* Sticky top Navigation Header */}
          <Navbar 
            currentView={currentView} 
            setView={setView} 
            onBookCallClicked={() => setView("contact")} 
          />

          {/* Dynamic route switching with clean fade animations */}
          <main className="flex-grow pt-20">
            <AnimatePresence mode="wait">
              {currentView === "home" && (
                <motion.div
                  key="home-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-0"
                >
                  {/* SECTION 2: HERO WITH 3D LIVE MOVE VORTEX BG */}
                  <div className="relative w-full overflow-hidden bg-black border-b border-neutral-900/60">
                    {/* Hypnotic 3D rotating star-stair vortex background */}
                    <VortexBackground className="opacity-75" />

                    {/* Pure black vignettes to fade the canvas smoothly into surrounding page sections */}
                    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10" />

                    <section id="hero-section" className="relative z-20 min-h-screen flex items-center justify-center px-6 sm:px-12 py-16 md:py-24 max-w-7xl mx-auto">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
                        {/* Left Column (Text Content) */}
                        <div className="lg:col-span-7 space-y-8 text-left">


                          {/* Headline */}
                          <div className="space-y-4 max-w-2xl">
                            <h1 className="text-6xl sm:text-8xl lg:text-[88px] font-sans font-black bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent tracking-tighter leading-[0.95] pb-2">
                              Record Less <br />Post<span className="inline-block ml-2 sm:ml-4 font-serif font-normal italic bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent">More.</span>
                            </h1>
                            <p className="text-xl sm:text-3xl font-times font-normal text-white/90 tracking-snug leading-snug italic">
                              Stop worrying about post-production delays <br />& Start scaling your consistency.
                            </p>
                          </div>

                          {/* CTA Button */}
                          <div className="pt-4">
                            <button
                              onClick={() => setView("contact")}
                              className="bg-white text-black hover:bg-stone-200 hover:scale-105 active:scale-95 transition-all text-sm font-bold uppercase tracking-wider py-4.5 px-10 rounded-full shadow-md cursor-pointer"
                            >
                              BOOK A CALL
                            </button>
                          </div>
                        </div>

                        {/* Right Column (Visual Phone Mockup) */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                          <InteractivePhone />
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* SECTION 3: TRUST BAR (Client Logos) */}
                  <section id="trust-bar-section" className="bg-black">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="text-center md:text-left min-w-[200px]">
                        <span className="text-xs font-mono uppercase tracking-widest text-stone-400 block">
                          Trusted by Partners
                        </span>
                        <p className="text-sm font-semibold text-white mt-1">
                          We've Helped Grow and still Continue With
                        </p>
                      </div>
                      <div className="flex-grow w-full md:w-auto">
                        <Marquee />
                      </div>
                    </div>
                  </section>

                  {/* SECTION 7: CASE STUDIES */}
                  <section id="work-case-studies" className="pt-24 pb-24 md:pt-36 md:pb-36 px-6 sm:px-12 bg-black border-y border-neutral-900">
                    <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
                      <div className="text-center select-none mx-auto max-w-4xl">
                        <h2 className="text-4xl md:text-6xl font-sans font-bold bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent tracking-tight leading-tight">
                          Liberating creators from <br /> <span className="italic font-serif font-normal bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent">post-production.</span>
                        </h2>
                      </div>

                      <CaseStudySection />
                    </div>
                  </section>

                  {/* COMPREHENSIVE SERVICES PORTFOLIO SECTION */}
                  <section id="services-section" className="w-[100%] bg-black py-24 md:py-36 px-6 sm:px-12 border-t border-neutral-900">
                    <div className="max-w-7xl mx-auto">
                      
                      {/* Section Header */}
                      <div className="text-center md:max-w-3xl mx-auto mb-16 space-y-4">
                        <span className="text-xs font-mono tracking-widest uppercase text-stone-400 font-bold block">
                          OUR SERVICES
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif font-extrabold bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent tracking-tight leading-none text-center">
                          Things we do <span className="font-serif font-normal italic bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent">for you</span>
                        </h2>
                        <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl mx-auto pt-2 text-center">
                          No more post-production delays. We transform raw recordings into ready-to-post clips, perfectly formatted for every platform.
                        </p>
                      </div>

                      {/* Interactive Filter Navigation */}
                      <ul className="flex justify-center flex-wrap gap-2 mb-12 list-none p-0 max-w-4xl mx-auto">
                        {[
                          { key: "all", label: "All" },
                          { key: "short-form", label: "Short-Form" },
                          { key: "corporate", label: "Corporate" },
                          { key: "faceless", label: "Faceless" },
                          { key: "workflow", label: "Workflow" }
                        ].map((btn) => {
                          const isActive = portfolioFilter === btn.key;
                          return (
                            <li key={btn.key}>
                              <button
                                onClick={() => setPortfolioFilter(btn.key)}
                                className={`px-6 py-2.5 font-sans text-sm font-medium rounded-full cursor-pointer transition-all duration-300 ${
                                  isActive
                                    ? "bg-white text-black shadow-sm scale-102"
                                    : "bg-transparent text-stone-400 hover:text-white"
                                }`}
                              >
                                {btn.label}
                              </button>
                            </li>
                          );
                        })}
                      </ul>

                      {/* Dynamic Portfolio Grid with Layout Animations */}
                      <motion.div 
                        layout 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 md:gap-x-12 lg:gap-x-16 gap-y-16 lg:gap-y-24 max-w-7xl mx-auto"
                      >
                        <AnimatePresence mode="popLayout">
                          {PORTFOLIO_ITEMS.filter(
                            (item) => portfolioFilter === "all" || item.category === portfolioFilter
                          ).map((item) => {
                            const isExpanded = expandedCardId === item.id;
                            return (
                              <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                onClick={() => {
                                  setExpandedCardId(isExpanded ? null : item.id);
                                }}
                                className="relative rounded-3xl overflow-hidden cursor-pointer group bg-neutral-900 aspect-[9/16] w-full border border-[#3b82f6] shadow-md hover:shadow-2xl transition-all duration-300"
                              >
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                  referrerPolicy="no-referrer"
                                />

                                {/* Beautiful translucent blue overlay without blur, perfectly interactive */}
                                <div 
                                  className={`absolute inset-0 bg-blue-600/25 transition-opacity duration-300 pointer-events-none z-10 md:group-hover:opacity-0 ${
                                    isExpanded ? "opacity-0" : "opacity-100"
                                  }`}
                                />
                                
                                {/* Content layer */}
                                <div className={`absolute bottom-0 left-0 w-full p-6 text-white z-20 transition-transform duration-300 select-none pointer-events-none md:group-hover:-translate-y-1 ${isExpanded ? "-translate-y-1" : ""}`}>
                                  <span className="text-[9px] uppercase tracking-wider text-white/70 font-mono font-bold mb-1.5 block">
                                    {item.tag}
                                  </span>
                                  <h3 className="font-serif font-semibold text-2xl mb-1.5 leading-tight tracking-tight">
                                    {item.title}
                                  </h3>
                                  <p className={`text-xs sm:text-[13px] text-stone-200/90 leading-relaxed font-sans overflow-hidden transition-all duration-500 ease-in-out ${
                                    isExpanded 
                                      ? "max-h-24 opacity-100" 
                                      : "max-h-0 opacity-0 md:group-hover:max-h-24 md:group-hover:opacity-100"
                                  }`}>
                                    {item.description}
                                  </p>
                                </div>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </motion.div>

                    </div>
                  </section>


                  {/* SECTION 6: PROCESS (How We Work) */}
                  <section 
                    id="process-section" 
                    className="relative bg-black pt-12 pb-24 md:pt-16 md:pb-36 px-6 sm:px-12 overflow-hidden border-y border-neutral-900"
                  >
                    {/* Decorative elegant background glow shapes for subtle branding */}
                    <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

                    <div className="max-w-7xl mx-auto relative z-10">
                      <div className="text-center mb-16 max-w-3xl mx-auto">
                        <span className="text-xs font-mono tracking-widest uppercase text-stone-400 block font-bold mb-4">
                          Work Process
                        </span>
                        <h2 className="text-4xl md:text-6xl font-sans font-extrabold bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent tracking-tight leading-tight animate-fade-in">
                          The Process Behind <span className="italic font-serif font-normal bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent">Every Project</span>
                        </h2>
                      </div>

                      {/* 2x2 Responsive Grid Layout */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        <ProcessCard
                          num={1}
                          title="Strategy & Onboarding"
                          body="We align on your goals, audience, and brand voice through a focused strategy call. You share your guidelines and top-performing content. We define success metrics and lock in your service tier then you're officially onboarded."
                        />
                        <ProcessCard
                          num={2}
                          title="Upload & Strategic Mapping"
                          body="Drop your raw footage into our secure portal. We review the full recording to identify high-retention moments: strong hooks, key insights, and shareable clips. Every segment is mapped for maximum repurposing potential across your target platforms."
                        />
                        <ProcessCard
                          num={3}
                          title="Production & Refinement"
                          body="We edit, format, and optimize each asset vertical cuts for Reels/Shorts, polished long-form for YouTube, clean audio for podcasts. You receive drafts via a simple feedback link, comment on timestamps, and we implement revisions within 24 hours. Two rounds included."
                        />
                        <ProcessCard
                          num={4}
                          title="Delivery & Continuous Scale"
                          body="Approved assets arrive organized, labeled, and ready to post. Then the cycle repeats: your next recording triggers the same streamlined workflow. Consistent output, zero operational drag, and a content engine that scales with you."
                        />
                      </div>
                    </div>
                  </section>


                  {/* SECTION 9: COMPARISON TABLE */}
                  <section id="comparison-section" className="py-24 md:py-36 px-6 sm:px-12 bg-black">
                    <div className="max-w-7xl mx-auto space-y-16">
                      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
                        <span className="text-xs font-mono tracking-widest uppercase text-stone-400 font-bold block mb-4">
                          The difference
                        </span>
                        <h2 className="text-4xl md:text-6xl font-sans font-extrabold bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent tracking-tight leading-tight">
                          Why clients choose <span className="font-serif font-normal italic bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent">VikEdit</span>
                        </h2>
                      </div>

                      <ComparisonTable />
                    </div>
                  </section>

                  {/* SECTION 9.5: TESTIMONIALS */}
                  <TestimonialsSection />

                  {/* SECTION 11: CAREERS CTA */}
                  <section id="careers-cta" className="py-16 px-6 sm:px-12 max-w-7xl mx-auto text-center">
                    <div className="bg-neutral-900 border border-[#3b82f6] max-w-3xl mx-auto rounded-[30px] p-8 md:p-14 space-y-6 shadow-[0_0_15px_rgba(59,130,246,0.28)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-shadow duration-300">
                      <h3 className="text-3xl md:text-5xl font-sans font-extrabold bg-gradient-to-b from-white via-stone-200 to-stone-400 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] select-none tracking-tight leading-tight">
                        Join our <span className="font-serif font-normal italic bg-gradient-to-b from-white via-stone-200 to-stone-400 bg-clip-text text-transparent">operations team</span>
                      </h3>
                      <p className="text-sm text-stone-300 leading-relaxed max-w-xl mx-auto">
                        We build precision-driven content infrastructure. If you value strategic editing, systematic workflows, and scalable output, apply below.
                      </p>
                      <div className="pt-4">
                        <button
                          onClick={() => setView("contact")}
                          className="bg-white text-black hover:bg-stone-200 hover:scale-105 active:scale-95 transition-all py-4 px-8 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                        >
                          APPLY NOW
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 12: FAQ */}
                  <section id="faq-section" className="py-24 md:py-36 px-6 sm:px-12 bg-black border-y border-neutral-900">
                    <div className="max-w-7xl mx-auto">
                      <div className="text-center space-y-4 mb-16">
                        <span className="text-xs font-mono tracking-widest uppercase text-stone-400 font-bold block">
                          Questions
                        </span>
                        <h2 className="text-3xl md:text-5xl font-sans font-bold bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent">
                          Frequently <span className="italic font-serif font-normal bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent">Asked Questions</span>
                        </h2>
                      </div>

                      <FaqSection />
                    </div>
                  </section>

                  {/* SECTION 13: FINAL CTA */}
                  <section id="final-cta" className="pt-36 pb-24 md:pt-48 md:pb-36 px-6 sm:px-12 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      {/* Left Side Info */}
                      <div className="lg:col-span-7">
                        <AnimatePresence mode="wait">
                          {!ctaIsSubmitted ? (
                            <motion.div
                              key="cta-form-card"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.98 }}
                              transition={{ duration: 0.4 }}
                              className="w-full bg-neutral-900 rounded-[24px] border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 sm:p-12 text-left transform-gpu"
                            >
                              <h3 className="font-serif font-bold text-4xl sm:text-5xl text-white mb-5 tracking-tight leading-tight">
                                Let's make this <span className="italic font-serif font-normal bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent">easy for you.</span>
                              </h3>
                              <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed mb-8">
                                Your content deserves a system that works. Share your goals below, and we'll show you how to publish consistently without the overhead. We respond within 24 hours.
                              </p>

                               <form
                                onSubmit={async (e) => {
                                  e.preventDefault();
                                  setCtaIsSubmitting(true);
                                  setCtaError("");
                                  try {
                                    const response = await fetch("https://formsubmit.co/ajax/hellovikedit@gmail.com", {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                        "Accept": "application/json"
                                      },
                                      body: JSON.stringify({
                                        name: ctaName,
                                        email: ctaEmail,
                                        phone: `${ctaCountryCode} ${ctaPhone}`,
                                        message: ctaMessage,
                                        _subject: `New Lead from VikEdit Footer Form: ${ctaName}`
                                      })
                                    });
                                    const data = await response.json();
                                    if (response.ok && data.success === "true") {
                                      setCtaIsSubmitted(true);
                                    } else {
                                      throw new Error(data.message || "Failed to submit form. Please try again.");
                                    }
                                  } catch (error: any) {
                                    console.error("Submission error:", error);
                                    setCtaError(error.message || "An unexpected error occurred. Please try again or email us directly at hellovikedit@gmail.com");
                                  } finally {
                                    setCtaIsSubmitting(false);
                                  }
                                }}
                                className="flex flex-col gap-4"
                              >
                                {/* Name Input */}
                                <input
                                  type="text"
                                  placeholder="Your Name"
                                  value={ctaName}
                                  onChange={(e) => setCtaName(e.target.value)}
                                  required
                                  className="w-full bg-neutral-950 border border-neutral-800 rounded-[8px] py-[14px] px-4 font-sans text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all duration-300"
                                />

                                {/* Email Input */}
                                <input
                                  type="email"
                                  placeholder="Business Email"
                                  value={ctaEmail}
                                  onChange={(e) => setCtaEmail(e.target.value)}
                                  required
                                  className="w-full bg-neutral-950 border border-neutral-800 rounded-[8px] py-[14px] px-4 font-sans text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all duration-300"
                                />

                                {/* Phone Input */}
                                <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-[8px] overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all duration-300">
                                  <div className="relative flex items-center bg-neutral-900 border-r border-neutral-800">
                                    <select
                                      value={ctaCountryCode}
                                      onChange={(e) => setCtaCountryCode(e.target.value)}
                                      className="py-[14px] pl-4 pr-10 bg-neutral-900 text-sm font-medium text-stone-300 appearance-none focus:outline-none cursor-pointer font-sans"
                                    >
                                      <option className="bg-neutral-950 text-white" value="+91">+91 (IN)</option>
                                      <option className="bg-neutral-950 text-white" value="+1">+1 (US)</option>
                                      <option className="bg-neutral-950 text-white" value="+44">+44 (UK)</option>
                                      <option className="bg-neutral-950 text-white" value="+61">+61 (AU)</option>
                                      <option className="bg-neutral-950 text-white" value="+49">+49 (DE)</option>
                                      <option className="bg-neutral-950 text-white" value="+33">+33 (FR)</option>
                                      <option className="bg-neutral-950 text-white" value="+81">+81 (JP)</option>
                                      <option className="bg-neutral-950 text-white" value="+65">+65 (SG)</option>
                                      <option className="bg-neutral-950 text-white" value="+971">+971 (AE)</option>
                                      <option className="bg-neutral-950 text-white" value="+55">+55 (BR)</option>
                                    </select>
                                    <div className="absolute right-3.5 pointer-events-none text-stone-400">
                                      <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                      </svg>
                                    </div>
                                  </div>
                                  <input
                                    type="tel"
                                    placeholder="Phone Number with Country Code"
                                    value={ctaPhone}
                                    onChange={(e) => setCtaPhone(e.target.value)}
                                    className="flex-1 border-none focus:outline-none focus:ring-0 py-[14px] px-4 font-sans text-sm text-white placeholder:text-stone-500 bg-transparent"
                                  />
                                </div>

                                {/* Textarea Input */}
                                <textarea
                                  placeholder="Tell us about your project, content volume, and goals..."
                                  required
                                  value={ctaMessage}
                                  onChange={(e) => setCtaMessage(e.target.value)}
                                  className="w-full bg-neutral-950 border border-neutral-800 rounded-[8px] py-[14px] px-4 font-sans text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all duration-300 resize-y min-h-[120px]"
                                />

                                {/* Submit button */}
                                {ctaError && (
                                  <div className="text-red-500 text-xs font-sans mt-1 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded text-left">
                                    {ctaError}
                                  </div>
                                )}
                                <button
                                  type="submit"
                                  disabled={ctaIsSubmitting}
                                  className="w-full py-4 px-4 bg-white text-black hover:bg-stone-200 disabled:opacity-50 rounded-[8px] font-sans font-bold text-sm transition-all duration-300 uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 mt-2"
                                >
                                  {ctaIsSubmitting ? (
                                    <>
                                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                      <span>Submitting...</span>
                                    </>
                                  ) : (
                                    "Submit Inquiry"
                                  )}
                                </button>
                              </form>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="cta-success-card"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="w-full bg-neutral-900 rounded-[24px] border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-10 text-center mt-6 flex flex-col items-center justify-center min-h-[400px] transform-gpu"
                            >
                              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-6">
                                <Check className="w-6 h-6 stroke-[3]" />
                              </div>
                              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                                Inquiry Received
                              </h3>
                              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-sm mb-6">
                                Thank you, <span className="text-blue-400 font-semibold">{ctaName}</span>! Our lead operations crew will review your goals and contact you within 24 hours.
                              </p>
                              <button
                                onClick={() => {
                                  setCtaName("");
                                  setCtaEmail("");
                                  setCtaPhone("");
                                  setCtaMessage("");
                                  setCtaIsSubmitted(false);
                                }}
                                className="bg-white text-black hover:bg-stone-200 rounded-[8px] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                              >
                                Send Another Inquiry
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Right Side Visual Phone mockup */}
                      <div className="lg:col-span-5 flex justify-center">
                        <InteractivePhone />
                      </div>
                    </div>
                  </section>
                </motion.div>
              )}

              {currentView === "about" && (
                <motion.div
                  key="about-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-24 animate-fade-in"
                >
                  <div className="max-w-4xl mx-auto text-center space-y-6">
                    <span className="text-xs font-mono tracking-widest uppercase text-stone-400 font-bold block mb-4">
                      Our Positioning
                    </span>
                    <h1 className="text-4xl md:text-6xl font-sans font-extrabold bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent tracking-tight leading-none text-center">
                      We're not just editors. <span className="font-serif font-normal italic bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent block md:inline">We're your content engine.</span>
                    </h1>
                    <p className="text-base md:text-lg text-stone-300 leading-relaxed pt-2 text-center">
                      While others deliver files, we deliver consistency. VikEdit operates as your outsourced content department handling the entire post-production workflow so you can focus on what you do best! creating, coaching, and growing your business.
                    </p>
                  </div>

                  {/* Team / Leadership section */}
                  <div className="space-y-16">
                    <div className="space-y-4 text-center">
                      <span className="text-xs font-mono tracking-widest uppercase text-stone-400 font-bold block">
                        Our leadership
                      </span>
                      <h2 className="text-3xl md:text-5xl font-sans font-extrabold bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent tracking-tight leading-tight">
                        Our leadership <span className="font-serif font-normal italic bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent">crew</span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                      {TEAM_MEMBERS.map((member) => (
                        <div key={member.id} className="space-y-4 group cursor-pointer text-center flex flex-col items-center">
                          <div className="relative overflow-hidden rounded-full w-52 h-52 sm:w-56 sm:h-56 bg-neutral-900 border border-neutral-800 shadow-sm flex-shrink-0">
                            <img
                              src={member.photoUrl}
                              alt={member.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="pt-2">
                            <h3 className="text-xl font-bold text-white">{member.name}</h3>
                            <p className="text-xs uppercase font-semibold text-stone-400 tracking-wider mt-1">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Growth phases */}
                  <div className="bg-neutral-900 border border-neutral-800/80 p-8 md:p-16 rounded-[40px] space-y-12 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
                    <div className="space-y-4 text-left">
                      <span className="text-xs font-mono tracking-widest uppercase text-stone-400 font-bold block">
                        Growth Phases
                      </span>
                      <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
                        Where we are. <span className="font-serif font-normal italic bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent">Where we're going.</span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                      {/* Phase 1 */}
                      <div className="border border-neutral-800 p-8 rounded-3xl space-y-4 hover:border-[#3b82f6]/30 transition-all duration-300 bg-neutral-950/40">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono tracking-wider uppercase font-bold text-stone-500">Phase 1</span>
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider">
                            Current
                          </span>
                        </div>
                        <h3 className="text-xl font-sans font-bold text-white text-left">Repurposing Studio</h3>
                        <p className="text-sm text-stone-300 leading-relaxed text-left">
                          We transform one recording into weeks of content. Strategic clipping, platform specific formatting, and high retention edits delivered consistently so you never run dry on content.
                        </p>
                      </div>

                      {/* Phase 2 */}
                      <div className="border border-neutral-800 p-8 rounded-3xl space-y-4 hover:border-[#3b82f6]/30 transition-all duration-300 bg-neutral-950/40">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono tracking-wider uppercase font-bold text-stone-500">Phase 2</span>
                          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider">
                            Next
                          </span>
                        </div>
                        <h3 className="text-xl font-sans font-bold text-white text-left">Content Operations</h3>
                        <p className="text-sm text-stone-300 leading-relaxed text-left">
                          Full workflow ownership. We'll handle everything from content strategy and calendar planning to multi-platform scheduling and performance analytics – your complete content backbone.
                        </p>
                      </div>

                      {/* Phase 3 */}
                      <div className="border border-neutral-800 p-8 rounded-3xl space-y-4 hover:border-[#3b82f6]/30 transition-all duration-300 bg-neutral-950/40">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono tracking-wider uppercase font-bold text-stone-500">Phase 3</span>
                          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider block">
                            Future
                          </span>
                        </div>
                        <h3 className="text-xl font-sans font-bold text-white text-left">Media Ecosystem</h3>
                        <p className="text-sm text-stone-300 leading-relaxed text-left">
                          End to end production house. Original content development, distribution partnerships, and monetization infrastructure building media assets that generate revenue beyond your core services.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}



              {currentView === "contact" && (
                <motion.div
                  key="contact-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <ContactForm onBack={() => setView("home")} />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* SECTION 14: FOOTER */}
          <footer className={`bg-neutral-950 border-t border-neutral-900 relative z-30 transform-gpu ${currentView === "home" ? "mt-0" : "mt-24"}`}>
            <div id="footer-top-grid" className="max-w-7xl mx-auto px-6 sm:px-12 py-16 md:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
              {/* Brand Col */}
              <div className="lg:col-span-5 space-y-6">
                <div 
                  onClick={() => setView("home")}
                  className="flex items-center cursor-pointer hover:opacity-80 transition-all duration-300 group"
                >
                  <span className="font-sans text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-none select-none flex items-center">
                    VikEdit
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[0.85em] w-[0.85em] ml-[0.05em] fill-current text-blue-500 flex-shrink-0"
                      style={{ display: "inline-block", verticalAlign: "middle" }}
                    >
                      <path
                        d="M6 4.4v15.2c0 .6.6 1 1.2.7l13.3-7.6c.5-.3.5-1.1 0-1.4L7.2 3.7c-.6-.3-1.2.1-1.2.7z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
                <p className="text-sm text-stone-400 max-w-sm">
                  Content operations for expert-led brands. We transform recordings into sustained publishing momentum without internal overhead.
                </p>

                {/* Social circles */}
                <div className="flex items-center gap-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-stone-300 flex items-center justify-center hover:bg-neutral-800 hover:text-white transition-all" aria-label="X">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-stone-300 flex items-center justify-center hover:bg-neutral-800 hover:text-white transition-all" aria-label="Instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-stone-300 flex items-center justify-center hover:bg-neutral-800 hover:text-white transition-all" aria-label="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Navigate Col */}
              <div className="lg:col-span-2 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
                  NAVIGATE
                </h4>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <button 
                      onClick={() => {
                        setView("home");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }} 
                      className="text-stone-400 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        window.location.hash = "services-section";
                        if (currentView !== "home") {
                          setView("home");
                        } else {
                          document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                          setTimeout(() => window.history.replaceState(null, "", " "), 850);
                        }
                      }} 
                      className="text-stone-400 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      Services
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        window.location.hash = "process-section";
                        if (currentView !== "home") {
                          setView("home");
                        } else {
                          document.getElementById("process-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                          setTimeout(() => window.history.replaceState(null, "", " "), 850);
                        }
                      }} 
                      className="text-stone-400 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      Workflow
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        window.location.hash = "work-case-studies";
                        if (currentView !== "home") {
                          setView("home");
                        } else {
                          document.getElementById("work-case-studies")?.scrollIntoView({ behavior: "smooth", block: "start" });
                          setTimeout(() => window.history.replaceState(null, "", " "), 850);
                        }
                      }} 
                      className="text-stone-400 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      Case Studies
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        window.location.hash = "faq-section";
                        if (currentView !== "home") {
                          setView("home");
                        } else {
                          document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                          setTimeout(() => window.history.replaceState(null, "", " "), 850);
                        }
                      }} 
                      className="text-stone-400 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      FAQ
                    </button>
                  </li>
                </ul>
              </div>

              {/* Connect Col */}
              <div className="lg:col-span-2 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
                  CONNECT
                </h4>
                <ul className="space-y-2.5 text-sm font-sans">
                  <li>
                    <button onClick={() => setView("contact")} className="text-stone-400 hover:text-white transition-colors duration-200 cursor-pointer">
                      Book a Call
                    </button>
                  </li>
                  <li>
                    <a href="#" className="text-stone-400 hover:text-white transition-colors duration-200">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-stone-400 hover:text-white transition-colors duration-200">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <button onClick={() => setView("contact")} className="text-stone-400 hover:text-white transition-colors duration-200 cursor-pointer">
                      Contact
                    </button>
                  </li>
                </ul>
              </div>

              {/* Legal Col */}
              <div className="lg:col-span-3 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
                  LEGAL
                </h4>
                <ul className="space-y-2.5 text-sm font-sans">
                  <li>
                    <a href="#" className="text-stone-400 hover:text-white transition-colors duration-200">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-stone-400 hover:text-white transition-colors duration-200">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-stone-400 hover:text-white transition-colors duration-200">
                      Refund Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-stone-400 hover:text-white transition-colors duration-200">
                      Sitemap
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom copyright segment */}
            <div className="border-t border-neutral-900 py-8 px-6 sm:px-12">
              <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-center">
                <p className="text-xs text-stone-500">
                  © 2026 VikEdit. Created by Vikram Singh Rawat
                </p>
              </div>
            </div>
          </footer>

          {/* Sticky floating WhatsApp button */}
          <motion.a
            href="https://wa.me/918958123147?text=Hi%20Vikedit%2C%20I'm%20interested%20in%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-14 h-14 bg-black hover:bg-neutral-950 rounded-full shadow-2xl border-[3px] border-emerald-500 hover:border-emerald-400 shadow-emerald-500/10 cursor-pointer text-white focus:outline-none"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            title="Chat with us on WhatsApp"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 fill-current stroke-none text-white flex-shrink-0"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </motion.a>
        </motion.div>
      )}
    </div>
  );
}
