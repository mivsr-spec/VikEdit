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
                ? "bg-[#FCFBF9] border-stone-200 shadow-xs" 
                : "bg-white border-stone-100 hover:border-stone-200"
            }`}
          >
            {/* Header / Question bar */}
            <div className="flex items-center justify-between p-6 md:p-8 select-none">
              <span className={`text-sm md:text-base font-semibold pr-4 transition-colors duration-300 ${isOpen ? "text-stone-900" : "text-stone-700 hover:text-black"}`}>
                {item.question}
              </span>
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-stone-100 text-stone-800 border border-stone-200/50">
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
                  <div className="px-6 pb-6 md:px-8 md:pb-8 border-t border-stone-100 pt-4 text-xs md:text-sm text-stone-600 leading-relaxed">
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
