import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FAQ_ITEMS } from "../data";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1"); // First one open by default

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div id="faq-accordions-group" className="w-full max-w-4xl mx-auto space-y-4">
      {FAQ_ITEMS.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            onClick={() => toggleFaq(item.id)}
            className={`cursor-pointer transition-all duration-300 rounded-2xl border ${
              isOpen 
                ? "bg-[#FFFFFF] border-neutral-300 shadow-[0_4px_24px_rgba(26,26,26,0.04)]" 
                : "bg-[#F5F3EF] border-[#E8E6E1] hover:border-[#D4D0C8]"
            }`}
          >
            {/* Header / Question bar */}
            <div className="flex items-center justify-between p-6 md:p-8 select-none">
              <span className="text-sm md:text-base font-semibold text-[#1A1A1A] pr-4">
                {item.question}
              </span>
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#1A1A1A]/5 text-[#1A1A1A]">
                <motion.span
                  animate={{ rotate: isOpen ? 135 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="font-light text-xl leading-none block"
                  style={{ transformOrigin: "center" }}
                >
                  +
                </motion.span>
              </div>
            </div>

            {/* Answer body with smooth height collapse/expand */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.36, ease: [0.25, 1, 0.5, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 md:px-8 md:pb-8 border-t border-[#E8E6E1]/50 pt-4 text-xs md:text-sm text-[#6B6B6B] leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
