"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowRight, ExternalLink } from "lucide-react";
import { AGENT, getWhatsAppLink } from "@/lib/config";

// TYPE UPDATED: Menambahkan isInternalArticle, slug, dan membuat sourceUrl lebih jelas
interface Article {
  _id: string;
  title: string;
  slug?: string;
  excerpt: string;
  source: string;
  sourceUrl?: string;
  isInternalArticle?: boolean;
  category: string;
  date: string;
  imageUrl: string;
  featured?: boolean;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Innovation: { bg: "#06b6d4", text: "#fff" },
  Inovasi: { bg: "#06b6d4", text: "#fff" },
  Product: { bg: "#22c55e", text: "#fff" },
  Produk: { bg: "#22c55e", text: "#fff" },
  Promo: { bg: "#f59e0b", text: "#fff" },
  Review: { bg: "#8b5cf6", text: "#fff" },
  Event: { bg: "#ec4899", text: "#fff" },
};

export default function NewsFeedClient({ articles }: { articles: Article[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const article = articles[activeIdx];
  if (!articles.length) return null;

  const catStyle = CATEGORY_COLORS[article.category] ?? {
    bg: "#71717a",
    text: "#fff",
  };

  const askLink = getWhatsAppLink(
    `Hi ${AGENT.name}, I'd like more information about: "${article.title}"`,
  );

  // LOGIKA SMART LINKING BARU
  const isInternal = article.isInternalArticle;
  const readMoreLink =
    isInternal && article.slug
      ? `/news/${article.slug}`
      : article.sourceUrl || "#";
  const readMoreTarget = isInternal ? "_self" : "_blank";
  const readMoreRel = isInternal ? "" : "noopener noreferrer";

  return (
    <section id="berita" className="bg-zinc-950">
      {/* Tab strip */}
      <div className="flex items-center overflow-x-auto border-b border-white/10 px-6 md:px-12 hide-scrollbar">
        {articles.map((item, i) => (
          <button
            key={item._id}
            onClick={() => setActiveIdx(i)}
            className={`flex-shrink-0 py-3.5 px-5 text-[12px] font-bold tracking-wider transition-all border-b-2 -mb-px ${
              activeIdx === i
                ? "text-white border-cyan-500"
                : "text-white/40 border-transparent hover:text-white/70"
            }`}
          >
            {item.category.toUpperCase()} {String(i + 1).padStart(2, "0")}
          </button>
        ))}
        <div className="ml-auto flex-shrink-0 text-[10px] font-bold text-white/25 tracking-[0.12em] hidden md:block">
          NEWS &amp; UPDATES
        </div>
      </div>

      {/* Main card */}
      <div className="flex flex-col md:flex-row min-h-[400px] md:min-h-72 relative">
        <div className="flex-[0_0_44%] px-6 md:px-12 py-10 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[10px] font-black px-2.5 py-1 rounded-[4px] tracking-wider"
                  style={{ background: catStyle.bg, color: catStyle.text }}
                >
                  {article.category.toUpperCase()}
                </span>
                <span className="text-[12px] text-white/40">
                  {article.date}
                </span>
                {/* Tampilkan Sumber */}
                {!isInternal && article.source && (
                  <span className="text-[12px] text-cyan-400 font-semibold truncate max-w-[120px]">
                    via {article.source}
                  </span>
                )}
              </div>
              <h3 className="text-[20px] md:text-[22px] font-black text-white leading-[1.25] tracking-tight mb-3">
                {article.title}
              </h3>
              <p className="text-[13px] text-white/55 leading-relaxed line-clamp-3 md:line-clamp-none">
                {article.excerpt}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-7">
            {/* Tombol Tanya Sales (Tetap ada) */}
            <motion.a
              href={askLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#09090b] text-[13px] font-bold px-5 py-2.5 rounded-full transition-colors"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <MessageCircle size={14} />
              Ask Sales
            </motion.a>

            {/* Tombol Baca Selengkapnya (Dinamis!) */}
            {readMoreLink !== "#" && (
              <a
                href={readMoreLink}
                target={readMoreTarget}
                rel={readMoreRel}
                className="flex items-center gap-2 border border-white/20 hover:border-white/50 text-white/80 hover:text-white text-[13px] font-semibold px-5 py-2.5 rounded-full transition-all"
              >
                {isInternal
                  ? "Read Article"
                  : `Read on ${article.source || "Web"}`}
                {isInternal ? (
                  <ArrowRight size={13} />
                ) : (
                  <ExternalLink size={13} />
                )}
              </a>
            )}
          </div>
        </div>

        {/* Image Display */}
        <div className="flex-1 relative overflow-hidden min-h-[250px] md:min-h-0 order-first md:order-last">
          <AnimatePresence mode="wait">
            <motion.div
              key={article._id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {article.imageUrl && (
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 56vw"
                />
              )}
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950/80 via-zinc-950/20 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-5 right-6 md:left-12 md:right-auto flex gap-1.5 z-10">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              aria-label={`News ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: activeIdx === i ? 20 : 6,
                background:
                  activeIdx === i ? "#06b6d4" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
