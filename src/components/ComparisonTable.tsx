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
      <div className="hidden md:flex bg-stone-50 border border-stone-200 p-8 md:p-12 rounded-3xl flex-col justify-between transition-all duration-300 hover:shadow-xs">
        <div>
          <span className="text-xs uppercase font-sans font-bold tracking-widest text-stone-500 block mb-2">
            The standard way
          </span>
          <h4 className="text-2xl font-sans font-bold text-stone-700 mb-8 tracking-tight">
            Traditional Editors
          </h4>
          
          <ul className="space-y-6">
            {otherPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 border border-stone-200">
                  <X className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-stone-600 font-sans text-sm leading-relaxed">{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 pt-6 border-t border-stone-200 text-[11px] text-stone-400 font-sans font-medium tracking-wider">
          🚫 Legacy workflows
        </div>
      </div>

      {/* Right side: VikEdit (Premium container) */}
      <div className="bg-[#FAF9FF] border-2 border-blue-600 p-8 md:p-12 rounded-3xl flex flex-col justify-between relative shadow-[0_12px_45px_rgba(59,130,246,0.06)] hover:shadow-[0_16px_50px_rgba(59,130,246,0.12)] transition-all duration-300">
        {/* Recommended pill badge */}
        <div className="absolute -top-3.5 right-6 bg-[#013AE0] text-white px-4 py-1.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest shadow-lg">
          Highly Recommended
        </div>

        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#013AE0]">
              The premium route
            </span>
          </div>

          <h4 className="text-2xl font-sans font-extrabold mb-8 tracking-tight bg-gradient-to-b from-[#3B82F6] to-[#013AE0] bg-clip-text text-transparent">
            VikEdit
          </h4>

          <ul className="space-y-6">
            {vikEditPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#013AE0] text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-stone-900 font-sans font-bold text-sm leading-relaxed">
                  {pt}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 pt-6 border-t border-stone-200 text-[11px] text-[#013AE0] font-sans font-extrabold tracking-wider uppercase">
          Embedded content infrastructure.
        </div>
      </div>
    </div>
  );
}
