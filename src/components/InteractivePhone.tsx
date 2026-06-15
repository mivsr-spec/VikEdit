import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  MessageCircle, 
  Send, 
  MoreHorizontal, 
  ChevronDown, 
  Sparkles, 
  Home, 
  Search, 
  Play, 
  ShoppingBag, 
  Music
} from "lucide-react";

// ========================================================
// EASILY EDITABLE ARRAY OF 5 REELS IMAGES
// You can freely swap out these image URLs as needed!
// ========================================================
const REELS_IMAGES = [
  "https://images2.imgbox.com/ea/af/bJ35x45g_o.png",
  "https://images2.imgbox.com/ea/af/bJ35x45g_o.png",
  "https://images2.imgbox.com/bb/c2/JACv15RA_o.png",
  "https://images2.imgbox.com/b4/09/nxStDP57_o.png",
  "https://images2.imgbox.com/7e/06/OE6zRXNP_o.png"
];

export default function InteractivePhone() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotating Reels sequence every 2.5 seconds in an infinite loop
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 2500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REELS_IMAGES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REELS_IMAGES.length) % REELS_IMAGES.length);
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
          {REELS_IMAGES.map((_, i) => (
            <div key={i} className="flex-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-white transition-all duration-[2500ms] ease-linear ${
                  i === currentIndex ? "w-full" : i < currentIndex ? "w-full opacity-60" : "w-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Image Slideshow (Carousel) */}
        <div className="flex-1 relative w-full h-full bg-[#1A1A1A] overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentIndex}
              src={REELS_IMAGES[currentIndex]}
              alt={`Cosmetic scene ${currentIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover select-none"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          {/* Social Interactions Overlay (Right vertical edge mimicking real social app) */}
          <div className="absolute right-3.5 bottom-16 flex flex-col items-center gap-4 z-40 text-white drop-shadow-md">
            {/* Heart (Like) */}
            <motion.button whileTap={{ scale: 0.9 }} className="flex flex-col items-center cursor-pointer group">
              <Heart className="w-7 h-7 text-white stroke-[2.2] group-hover:scale-115 transition-transform" />
              <span className="text-[10px] sm:text-[11px] font-sans tracking-wide text-white font-bold mt-0.5 select-none text-shadow-sm">135k</span>
            </motion.button>

            {/* Comment (MessageCircle) */}
            <motion.button whileTap={{ scale: 0.9 }} className="flex flex-col items-center cursor-pointer group">
              <MessageCircle className="w-7 h-7 text-white stroke-[2.2] group-hover:scale-115 transition-transform" />
              <span className="text-[10px] sm:text-[11px] font-sans tracking-wide text-white font-bold mt-0.5 select-none text-shadow-sm">11.k</span>
            </motion.button>

            {/* Share (Send Paper Airplane) */}
            <motion.button whileTap={{ scale: 0.9 }} className="flex flex-col items-center cursor-pointer group">
              <Send className="w-7 h-7 text-white stroke-[2.2] rotate-[-22deg] translate-y-[-1px] group-hover:scale-115 transition-transform" />
              <span className="text-[10px] sm:text-[11px] font-sans tracking-wide text-white font-bold mt-0.5 select-none text-shadow-sm">22.k</span>
            </motion.button>

            {/* More Options */}
            <motion.button whileTap={{ scale: 0.9 }} className="flex flex-col items-center cursor-pointer opacity-90 hover:opacity-100">
              <MoreHorizontal className="w-6 h-6 text-white" />
            </motion.button>

            {/* Down arrow inside rounded squared border (Constellation music audio album art placeholder) */}
            <motion.button whileTap={{ scale: 0.9 }} className="flex flex-col items-center cursor-pointer">
              <div className="w-7 h-7 rounded bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <ChevronDown className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
            </motion.button>
          </div>

          {/* Real Instagram Reels Bottom Metadata & Branding Layout */}
          <div className="absolute left-3.5 bottom-16 z-40 max-w-[70%] text-white drop-shadow-md flex flex-col gap-2">
            {/* Audio theme badge (translucent dark pill) */}
            <div className="bg-black/30 backdrop-blur-md rounded-full px-2.5 py-0.5 flex items-center gap-1 w-max border border-white/5">
              <Sparkles className="w-3 h-3 text-white fill-white" />
              <span className="text-[8.5px] font-sans uppercase tracking-[0.12em] text-white font-bold">DREAMS</span>
            </div>

            {/* User row: Avatar circle (colorful gradient) + @username + Follow button */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[1.5px] flex items-center justify-center shadow-lg">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <ChevronDown className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                </div>
              </div>
              <span className="text-xs font-sans font-bold text-white select-none">username</span>
              <button className="border border-white/45 bg-black/10 hover:bg-white/10 active:scale-95 text-[9.5px] font-bold px-2 py-[1.5px] rounded transition-all cursor-pointer">
                Follow
              </button>
            </div>

            {/* Caption */}
            <p className="font-sans text-[11px] text-white/95 leading-snug font-medium line-clamp-2 select-none">
              Great song!
            </p>

            {/* Sound track name info footer ticker */}
            <div className="flex items-center gap-1.5 text-[9.5px] text-white/90 font-sans tracking-wide py-0.5 select-none">
              <Music className="w-3 h-3 text-white fill-white animate-pulse" />
              <div className="truncate text-stone-200">
                Storm Boy • Xavier.. ✦ DREAMS
              </div>
            </div>
          </div>

          {/* Translucent Glass Bottom Navigation Bar styled like Instagram Reels */}
          <div className="absolute bottom-0 inset-x-0 h-12 bg-black/70 backdrop-blur-md border-t border-white/5 flex items-center justify-around px-3 z-45 text-white pb-1.5">
            <motion.button whileTap={{ scale: 0.9 }} className="cursor-pointer p-1 text-white hover:opacity-80">
              <Home className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} className="cursor-pointer p-1 text-white hover:opacity-80">
              <Search className="w-5 h-5 text-white" />
            </motion.button>
            {/* Reels / Film Center Button */}
            <motion.button whileTap={{ scale: 0.9 }} className="cursor-pointer p-1 text-white hover:scale-105 transition-transform">
              <div className="relative w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                <Play className="w-4 h-4 fill-white text-white translate-x-[1px]" />
              </div>
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} className="cursor-pointer p-1 text-white hover:opacity-80">
              <ShoppingBag className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} className="cursor-pointer p-1 text-white hover:opacity-80">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[1px] flex items-center justify-center shadow">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <ChevronDown className="w-3 h-3 text-white stroke-[3.5]" />
                </div>
              </div>
            </motion.button>
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
        </div>
      </motion.div>
    </div>
  );
}
