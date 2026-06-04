import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoaderProps {
  onComplete: () => void;
  key?: string;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 800); // Small pause for smooth transition
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      id="root-loader"
      className="fixed inset-0 bg-[#000000] z-[10000] flex flex-col items-center justify-center p-6 text-white"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Modern play loader rotating spinner */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Rotating dashed circle outline */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "linear",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="w-full h-full text-white"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 3"
                className="opacity-40"
              />
            </svg>
          </motion.div>

          {/* Static play icon in the center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="w-full h-full text-white"
            >
              <path
                d="M8.7 7.5v9c0 .4.4.6.8.4l7.5-4.5c.3-.2.3-.6 0-.8L9.5 7.1c-.4-.2-.8 0-.8.4z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* Brand name and progress meter */}
        <div className="absolute top-36 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-xl font-bold tracking-wider uppercase mb-2"
          >
            VikEdit
          </motion.div>
          <motion.div
            className="font-mono text-xs text-neutral-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading {Math.min(progress, 100)}%
          </motion.div>
        </div>
      </div>
    </div>
  );
}
