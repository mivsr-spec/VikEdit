import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Star, ArrowLeft } from "lucide-react";

interface ContactFormProps {
  onBack?: () => void;
}

export default function ContactForm({ onBack }: ContactFormProps) {
  // Field values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedService, setSelectedService] = useState("Content Creation");
  const [selectedBudget, setSelectedBudget] = useState("$2K - $5K");
  const [message, setMessage] = useState("");

  // Validation state
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = ["Content Creation", "Social Management", "Paid Media", "All"];
  const budgets = ["Under $2K", "$2K - $5K", "$5K - $10K", "$10K+"];

  // Real-time validation helpers
  const validateName = (val: string) => {
    if (!val.trim()) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, name: undefined }));
    return true;
  };

  const validateEmail = (val: string) => {
    if (!val.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return false;
    }
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!reg.test(val)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: undefined }));
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isNValid = validateName(name);
    const isEValid = validateEmail(email);

    if (isNValid && isEValid) {
      setIsSubmitting(true);
      // Simulate premium API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1200);
    }
  };

  return (
    <div id="contact-form-page-container" className="w-full max-w-[1200px] mx-auto px-6 py-12 md:py-20">
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-10 text-xs tracking-wider uppercase font-semibold text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back Home
        </button>
      )}

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="booking-form-content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
          >
            {/* Left Column Information */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs font-mono tracking-widest uppercase text-[#6B6B6B] mb-4">
                Let's book a call
              </span>
              <h1 className="text-4xl md:text-6xl font-sans font-bold text-[#1A1A1A] leading-tight mb-6">
                Let's get <br />
                <span className="italic font-serif font-medium font-normal text-slate-800">started.</span>
              </h1>
              <p className="text-base text-[#6B6B6B] leading-relaxed mb-8 max-w-sm">
                Ready to transform your social media? Get in touch and we'll show you what's possible for your brand.
              </p>

              {/* Creator Lab Testimonial pill */}
              <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E6E1] shadow-xs max-w-sm">
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-[#6B6B6B] italic mb-3">
                  "VikEdit transformed our video flow. Our watch-times rose by 80% on average in weeks!"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                    className="w-8 h-8 rounded-full object-cover"
                    alt="avatar"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1A1A]">Jessica Williams</h4>
                    <span className="text-[10px] text-[#999999]">Cosmetics Creator</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Interactive Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8 bg-white p-8 md:p-12 rounded-3xl border border-[#E8E6E1]">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your beautiful name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    validateName(e.target.value);
                  }}
                  onBlur={() => validateName(name)}
                  className={`w-full py-3.5 px-4 bg-[#F5F3EF] border rounded-xl font-sans text-sm text-[#1A1A1A] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all ${
                    errors.name ? "border-red-400 focus:ring-red-400" : "border-[#E8E6E1]"
                  }`}
                />
                {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  onBlur={() => validateEmail(email)}
                  className={`w-full py-3.5 px-4 bg-[#F5F3EF] border rounded-xl font-sans text-sm text-[#1A1A1A] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all ${
                    errors.email ? "border-red-400 focus:ring-red-400" : "border-[#E8E6E1]"
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
              </div>

              {/* Service Chip Selectors */}
              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">
                  What services are you interested in?
                </label>
                <div id="service-chips-grid" className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5">
                  {services.map((svc) => (
                    <button
                      key={svc}
                      type="button"
                      onClick={() => setSelectedService(svc)}
                      className={`py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                        selectedService === svc
                          ? "bg-black text-white border-black"
                          : "bg-[#F5F3EF] text-[#6B6B6B] border-[#E8E6E1] hover:bg-[#D4D0C8] hover:text-[#1A1A1A]"
                      }`}
                    >
                      {svc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Chip Selectors */}
              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">
                  Current monthly social media budget?
                </label>
                <div id="budget-chips-grid" className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5">
                  {budgets.map((bgt) => (
                    <button
                      key={bgt}
                      type="button"
                      onClick={() => setSelectedBudget(bgt)}
                      className={`py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                        selectedBudget === bgt
                          ? "bg-black text-white border-black"
                          : "bg-[#F5F3EF] text-[#6B6B6B] border-[#E8E6E1] hover:bg-[#D4D0C8] hover:text-[#1A1A1A]"
                      }`}
                    >
                      {bgt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Message input */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">
                  Tell us about your business...
                </label>
                <textarea
                  rows={4}
                  placeholder="How can VikEdit help you grow your audience?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full py-3.5 px-4 bg-[#F5F3EF] border border-[#E8E6E1] rounded-xl font-sans text-sm text-[#1A1A1A] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all resize-none"
                />
              </div>

              {/* Submit CTA button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-3 shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Securing Spot...
                    </>
                  ) : (
                    "Book a Call"
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-[#999999] leading-relaxed">
                By submitting, you agree to our Terms of Service & Privacy Guidelines. No spam, ever.
              </p>
            </form>
          </motion.div>
        ) : (
          /* Animated success state with custom checkmark */
          <motion.div
            key="booking-success-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center max-w-lg mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-inner"
            >
              <Check className="w-10 h-10 stroke-[3]" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-sans font-bold text-[#1A1A1A] mb-4"
            >
              Spot successfully requested!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[#6B6B6B] leading-relaxed mb-8 text-sm"
            >
              Thank you {name}. We have logged your request under interest group{" "}
              <b className="text-black">{selectedService}</b> with expected budget of{" "}
              <b className="text-black">{selectedBudget}</b>. Vikram and the lead production crew will reach out within the next 4 hours via <span className="text-black underline">{email}</span>.
            </motion.p>

            <motion.button
              onClick={() => {
                setIsSubmitted(false);
                setName("");
                setEmail("");
                setMessage("");
                if (onBack) onBack();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Back To Main Site
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
