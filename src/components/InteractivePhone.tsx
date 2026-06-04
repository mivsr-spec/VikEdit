import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Heart, Share2, MessageCircle, Bookmark } from "lucide-react";
import { HERO_CAROUSEL_IMAGES } from "../data";

export default function InteractivePhone() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotating sequence every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_CAROUSEL_IMAGES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_CAROUSEL_IMAGES.length) % HERO_CAROUSEL_IMAGES.length);
  };

  return (
    <div 
      className="relative flex items-center justify-center p-4 md:p-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle floating background decorative circle mimicking warm cosmic neutral glow */}
      <div className="absolute -inset-10 bg-radial from-[#E8E6E1] to-transparent opacity-60 rounded-full blur-3xl -z-10" />

      {/* Outer Phone Frame */}
      <motion.div
        id="hero-phone-container"
        className="w-[280px] h-[500px] sm:w-[380px] sm:h-[680px] rounded-[40px] bg-[#FFFFFF] border-[10px] sm:border-[12px] border-white shadow-[0_45px_100px_rgba(26,26,26,0.14)] relative overflow-hidden flex flex-col"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 0.5, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut"
        }}
      >
        {/* Notch / Speaker bar */}
        <div className="absolute top-0 inset-x-0 h-6 bg-transparent flex justify-center z-50">
          <div className="w-24 sm:w-32 h-4 bg-white/10 backdrop-blur-md rounded-b-2xl flex items-center justify-around px-2">
            <span className="text-[9px] font-sans text-white/80 font-medium">9:41</span>
            <div className="w-12 h-2.5 bg-black/60 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1" />
              <div className="w-5 h-1 bg-white/20 rounded-full" />
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-2 h-2 bg-white/80 rounded-sm" />
              <div className="w-2.5 h-1.5 bg-white/80 rounded-xs" />
            </div>
          </div>
        </div>

        {/* Dynamic stories indicator line */}
        <div className="absolute top-7 inset-x-3 h-0.5 flex gap-1 z-40">
          {HERO_CAROUSEL_IMAGES.map((_, i) => (
            <div key={i} className="flex-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-white transition-all duration-[4000ms] ease-linear ${
                  i === currentIndex ? "w-full" : i < currentIndex ? "w-full opacity-60" : "w-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Top User Metadata Bar */}
        <div className="absolute top-9 inset-x-4 flex items-center justify-between z-40 text-white drop-shadow-md">
          <div className="flex items-center gap-2">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" 
              alt="Jessica Su"
              className="w-8 h-8 rounded-full border border-white/40 OBJECT-cover"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-sans text-xs font-semibold tracking-wide">jessicasu</span>
              <span className="font-sans text-[10px] text-white/80">3h • Original Audio</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium border border-white/10">
            <span>Reels</span>
          </div>
        </div>

        {/* Image Slideshow (Carousel) */}
        <div className="flex-1 relative w-full h-full bg-[#1A1A1A] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={HERO_CAROUSEL_IMAGES[currentIndex]}
              alt={`Cosmetic scene ${currentIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover select-none"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          {/* Social Interactions Overlay (Right vertical edge mimicking real social app) */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40 text-white">
            <motion.button whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-0.5 cursor-pointer">
              <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/40">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>
              <span className="text-[10px] font-mono tracking-tight text-white font-medium shadow-sm">4.2K</span>
            </motion.button>

            <motion.button whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-0.5 cursor-pointer">
              <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/40">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-mono tracking-tight text-white font-medium shadow-sm">186</span>
            </motion.button>

            <motion.button whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-0.5 cursor-pointer">
              <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/40">
                <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
              <span className="text-[10px] font-mono tracking-tight text-white font-medium shadow-sm">623</span>
            </motion.button>

            <motion.button whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-0.5 cursor-pointer">
              <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/40">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-mono tracking-tight text-white font-medium shadow-sm">Share</span>
            </motion.button>
          </div>

          {/* Live Engagement Popover at the bottom-left */}
          <div className="absolute left-3 bottom-14 z-40 max-w-[70%] text-white drop-shadow-md p-1.5 flex flex-col gap-1.5">
            <div className="flex gap-1 items-center bg-[#000000]/40 backdrop-blur-sm p-1 rounded-sm w-max">
              <span className="text-[10px] font-mono text-emerald-400">♥ 98.7% Retention</span>
            </div>
            <p className="font-sans text-xs font-semibold leading-relaxed line-clamp-2">
              The absolute best warm skincare aesthetic routines with VikEdit dynamic framing and key typography!
            </p>
          </div>

          {/* Nav Arrows */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.button
                  key="prev-btn"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 0.8, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white cursor-pointer z-50 hover:bg-black/60 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>

                <motion.button
                  key="next-btn"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 0.8, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white cursor-pointer z-50 hover:bg-black/60 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </>
            )}
          </AnimatePresence>

          {/* Floating Gesture Helper: small black dot cursor moving subtly on top of Carousel */}
          <motion.div
            className="absolute w-4 h-4 rounded-full bg-[#1A1A1A] border-2 border-white pointer-events-none z-30 opacity-70"
            animate={{
              x: [100, 180, 140, 240, 100],
              y: [200, 320, 280, 180, 200],
              scale: [1, 1.4, 0.9, 1.2, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Bottom center overlay: Black rounded square banner with white play logo */}
          <div className="absolute bottom-3 inset-x-0 flex justify-center z-50">
            <div className="bg-[#1A1A1A] hover:scale-105 active:scale-95 transition-transform duration-300 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white border border-neutral-800 shadow-xl cursor-pointer">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 sm:h-6 sm:w-6 fill-current text-white flex-shrink-0"
              >
                <path
                  d="M6 4.4v15.2c0 .6.6 1 1.2.7l13.3-7.6c.5-.3.5-1.1 0-1.4L7.2 3.7c-.6-.3-1.2.1-1.2.7z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
