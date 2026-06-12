import { motion } from "motion/react";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  photoUrl: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "VikEdit transformed my podcast into a content machine. One recording session gave me 3 weeks of Reels and Shorts. My engagement doubled and I finally have time to focus on creating instead of editing.",
    name: "Sarah Mitchell",
    title: "Host, The Growth Podcast",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: 2,
    quote: "I was skeptical about outsourcing editing, but VikEdit's team understood my brand instantly. The quality is consistent, the turnaround is fast, and my content finally looks professional across all platforms.",
    name: "Marcus Chen",
    title: "Founder, Elevate Coaching",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: 3,
    quote: "From one webinar, they created 12 high-performing clips that generated over 500K views. The ROI is insane. VikEdit isn't just an editing service—they're a growth partner.",
    name: "Priya Sharma",
    title: "CEO, Digital Marketing Institute",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: 4,
    quote: "As a busy consultant, I don't have time to edit videos. VikEdit handles everything—from captions to platform formatting. My LinkedIn and Instagram have never been more consistent. Best investment I've made for my personal brand.",
    name: "James Rodriguez",
    title: "Business Consultant & Speaker",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  }
];

export function TestimonialsSection() {
  return (
    <section 
      id="testimonials-section" 
      className="py-24 md:py-36 px-6 sm:px-12 bg-black border-y border-neutral-900 relative overflow-hidden"
    >
      {/* Absolute decorative ambient elements for premium depth */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-600/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header containing metadata, title & subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono tracking-widest uppercase text-stone-400 font-bold block mb-2"
          >
            TESTIMONIALS
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-sans font-extrabold text-white tracking-tight leading-tight"
          >
            Why Creators & Brands <span className="font-serif font-normal italic bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent">Trust VikEdit</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-300 text-sm md:text-base max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Real results from real partnerships. No fluff, just consistent content that performs.
          </motion.p>
        </div>

        {/* 2x2 Grid of premium cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-neutral-900 border border-neutral-800 hover:border-[#3b82f6]/30 rounded-[20px] p-8 md:p-10 flex flex-col justify-between space-y-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 relative group"
            >
              <div className="space-y-4 relative z-10">
                {/* Visual prominent star rating inline */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-[#4a90e2] text-[#4a90e2]" 
                    />
                  ))}
                </div>

                {/* Testimonial Quote body */}
                <p className="text-[#b8b8b8] font-sans text-sm md:text-base leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              {/* Author profiles layout */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5 relative z-10">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-neutral-900 flex-shrink-0">
                  <img 
                    src={t.photoUrl} 
                    alt={t.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-left">
                  <h4 className="text-sm md:text-base font-bold text-white leading-snug">
                    {t.name}
                  </h4>
                  <p className="text-xs text-stone-400 font-semibold tracking-wide">
                    {t.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
