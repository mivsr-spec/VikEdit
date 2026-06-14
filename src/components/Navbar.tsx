import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  onBookCallClicked: () => void;
}

export default function Navbar({ currentView, setView, onBookCallClicked }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor layout scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Work", id: "work" },
    { label: "Services", id: "services" }
  ];

  const handleNavClick = (viewId: string) => {
    if (viewId === "services") {
      setMobileMenuOpen(false);
      window.location.hash = "services-section";
      if (currentView !== "home") {
        setView("home");
      } else {
        const el = document.getElementById("services-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setTimeout(() => {
          window.history.replaceState(null, "", " ");
        }, 850);
      }
      return;
    }

    if (viewId === "work") {
      setMobileMenuOpen(false);
      window.location.hash = "process-section";
      if (currentView !== "home") {
        setView("home");
      } else {
        const el = document.getElementById("process-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setTimeout(() => {
          window.history.replaceState(null, "", " ");
        }, 850);
      }
      return;
    }

    setView(viewId);
    setMobileMenuOpen(false);
    
    // Smooth scroll back to top on page switches
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 inset-x-0 h-20 flex items-center justify-between px-6 sm:px-10 z-[1000] transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 text-stone-900 backdrop-blur-md shadow-xs border-b border-stone-100"
            : "bg-transparent text-stone-900"
        }`}
      >
        {/* Left: Logo */}
        <div
          onClick={() => handleNavClick("home")}
          className="flex items-center cursor-pointer group"
        >
          <span className="font-sans text-2xl font-bold tracking-tight text-stone-900 flex items-center">
            VikEdit
            <svg
              viewBox="0 0 24 24"
              className="h-[0.85em] w-[0.85em] ml-[0.05em] fill-current text-blue-500 flex-shrink-0"
              style={{ display: "inline-block", verticalAlign: "middle" }}
            >
              <path
                d="M6 4.4v15.2c0 .6.6 1 1.2.7l13.3-7.6c.5-.3.5-1.1 0-1.4L7.2 3.7c-.6-.3-1.2.1-1.2.7z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>

        {/* Center/Right: Desktop Links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-[#013AE0] underline underline-offset-4 font-extrabold"
                    : "text-stone-600 hover:text-black"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Far Right: CTA Book a Call (Desktop) */}
        <div className="hidden md:block">
          <button
            onClick={onBookCallClicked}
            className="bg-[#013AE0] text-white hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all text-xs font-bold uppercase tracking-wider py-3.5 px-7 rounded-full shadow-md cursor-pointer border border-[#013AE0]"
          >
            Book a Call
          </button>
        </div>

        {/* Mobile: Hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-stone-200 bg-stone-50 text-stone-800 cursor-pointer hover:bg-stone-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Full-screen mobile overlay menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu-overlay" className="fixed inset-0 bg-white z-[999] flex flex-col items-center justify-center p-6 text-center animate-fade-in text-stone-950">
          {/* Logo in top left of overlay */}
          <div className="absolute top-6 left-6 flex items-center">
            <span className="font-sans text-xl font-bold text-stone-900 flex items-center">
              VikEdit
              <svg
                viewBox="0 0 24 24"
                className="h-[0.85em] w-[0.85em] ml-[0.05em] fill-current text-blue-500 flex-shrink-0"
                style={{ display: "inline-block", verticalAlign: "middle" }}
              >
                <path
                  d="M6 4.4v15.2c0 .6.6 1 1.2.7l13.3-7.6c.5-.3.5-1.1 0-1.4L7.2 3.7c-.6-.3-1.2.1-1.2.7z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full border border-stone-200 bg-stone-50 flex items-center justify-center text-stone-850 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Links stack list */}
          <div className="space-y-8 my-auto w-full">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block text-3xl font-extrabold tracking-tight text-center w-full ${
                  currentView === link.id
                    ? "text-blue-600 underline underline-offset-8"
                    : "text-stone-600 hover:text-black"
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-8 flex justify-center">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookCallClicked();
                }}
                className="bg-[#013AE0] text-white w-full max-w-xs py-4 rounded-full text-sm font-bold uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Book a Call
              </button>
            </div>
          </div>

          <div className="pb-4 text-xs text-stone-500 font-mono">
            © 2026 VikEdit • Crafted for Retention
          </div>
        </div>
      )}
    </>
  );
}
