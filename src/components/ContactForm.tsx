import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowLeft } from "lucide-react";

interface ContactFormProps {
  onBack?: () => void;
  isInline?: boolean;
}

export default function ContactForm({ onBack, isInline = false }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const formData = new FormData();
      formData.append("access_key", "b618c998-6e89-4aa7-acfb-5ab181286e41");
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", `${countryCode} ${phone}`);
      formData.append("message", message);
      formData.append("subject", `New Lead from VikEdit Contact View: ${name}`);
      formData.append("from_name", name);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(data.message || "Failed to submit form. Please try again.");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "An unexpected error occurred. Please try again or email us directly at hellovikedit@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = isInline
    ? "w-full p-3.5 bg-[#FFFFFF] border border-[#E5E5E5] rounded-[4px] font-sans text-[13px] sm:text-sm text-[#111111] placeholder:text-[#969592]/70 focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]/10 transition-all duration-300"
    : "w-full p-3.5 bg-neutral-900 border border-neutral-800 rounded-[4px] font-sans text-[13px] sm:text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all duration-300";

  return (
    <div className={`w-full ${isInline ? "bg-[#FFFFFF] pt-12 pb-2 md:pt-16 md:pb-2 border-t border-[#E8E6E1]/60" : "bg-black min-h-screen py-16 md:py-24"} px-6 sm:px-12 flex flex-col items-center`}>
      <div className="w-full max-w-[1200px]">
        {!isInline && onBack && (
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 mb-12 text-xs tracking-widest uppercase font-semibold text-stone-400 hover:text-white transition-colors cursor-pointer"
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
              <div className="lg:col-span-7">
                <h2 className={`font-sans font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-tight mb-5 ${isInline ? "text-[#111111]" : "bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent"}`}>
                  Let's make this <span className={`font-sans font-extrabold ${isInline ? "text-stone-700" : "bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent"}`}>easy for you.</span>
                </h2>
                <p className={`font-sans text-xs sm:text-sm leading-relaxed mb-10 max-w-[480px] ${isInline ? "text-[#666666]" : "text-stone-300"}`}>
                  Ready to scale your content output? Fill out the form below, and our operations team will respond within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  <div className="flex flex-col gap-1">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <input
                      type="email"
                      placeholder="Business Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className={`flex items-center rounded-[4px] overflow-hidden transition-all duration-300 ${isInline ? "bg-[#FFFFFF] border border-[#E5E5E5] focus-within:border-[#111111] focus-within:ring-1 focus-within:ring-[#111111]/10" : "bg-neutral-900 border border-neutral-800 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20"}`}>
                      <div className={`relative flex items-center border-r ${isInline ? "bg-[#F2F2F2] border-[#E5E5E5]" : "bg-neutral-800 border-neutral-800"}`}>
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className={`country-code py-3.5 pl-3.5 pr-8 text-xs font-semibold border-none outline-none focus:outline-none focus:ring-0 cursor-pointer appearance-none rounded-l-[4px] ${isInline ? "bg-[#F2F2F2] text-[#111111]" : "bg-neutral-800 text-stone-200"}`}
                          style={{
                            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='none' stroke='${isInline ? "%23666666" : "%23cccccc"}' stroke-width='2.5' viewBox='0 0 24 24'><path d='M6 9l6 6 6-6'/></svg>")`,
                            backgroundPosition: 'calc(100% - 10px) center',
                            backgroundRepeat: 'no-repeat',
                          }}
                        >
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+81">🇯🇵 +81</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+86">🇨🇳 +86</option>
                          <option value="+55">🇧🇷 +55</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+65">🇸🇬 +65</option>
                        </select>
                      </div>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`flex-1 border-none focus:outline-none focus:ring-0 p-3.5 font-sans text-[13px] sm:text-sm bg-transparent ${isInline ? "text-[#111111]" : "text-white"}`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <textarea
                      placeholder="Tell us about your project, content volume, and goals..."
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={inputClasses}
                    />
                  </div>

                  {error && (
                    <div className="text-red-500 text-xs font-sans mt-1 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`py-3 px-7 rounded-[4px] font-sans text-xs sm:text-sm font-medium cursor-pointer transition-all duration-300 mt-2 hover:-translate-y-[1px] active:translate-y-[1px] disabled:opacity-50 flex items-center justify-center gap-3 w-fit ${isInline ? "bg-[#111111] text-[#FFFFFF] hover:bg-[#111111]/90" : "bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-900/20"}`}
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

              <div className="lg:col-span-5 pt-2">
                <div className="mb-8">
                  <h3 className={`text-xs text-left uppercase tracking-widest font-bold font-sans mb-2 ${isInline ? "text-[#666666]" : "text-blue-400"}`}>
                    Operations HQ
                  </h3>
                  <p className={`text-[13px] sm:text-sm leading-relaxed text-left ${isInline ? "text-[#111111]" : "text-stone-300"}`}>
                    East Delhi, India 110092
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className={`text-xs text-left uppercase tracking-widest font-bold font-sans mb-2 ${isInline ? "text-[#666666]" : "text-blue-400"}`}>
                    Contact
                  </h3>
                  <div className="flex flex-col gap-1 text-left">
                    <a
                      href="mailto:Hellovikedit@gmail.com"
                      className={`text-[13px] sm:text-sm font-sans hover:opacity-70 transition-opacity ${isInline ? "text-[#111111]" : "text-stone-300"}`}
                    >
                      Hellovikedit@gmail.com
                    </a>
                    <a
                      href="tel:+918958123147"
                      className={`text-[13px] sm:text-sm font-sans hover:opacity-70 transition-opacity ${isInline ? "text-[#111111]" : "text-stone-300"}`}
                    >
                      +91 895-812-3147
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-screen"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-col items-center justify-center py-16 md:py-24 text-center max-w-lg mx-auto"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm ${isInline ? "bg-[#111111] text-[#FFFFFF]" : "bg-blue-600 text-white"}`}>
                <Check className="w-8 h-8 stroke-[3.5]" />
              </div>

              <h2 className={`text-2xl sm:text-3xl font-serif font-bold mb-4 ${isInline ? "text-[#111111]" : "text-white"}`}>
                Thank you, {name}!
              </h2>

              <p className={`text-sm leading-relaxed mb-8 max-w-md ${isInline ? "text-[#666666]" : "text-stone-300"}`}>
                Your inquiry has been logged successfully under business email <span className={isInline ? "text-[#111111] font-semibold" : "text-blue-400 font-semibold"}>{email}</span>. A member of our lead operations crew will review your notes and contact you within the next 24 hours.
              </p>

              <button
                onClick={() => {
                  setName("");
                  setEmail("");
                  setCountryCode("+91");
                  setPhone("");
                  setMessage("");
                  setIsSubmitted(false);
                  if (!isInline && onBack) onBack();
                }}
                className={`rounded-[4px] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${isInline ? "bg-[#111111] text-[#FFFFFF] hover:bg-[#111111]/90" : "bg-blue-600 text-white hover:bg-blue-500"}`}
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
