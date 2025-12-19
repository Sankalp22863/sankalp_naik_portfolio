import { Code2, ExternalLink, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/types/projects";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label as Tag } from "@/components/ui/label"; 

type Props = { p: Project };

// deterministic color variants for tags (same tag -> same color)
const COLOR_VARIANTS = [
  "bg-sky-600/20 border-sky-400/40 text-sky-300",
  "bg-emerald-600/20 border-emerald-400/40 text-emerald-300",
  "bg-rose-600/20 border-rose-400/40 text-rose-300",
  "bg-amber-600/20 border-amber-400/40 text-amber-300",
  "bg-violet-600/20 border-violet-400/40 text-violet-300",
  "bg-indigo-600/20 border-indigo-400/40 text-indigo-300",
  "bg-lime-600/20 border-lime-400/40 text-lime-300",
  "bg-fuchsia-600/20 border-fuchsia-400/40 text-fuchsia-300",
];

function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function tagClass(tag: string) {
  const idx = hashString(tag) % COLOR_VARIANTS.length;
  return `rounded-xl px-3 py-1 text-xs font-medium border ${COLOR_VARIANTS[idx]}`;
}

export function ProjectCard({ p }: Props) {
  const [open, setOpen] = useState(false);
  const descId = `desc-${p.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`;

  return (
    // fill available height so the parent-measured wrapper controls size
    <Card key={p.title} className="px-6 pb-6 pt-4 h-full flex flex-col">
      {/* image removed */}
      <h4 className="font-semibold text-lg">{p.title}</h4>

      <div className="mt-1">
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          aria-controls={descId}
          className="rounded-xl px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 text-white/80 inline-flex items-center gap-2"
        >
          Description
          <ChevronDown size={14} className={`transform transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        <p
          id={descId}
          className={`text-sm text-white/80 transition-[max-height,opacity,margin] duration-200 ease-in-out ${open ? "max-h-[999px] opacity-100 mt-2 mb-3" : "max-h-0 opacity-0 overflow-hidden mt-0 mb-0"}`}
          aria-hidden={!open}
        >
          {p.desc}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {p.tags?.map((t) => (
          <Tag key={t} className={tagClass(t)}>
            {t}
          </Tag>
        ))}
      </div>

      {/* push actions to bottom so layout lines up across cards */}
      <div className="mt-auto flex gap-3">
        {p.codeUrl && (
          <Button asChild>
            <a href={p.codeUrl} target="_blank" rel="noreferrer">
                <Code2 size={16} />
                Code
            </a>
          </Button>
          
        )}
        {p.demoUrl && (
            <Button asChild variant="ghost">
                <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    Demo
                </a>
            </Button>
          
        )}
      </div>
    </Card>
  );
}
