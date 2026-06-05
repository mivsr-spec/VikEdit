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
                  Get in Touch
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

                {/* Social WhatsApp connection */}
                <div className="flex flex-col items-start gap-4">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-2.5 text-[13px] sm:text-sm font-semibold text-[#111111] hover:opacity-80 transition-opacity cursor-pointer group"
                  >
                    <div className="w-[44px] h-[44px] bg-[#111111] rounded-full p-2.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      {/* Beautiful White WhatsApp SVG Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="w-full h-full fill-white"
                      >
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                      </svg>
                    </div>
                    <span>Connect with us on WhatsApp</span>
                  </a>

                  {/* Custom Stylized QR Code Placeholder */}
                  <div className="w-[124px] h-[124px] bg-[#EAEAEA] rounded-[4px] flex flex-col items-center justify-center text-[11px] text-[#666666] font-medium text-center p-4 border border-[#E0E0E0] shadow-2xs select-none">
                    <span className="block font-bold mb-1">[WhatsApp QR]</span>
                    <span>Scan to Chat</span>
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
