import React, { useState } from "react";
import { ExternalLink, FileText, Code2, Award, ChevronDown, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface ResearchPaper {
  title: string;
  authors: string[];
  venue: string;
  year: string;
  abstract: string;
  tags: string[];
  link: string;
  pdfLink?: string;
  code?: string;
  status: string;
  citations?: number;
  featured?: boolean;
}

interface ResearchCardProps {
  paper: ResearchPaper;
}

export const ResearchCard = ({ paper }: ResearchCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-emerald-500/20 border-emerald-400/40 text-emerald-300";
      case "Under Review":
        return "bg-amber-500/20 border-amber-400/40 text-amber-300";
      case "Preprint":
        return "bg-blue-500/20 border-blue-400/40 text-blue-300";
      default:
        return "bg-white/10 border-white/20 text-white/70";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-3xl border ${
        paper.featured
          ? "border-indigo-500/40 bg-gradient-to-br from-indigo-500/10 via-white/5 to-purple-500/10"
          : "border-white/15 bg-white/5"
      } backdrop-blur p-6 shadow-lg hover:shadow-xl transition-all relative overflow-hidden`}
    >
      {/* Featured Badge */}
      {paper.featured && (
        <div className="absolute top-4 right-4">
          <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 border-0 text-white flex items-center gap-1">
            <Award size={12} />
            Featured
          </Badge>
        </div>
      )}

      {/* Status Badge */}
      <div className="mb-4">
        <Badge className={`${getStatusColor(paper.status)} text-xs font-medium`}>
          {paper.status}
        </Badge>
      </div>

      {/* Title */}
      <h4 className="font-bold text-xl leading-tight mb-3 pr-20">
        {paper.title}
      </h4>

      {/* Authors */}
      <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
        <Users size={14} />
        <span>{paper.authors.join(", ")}</span>
      </div>

      {/* Venue & Year */}
      <div className="text-sm text-white/80 mb-4 font-medium">
        {paper.venue} • {paper.year}
        {paper.citations && (
          <span className="ml-3 text-white/60">
            📚 {paper.citations} citations
          </span>
        )}
      </div>

      {/* Abstract Preview/Full */}
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.p
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white/70 text-sm mb-4 line-clamp-2"
          >
            {paper.abstract}
          </motion.p>
        ) : (
          <motion.p
            key="full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-white/70 text-sm mb-4"
          >
            {paper.abstract}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-indigo-400 text-sm font-medium flex items-center gap-1 mb-4 hover:text-indigo-300 transition-colors"
      >
        {isExpanded ? "Show less" : "Read abstract"}
        <ChevronDown
          size={16}
          className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {paper.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="backdrop-blur bg-white/5 border-white/10 text-xs"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <a
          href={paper.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 text-sm font-medium transition-colors"
        >
          <FileText size={14} />
          View Paper
        </a>
        {paper.pdfLink && (
          <a
            href={paper.pdfLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 text-sm font-medium transition-colors"
          >
            <ExternalLink size={14} />
            PDF
          </a>
        )}
        {paper.code && (
          <a
            href={paper.code}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 text-sm font-medium transition-colors"
          >
            <Code2 size={14} />
            Code
          </a>
        )}
      </div>

      {/* Decorative gradient overlay for featured papers */}
      {paper.featured && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
      )}
    </motion.div>
  );
};