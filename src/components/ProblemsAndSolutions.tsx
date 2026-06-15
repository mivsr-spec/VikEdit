import { motion } from "motion/react";

export default function ProblemsAndSolutions() {
  const problems = [
    {
      num: "01",
      title: "Stuck in the \"Editing Loop\" instead of scaling",
      description: "You spend endless hours cutting clips, sync-ing audio, adding captions, and fixing formats. By the time the video is ready, you're too exhausted to focus on your actual business growth and planning.",
      image: "https://images2.imgbox.com/ff/f9/CyAtkkSD_o.png",
      alt: "Exhausted content creator slumped over desk under a desk lamp",
      badge: "The Time Sink"
    },
    {
      num: "02",
      title: "Great content that never sees the light of day",
      description: "Your phone storage and hard drives are packed with amazing raw footage, but it just sits there. Days turn into weeks, consistency drops to zero, and your target audience slowly loses attention.",
      image: "https://images2.imgbox.com/47/5c/zUagdyOT_o.png",
      alt: "Overwhelmed content creator looking at multiple floating active files",
      badge: "The Backlog Trap"
    },
    {
      num: "03",
      title: "The constant trade-off: speed vs. quality",
      description: "Rushing files leads to sloppy, cheap-looking results. Taking your time means missing trending windows entirely. Either way, your content loses organic reach and the attention it deserves.",
      image: "https://images2.imgbox.com/07/20/W6BHjl0h_o.png",
      alt: "Creator frantically matching ticking clock and timeline",
      badge: "The Quality Dilemma"
    }
  ];

  const solutions = [
    {
      num: "01",
      title: "A complete hands-off production system",
      description: "No more shifting through messy timelines or fixing audio levels. Simply upload your raw footage once, and we handle the layout, script editing, corrections, and delivery. Fully refined assets back on schedule.",
      image: "https://images2.imgbox.com/90/40/jA2YwvaJ_o.png",
      alt: "Relaxed content creator enjoying coffee with successful completed video checkmark",
      badge: "Seamless Workflow"
    },
    {
      num: "02",
      title: "Shoot once, post for weeks",
      description: "Multiply your output efficiency. A single recording session is strategically sliced and formatted into 10–15 high-performing short-form clips, keeping you active and highly consistent across multiple channels.",
      image: "https://images2.imgbox.com/ce/63/bWrlCC58_o.png",
      alt: "Happy creator managing organized content schedule calendar",
      badge: "Consistent Output"
    },
    {
      num: "03",
      title: "High-retention edits built for growth",
      description: "We don't just deliver edits; we engineer videos to perform. Utilizing custom captions, dynamic pacing, and platform-tested hooks that grab viewer attention within 3 seconds and drive engagement metrics upward.",
      image: "https://images2.imgbox.com/68/d6/CyNkQ1Ks_o.png",
      alt: "Happy creator watching high conversion metrics and engagement go up",
      badge: "Retention First"
    }
  ];

  // Easing curve mimicking power3.out: [0.16, 1, 0.3, 1]
  const power3Out = [0.16, 1, 0.3, 1];

  return (
    <div id="problems-solutions-parent" className="bg-white font-sans selection:bg-rose-100 selection:text-rose-950">
      {/* SECTION 1: THE REAL PROBLEMS */}
      <section id="problems-section" className="py-24 md:py-36 px-6 sm:px-12 border-b border-stone-100">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center max-w-4xl mx-auto space-y-4 mb-20 md:mb-28">
            <span className="text-xs font-sans tracking-widest text-blue-600 uppercase font-bold block">
              THE OBSTACLES
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold text-stone-900 tracking-tight leading-tight select-none">
              The Real <span className="font-serif font-normal bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent">Problems</span>
            </h2>
            <p className="text-sm md:text-base text-stone-600 max-w-2xl mx-auto pt-2 leading-relaxed">
              Building an audience is hard enough. Don't let operational overhead burn you out before you reach your potential.
            </p>
          </div>

          {/* Zig-Zag Row Grid */}
          <div className="space-y-24 md:space-y-36">
            {problems.map((item, index) => {
              // Alternating layouts: 
              // index 0 -> Row 1: Text Left, Image Right. On mobile: Image then Text (flex-col-reverse md:flex-row)
              // index 1 -> Row 2: Image Left, Text Right. On mobile: Image then Text (flex-col-reverse md:flex-row-reverse)
              // index 2 -> Row 3: Text Left, Image Right. On mobile: Image then Text (flex-col-reverse md:flex-row)
              const isEven = index % 2 === 0;
              const flexClass = isEven ? "flex-col-reverse md:flex-row" : "flex-col-reverse md:flex-row-reverse";

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: power3Out }}
                  className={`flex ${flexClass} items-center justify-between gap-12 md:gap-20`}
                >
                  {/* Text Container */}
                  <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-sans text-rose-600 font-bold tracking-wider px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100">
                        {item.badge}
                      </span>
                      <span className="text-rose-200 text-xs font-sans font-bold">
                        {item.num}
                      </span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-stone-900 tracking-tight leading-tight md:leading-snug">
                       {item.title}
                    </h3>
                    <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Image Container */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative group overflow-hidden rounded-3xl border border-stone-200/60 bg-stone-50 aspect-square w-full max-w-[480px] shadow-sm">
                      {/* Gradient Ambient backing */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      <img
                        src={item.image}
                        alt={item.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW WE SOLVE IT */}
      <section id="solutions-section" className="py-24 md:py-36 px-6 sm:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center max-w-4xl mx-auto space-y-4 mb-20 md:mb-28">
            <span className="text-xs font-sans tracking-widest text-blue-600 uppercase font-bold block">
              THE RESOLUTION
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold text-stone-900 tracking-tight leading-tight select-none">
              How We <span className="font-serif font-normal bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent">Solve It</span>
            </h2>
            <p className="text-sm md:text-base text-stone-600 max-w-2xl mx-auto pt-2 leading-relaxed">
              We build high-performance content infrastructure so you can step away from the timelines and step into your zone of genius.
            </p>
          </div>

          {/* Zig-Zag Row Grid */}
          <div className="space-y-24 md:space-y-36">
            {solutions.map((item, index) => {
              // Alternating layouts: 
              // index 0 -> Row 1: Text Left, Image Right. On mobile: Image then Text (flex-col-reverse md:flex-row)
              // index 1 -> Row 2: Image Left, Text Right. On mobile: Image then Text (flex-col-reverse md:flex-row-reverse)
              // index 2 -> Row 3: Text Left, Image Right. On mobile: Image then Text (flex-col-reverse md:flex-row)
              const isEven = index % 2 === 0;
              const flexClass = isEven ? "flex-col-reverse md:flex-row" : "flex-col-reverse md:flex-row-reverse";

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: power3Out }}
                  className={`flex ${flexClass} items-center justify-between gap-12 md:gap-20`}
                >
                  {/* Text Container */}
                  <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-sans text-blue-600 font-bold tracking-wider px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100">
                        {item.badge}
                      </span>
                      <span className="text-blue-200 text-xs font-sans font-bold">
                        {item.num}
                      </span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-stone-900 tracking-tight leading-tight md:leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Image Container */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative group overflow-hidden rounded-3xl border border-stone-200/60 bg-stone-50 aspect-square w-full max-w-[480px] shadow-sm">
                      {/* Gradient Ambient backing */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      <img
                        src={item.image}
                        alt={item.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
