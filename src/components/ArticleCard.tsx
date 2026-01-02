import React from "react";
import { ExternalLink, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface Article {
  title: string;
  description: string;
  link: string;
  date: string;
  readTime: string;
  tags?: string[];
}

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <motion.a
      href={article.link}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.02 }}
      className="block rounded-3xl border border-white/15 bg-white/5 backdrop-blur p-6 shadow-lg hover:shadow-xl transition-all h-full"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-semibold text-lg leading-tight flex-1">
            {article.title}
          </h4>
          <ExternalLink className="opacity-60 flex-shrink-0 ml-2" size={18} />
        </div>

        <p className="text-white/70 text-sm mb-4 flex-1">
          {article.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-white/60 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(article.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {article.readTime}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {article.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="backdrop-blur bg-white/5 border-white/10 text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.a>
  );
};