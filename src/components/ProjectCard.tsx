import { Code2, ExternalLink, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/types/projects";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label as Tag } from "@/components/ui/label"; 

type Props = { p: Project };

export function ProjectCard({ p }: Props) {
  const [open, setOpen] = useState(false);
  const descId = `desc-${p.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`;

  return (
    <Card key={p.title} className="px-6 pb-6 pt-4">
      <img
        src={p.img}
        alt={p.title}
        className="rounded-2xl mb-4 h-40 w-full object-cover"
        loading="lazy"
      />
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
          <Tag key={t} className="rounded-xl px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 text-white/80">
              {t}
           </Tag>
        ))}
      </div>

      <div className="flex gap-3">
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
