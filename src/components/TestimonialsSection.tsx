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
    quote: "Bhai, I used to waste 6 hours editing one episode and still felt stuck. VikEdit literally turned my 45-min podcast into 2 weeks of Reels that actually trend. The pacing, captions, and hooks are just chef’s kiss. Finally, I can just record and chill while the algorithm does its thing. Legit game-changer.",
    name: "Aryan Kapoor",
    title: "Host, The Unfiltered Desk",
    photoUrl: "https://images2.imgbox.com/d2/7f/JM5rSrqB_o.png",
    rating: 5
  },
  {
    id: 2,
    quote: "Honestly, I was super hesitant to outsource my edits, but the team instantly caught my vibe. Zero micromanaging just clean, aesthetic edits that actually look premium. Turnaround is mad fast, and my feed finally looks cohesive across Insta and YouTube. No more editing stress, just post and grow. Absolutely worth it.",
    name: "Zara Ahmed",
    title: "Lifestyle Creator & Brand Strategist",
    photoUrl: "https://images2.imgbox.com/f9/c8/Xa1wd19Z_o.png",
    rating: 5
  },
  {
    id: 3,
    quote: "From one live webinar, they pulled 15 clips that crossed 600K views in a month. The ROI is actually insane. VikEdit isn’t just an editing vendor they get the whole content strategy. My channel grew 3x because I could finally post consistently without burning out. If you’re serious about scaling, just hop on.",
    name: "Rohan Mehta",
    title: "Founder, CodeWithRohan",
    photoUrl: "https://images2.imgbox.com/d5/5c/LlR6sGQ4_o.png",
    rating: 5
  },
  {
    id: 4,
    quote: "As a coach juggling clients, I had literally zero time to edit. VikEdit handles everything dynamic captions, platform formatting, even the trending audio sync. My LinkedIn and Insta are finally posting daily without me lifting a finger. Best investment for my personal brand, no cap. Just let them cook.",
    name: "Meera Iyer",
    title: "Career Coach & Personal Brand Consultant",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
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
                      className="w-5 h-5 fill-amber-400 text-amber-400" 
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
