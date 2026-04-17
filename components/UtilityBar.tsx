"use client";

import { Key, Calculator, ArrowRight } from "lucide-react";
import { AGENT, getWhatsAppLink } from "@/lib/config"; // Sesuaikan path utils Anda

export default function UtilityBar() {
  const tdLink = getWhatsAppLink(
    `Hello ${AGENT.name}, I would like to schedule a test drive.`,
  );
  const simLink = getWhatsAppLink(
    `Hello ${AGENT.name}, I need a finance simulation for a Geely vehicle.`,
  );

  return (
    <section className="bg-white border-t border-zinc-200 pt-16 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Test Drive */}
          <a
            href={tdLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative bg-zinc-50 border border-zinc-200 rounded-[20px] p-8 overflow-hidden transition-all hover:bg-zinc-100 hover:border-zinc-300 hover:shadow-lg"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform translate-x-4 -translate-y-4">
              <Key size={120} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                <Key size={20} className="text-cyan-600" />
              </div>
              <h3 className="text-[20px] font-black text-zinc-900 tracking-tight mb-2">
                Book a Test Drive
              </h3>
              <p className="text-[14px] text-zinc-500 mb-6">
                Experience the premium comfort and intelligent technology of
                Geely firsthand.
              </p>
              <span className="inline-flex items-center gap-2 text-[13px] font-bold text-cyan-600 group-hover:text-cyan-700">
                Schedule Now{" "}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </div>
          </a>

          {/* Card 2: Finance */}
          <a
            href={simLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative bg-[#09090b] border border-zinc-800 rounded-[20px] p-8 overflow-hidden transition-all hover:bg-black hover:shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform translate-x-4 -translate-y-4">
              <Calculator size={120} color="white" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-zinc-800/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-zinc-700 mb-6">
                <Calculator size={20} className="text-cyan-400" />
              </div>
              <h3 className="text-[20px] font-black text-white tracking-tight mb-2">
                Finance Calculator
              </h3>
              <p className="text-[14px] text-zinc-400 mb-6">
                Get a personalized financing plan with competitive rates and
                flexible terms.
              </p>
              <span className="inline-flex items-center gap-2 text-[13px] font-bold text-white group-hover:text-cyan-400">
                Calculate Installment{" "}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
