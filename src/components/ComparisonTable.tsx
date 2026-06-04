import { Check, X } from "lucide-react";

export default function ComparisonTable() {
  const otherPoints = [
    "Transactional file delivery",
    "Ad-hoc revisions, inconsistent pacing",
    "Generic formatting, no strategic alignment"
  ];

  const vikEditPoints = [
    "Systematic content infrastructure",
    "Strategic repurposing, algorithmic optimization",
    "Predictable cadence, embedded partnership"
  ];

  return (
    <div id="comparison-box" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
      {/* Left side: Other Agencies */}
      <div className="bg-[#F5F3EF] border border-[#E8E6E1] p-8 md:p-12 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:shadow-sm">
        <div>
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#999999]/80 block mb-2">
            The standard way
          </span>
          <h4 className="text-2xl font-sans font-bold text-[#6B6B6B] mb-8 tracking-tight">
            Traditional Editors
          </h4>
          
          <ul className="space-y-6">
            {otherPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#E8E6E1] flex items-center justify-center text-[#1A1A1A]/60 border border-[#E8E6E1]">
                  <X className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-[#6B6B6B] font-sans text-sm leading-relaxed">{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 pt-6 border-t border-[#E8E6E1] text-[11px] text-[#999999] font-mono tracking-wider">
          🚫 Legacy workflows
        </div>
      </div>

      {/* Right side: VikEdit (Premium container) */}
      <div className="bg-white border-2 border-[#1A1A1A] p-8 md:p-12 rounded-3xl flex flex-col justify-between relative shadow-[0_12px_45px_rgba(26,26,26,0.04)] hover:shadow-[0_16px_50px_rgba(26,26,26,0.06)] transition-all duration-300">
        {/* Recommended pill badge */}
        <div className="absolute -top-3.5 right-6 bg-black text-white px-4 py-1.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest">
          Highly Recommended
        </div>

        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#1A1A1A]">
              The premium route
            </span>
          </div>

          <h4 className="text-2xl font-sans font-extrabold text-[#1A1A1A] mb-8 tracking-tight">
            VikEdit
          </h4>

          <ul className="space-y-6">
            {vikEditPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-[#1A1A1A] font-sans font-semibold text-sm leading-relaxed">
                  {pt}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 pt-6 border-t border-[#E8E6E1] text-[11px] text-black font-mono font-bold tracking-wider uppercase">
          Embedded content infrastructure.
        </div>
      </div>
    </div>
  );
}
