import React from "react";
import { MARQUEE_BRANDS } from "../data";

export default function Marquee() {
  return (
    <div id="brands-marquee-wrapper" className="w-full overflow-hidden bg-[#F5F3EF] py-14 border-y border-[#E8E6E1] relative">
      {/* Dynamic gradient masks for ultra-premium look */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#F5F3EF] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#F5F3EF] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max items-center">
        {/* Continuous horizontal scrolling container */}
        <div className="flex gap-12 md:gap-16 pr-12 md:pr-16 animate-marquee whitespace-nowrap shrink-0">
          {MARQUEE_BRANDS.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="inline-flex items-center text-xl sm:text-2xl font-serif italic font-medium text-[#CCCCCC] hover:text-[#1A1A1A] transition-colors duration-300 cursor-pointer select-none"
            >
              {brand}
            </div>
          ))}
        </div>
        
        {/* Duplicate the array to allow infinite seamless looping with absolute timing */}
        <div className="flex gap-12 md:gap-16 pr-12 md:pr-16 animate-marquee whitespace-nowrap shrink-0" aria-hidden="true">
          {MARQUEE_BRANDS.map((brand, index) => (
            <div
              key={`${brand}-dup-${index}`}
              className="inline-flex items-center text-xl sm:text-2xl font-serif italic font-medium text-[#CCCCCC] hover:text-[#1A1A1A] transition-colors duration-300 cursor-pointer select-none"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
