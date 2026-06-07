import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowLeft } from "lucide-react";

interface ContactFormProps {
  onBack?: () => void;
  isInline?: boolean;
}

export default function ContactForm({ onBack, isInline = false }: ContactFormProps) {
  // Form input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate premium submit delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className={`w-full ${isInline ? "bg-[#FFFFFF] pt-12 pb-2 md:pt-16 md:pb-2 border-t border-[#E8E6E1]/60" : "bg-[#F8F7F4] min-h-screen py-16 md:py-24"} px-6 sm:px-12 flex flex-col items-center`}>
      <div className="w-full max-w-[1200px]">
        {/* Subtle Back Button */}
        {!isInline && onBack && (
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 mb-12 text-xs tracking-widest uppercase font-semibold text-[#666666] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Go Back Home</span>
          </button>
        )}

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="contact-form-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start text-left"
            >
              
              {/* LEFT: FORM WRAPPER */}
              <div className="lg:col-span-7">
                <h2 className="font-serif font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-tight text-[#111111] mb-5">
                  Let's make this <span className="italic font-serif font-medium text-stone-700">easy for you.</span>
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#666666] leading-relaxed mb-10 max-w-[480px]">
                  Ready to scale your content output? Fill out the form below, and our operations team will respond within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  {/* Name field */}
                  <div className="flex flex-col gap-1">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full p-3.5 bg-[#FFFFFF] border border-[#E5E5E5] rounded-[4px] font-sans text-[13px] sm:text-sm text-[#111111] placeholder:text-[#969592]/70 focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]/10 transition-all duration-300"
                    />
                  </div>

                  {/* Business Email */}
                  <div className="flex flex-col gap-1">
                    <input
                      type="email"
                      placeholder="Business Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-3.5 bg-[#FFFFFF] border border-[#E5E5E5] rounded-[4px] font-sans text-[13px] sm:text-sm text-[#111111] placeholder:text-[#969592]/70 focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]/10 transition-all duration-300"
                    />
                  </div>

                  {/* Phone input with custom country code decoration */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center bg-[#FFFFFF] border border-[#E5E5E5] rounded-[4px] overflow-hidden focus-within:border-[#111111] focus-within:ring-1 focus-within:ring-[#111111]/10 transition-all duration-300">
                      <span className="country-code px-3.5 py-3.5 bg-[#F2F2F2] text-xs font-medium text-[#666666] border-r border-[#E5E5E5] whitespace-nowrap">
                        +1
                      </span>
                      <input
                        type="tel"
                        placeholder="Phone Number with Country Code"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 border-none focus:outline-none focus:ring-0 p-3.5 font-sans text-[13px] sm:text-sm text-[#111111] placeholder:text-[#969592]/70 bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Custom Rich Textarea */}
                  <div className="flex flex-col gap-1">
                    <textarea
                      placeholder="Tell us about your project, content volume, and goals..."
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3.5 bg-[#FFFFFF] border border-[#E5E5E5] rounded-[4px] font-sans text-[13px] sm:text-sm text-[#111111] placeholder:text-[#969592]/70 focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]/10 transition-all duration-300 resize-y min-h-[120px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-3 px-7 bg-[#111111] text-[#FFFFFF] hover:bg-[#111111]/90 rounded-[4px] font-sans text-xs sm:text-sm font-medium cursor-pointer transition-all duration-300 mt-2 hover:-translate-y-[1px] active:translate-y-[1px] disabled:opacity-50 flex items-center justify-center gap-3 w-fit"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </button>
                </form>
              </div>

              {/* RIGHT: INFO WRAPPER */}
              <div className="lg:col-span-5 pt-2">
                
                {/* Operations HQ block */}
                <div className="mb-8">
                  <h3 className="text-xs text-left uppercase tracking-widest text-[#666666] font-bold font-mono mb-2">
                    Operations HQ
                  </h3>
                  <p className="text-[13px] sm:text-sm text-[#111111] leading-relaxed text-left">
                    123 Creative Blvd, Suite 400<br />
                    Austin, TX 78701
                  </p>
                </div>

                {/* Contact block */}
                <div className="mb-8">
                  <h3 className="text-xs text-left uppercase tracking-widest text-[#666666] font-bold font-mono mb-2">
                    Contact
                  </h3>
                  <div className="flex flex-col gap-1 text-left">
                    <a
                      href="mailto:hello@vikedit.com"
                      className="text-[13px] sm:text-sm text-[#111111] font-sans hover:opacity-70 transition-opacity"
                    >
                      hello@vikedit.com
                    </a>
                    <a
                      href="tel:+15551234567"
                      className="text-[13px] sm:text-sm text-[#111111] font-sans hover:opacity-70 transition-opacity"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>



              </div>

            </motion.div>
          ) : (
            /* Submission Success State */
            <motion.div
              key="success-screen"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-col items-center justify-center py-16 md:py-24 text-center max-w-lg mx-auto"
            >
              <div className="w-16 h-16 bg-[#111111] text-[#FFFFFF] rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Check className="w-8 h-8 stroke-[3.5]" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111] mb-4">
                Thank you, {name}!
              </h2>

              <p className="text-sm text-[#666666] leading-relaxed mb-8 max-w-md">
                Your inquiry has been logged successfully under business email <span className="text-[#111111] font-semibold">{email}</span>. A member of our lead operations crew will review your notes and contact you within the next 24 hours.
              </p>

              <button
                onClick={() => {
                  setName("");
                  setEmail("");
                  setPhone("");
                  setMessage("");
                  setIsSubmitted(false);
                  if (!isInline && onBack) onBack();
                }}
                className="bg-[#111111] text-[#FFFFFF] hover:bg-[#111111]/90 rounded-[4px] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
              >
                {isInline ? "Send Another Message" : "Back To Home"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
