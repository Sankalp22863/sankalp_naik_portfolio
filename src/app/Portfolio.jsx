'use client';
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Code2, Cpu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import { Card as Card1, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import { Typewriter } from 'react-simple-typewriter'
import Image from "next/image";
import FloatingParallaxCard from "@/components/FloatingParallaxCard";
import dynamic from "next/dynamic";
const HolidayCursor = dynamic(() => import("@/components/HolidayCursor"), { ssr: false });
import Analytics from "@/components/Analytics";

import projects from "@/data/projects.json";
import { ProjectCard } from "@/components/ProjectCard";

const Contributions = dynamic(() => import("@/components/Contributions"), {
  ssr: false, // render only on client to avoid hydration mismatch
});




/**
 * Single‑file React portfolio inspired by the screenshots.
 * TailwindCSS assumed. Default dark theme, glass buttons, white blur hero band,
 * shimmering title, sections: Skills, Projects, Experience, Contact, Footer.
 */

const Button = ({ children, href, icon: Icon, variant = "primary" }) => {
  const base =
    "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all border backdrop-blur";
  const styles =
    variant === "primary"
      ? "bg-white/10 border-white/20 hover:bg-white/15 text-white"
      : "bg-white/5 border-white/15 hover:bg-white/10 text-white";
  return href ? (
    <a className={`${base} ${styles}`} href={href} target="_blank" rel="noreferrer">
      {Icon && <Icon size={16} />}
      {children}
    </a>
  ) : (
    <button className={`${base} ${styles}`}>{Icon && <Icon size={16} />}{children}</button>
  );
};

const Tag = ({ children }) => (
  <span className="text-xs rounded-full border border-white/20 px-2 py-1 bg-white/5 text-white/80">{children}</span>
);

const Card = ({ children }) => (
  <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur p-6 shadow-lg">
    {children}
  </div>
);

// --- Education & Experience ---
const EDUCATION = [
  {
    title: "M.S. (Artificial Intelligence – ECE)",
    org: "Carnegie Mellon University",
    years: "2025 – 2026",
    blurb:
      "Interests: Hardware-aware NAS, edge inference, systems for ML.",
    tags: ["Research", "Deep Learning", "Systems", "Robotics"],
  },
  {
    title: "B.Tech (ECE)",
    org: "VNIT",
    years: "2018 – 2022",
    blurb:
      "Top of class; coursework in Algorithms, Signals, VLSI, ML.",
    awards: "Visvesvaraya National Institute Medal",
    tags: ["Algorithms", "Statistics", "Mathematics", "Programming"],
  },
];

const EXPERIENCE = [
  {
    title: "Associate Applications Developer",
    org: "Oracle Financial Services",
    years: "2022 – 2025",
    blurb:
      "Infra team for a banking platform; owned performance-critical components.",
    awards:"PaceSetter Award for exceptional performance at Oracle.",
    tags: ["Java", "JaxRS", "SQL", "Distributed Systems", "JPA"],
  },
  {
    title: "Research Assistant",
    org: "NEXUS Group Carnegie Mellon University",
    years: "2025 - Current",
    blurb:
      "Work on Hardware and software codesign for  processors.",
    tags: ["Python", "Verilog", "Cpp", "Git"],
  },
];

// Centralized opportunities content
const OPPORTUNITIES_CONTENT = {
  title: "Looking for Internship opportunities for Summer 2026!",
  roles: [
    "Machine Learning Engineering roles focused on on-device inference, model optimization, and hardware-aware ML systems, where tight integration between algorithms, software, and silicon is critical.",
    "Systems Engineering roles involving performance-critical software, accelerator/GPU optimization, and building reliable, scalable infrastructure that brings research ideas into production-quality systems."
  ],
  closingText: "Thank You!",
  popupTitle: "Looking for Opportunities In",
  popupRoles: [
    "Machine Learning Engineering roles focused on on-device inference, model optimization, and hardware-aware ML systems—where I can bridge the gap between research and production-ready solutions.",
    "Systems Engineering positions involving performance-critical software, GPU/accelerator optimization, and building robust infrastructure for AI/ML workloads at scale."
  ]
};

export default function Portfolio() {
  const projectsRef = useRef(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const [opportunitiesVisible, setOpportunitiesVisible] = useState(false);
  const [opportunitiesProgress, setOpportunitiesProgress] = useState(0);

  // Show after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setOpportunitiesVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-dismiss after 10 seconds with progress bar
  useEffect(() => {
    if (!opportunitiesVisible) {
      setOpportunitiesProgress(0);
      return;
    }
    const total = 10000;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / total) * 100);
      setOpportunitiesProgress(pct);
      if (elapsed >= total) {
        clearInterval(id);
        setOpportunitiesVisible(false);
        setOpportunitiesProgress(0);
      }
    }, 100);
    return () => clearInterval(id);
  }, [opportunitiesVisible]);

  const uniqueTags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags || []))).sort(),
    [projects]
  );

  const filteredProjects = useMemo(
    () =>
      selectedTags.length === 0
        ? projects
        : projects.filter((p) => selectedTags.every((t) => p.tags?.includes(t))),
    [projects, selectedTags]
  );

  function toggleTag(t) {
    setSelectedTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  useEffect(() => {
    if (!projectsRef.current) return;
    const container = projectsRef.current;

    const updateHeights = () => {
      const items = container.querySelectorAll(".project-measure");
      if (!items.length) return;

      // reset heights to measure natural heights
      items.forEach((el) => (el.style.height = "auto"));

      let max = 0;
      items.forEach((el) => {
        const h = el.getBoundingClientRect().height;
        if (h > max) max = h;
      });

      // set all to max
      items.forEach((el) => (el.style.height = `${max}px`));
    };

    // initial
    updateHeights();

    // resize
    window.addEventListener("resize", updateHeights);

    // observe DOM changes inside (e.g., collapse/expand)
    const observer = new MutationObserver(() => {
      // small timeout to wait for layout changes
      setTimeout(updateHeights, 30);
    });
    observer.observe(container, { subtree: true, childList: true, attributes: true });

    return () => {
      window.removeEventListener("resize", updateHeights);
      observer.disconnect();
    };
  }, []);

  const handleHeroTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const rotateY = (relX / rect.width) * 12;    // left/right
    const rotateX = -(relY / rect.height) * 12;  // up/down
    setHeroTilt({ x: rotateX, y: rotateY });
  };
  const resetHeroTilt = () => setHeroTilt({ x: 0, y: 0 });

  // Mouse tilt for GitHub card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const rotateY = (relX / rect.width) * 12;  // left/right
    const rotateX = -(relY / rect.height) * 12; // up/down
    setTilt({ x: rotateX, y: rotateY });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="dark min-h-screen text-white bg-[#0b0d12] [--ring:theme(colors.indigo.400)]">
      <Analytics />
      <HolidayCursor />
      {/* Top nav */}
      <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-[#0b0d12]/70">
        <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <a className="font-semibold tracking-tight text-white/90">Sankalp Naik</a>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
            {[
              ["Home", "#home"],
              ["Skills", "#skills"],
              ["Projects", "#projects"],
              ["Experience", "#experience"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="hover:text-white transition-colors">
                {label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        {/* right photo strip */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400&auto=format&fit=crop')] bg-cover bg-center opacity-40" />

        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10 items-center py-20">
          <div>
            <p className="text-white/70 mb-2">Hello, I'm</p>

            <div className="relative mb-3">
              {/* White blur band */}
              <div className="absolute inset-x-[-2rem] -inset-y-2 rounded-3xl bg-white/20 blur-2xl" />
              {/* Shimmer title */}
              <h1 className="relative font-extrabold text-5xl md:text-6xl leading-tight shimmering-text">
                Sankalp Naik
              </h1>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-left w-full">
              <Typewriter
                words={['AI/ML Engineer', 'Systems Engineer']}
                loop={0}             // 0 = infinite
                cursor
                cursorStyle="|"
                typeSpeed={80}       // typing speed in ms
                deleteSpeed={50}     // backspace speed
                delaySpeed={1500}    // wait before deleting
              />
            </h2>
            <p className="mt-4 text-white/80 max-w-xl">
              Passionate about intelligent systems, edge inference, and hardware‑aware ML. I love turning
              research into production—fast, reliable, and delightful.
            </p>
            

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="https://www.linkedin.com/in/sankalp-naik-ml/" icon={Linkedin}>Connect on LinkedIn</Button>
              <Button href={`/res/SankalpNaikResume.pdf`} variant="ghost" icon={Code2}>Download Resume</Button>
            </div>

            <div className="mt-6 flex items-center gap-4 text-white/70">
              <a href="https://github.com/Sankalp22863" className="hover:text-white" aria-label="GitHub"><Github /></a>
              <a href="https://www.linkedin.com/in/sankalp-naik-ml/" className="hover:text-white" aria-label="LinkedIn"><Linkedin /></a>
              <a href="mailto:sgnaik@andrew.cmu.edu" className="hover:text-white" aria-label="Email"><Mail /></a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onMouseMove={handleHeroTilt}
            onMouseLeave={resetHeroTilt}
            style={{
              transform: `perspective(1200px) rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg)`,
              transition: "transform 180ms ease-out",
            }}
            className="rounded-[28px] overflow-hidden border border-white/15 bg-white/5 backdrop-blur shadow-2xl"
          >
           
            <FloatingParallaxCard
              src="/res/SankalpNaik-removebg-preview.png"
              alt="Profile"
              fill
              className="object-cover"
            />

            {/* <img
              src="/res/SankalpNaik-removebg-preview.png"
              alt="Desk setup with code"
              className="w-full h-[420px] object-cover"
            /> */}
          </motion.div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-8 shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-4 text-center">{OPPORTUNITIES_CONTENT.title}</h3>
          <div className="max-w-3xl mx-auto space-y-3 text-white/80 text-center">
            {OPPORTUNITIES_CONTENT.roles.map((role, idx) => (
              <p key={idx} className="leading-relaxed">{role}</p>
            ))}
            <p className="leading-relaxed">{OPPORTUNITIES_CONTENT.closingText}</p>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="mx-auto max-w-7xl px-6 py-12">
        <h3 className="text-3xl font-bold mb-6">Skills</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center gap-3 mb-3"><Cpu className="opacity-80" /><h4 className="font-semibold">On Device and Applied ML</h4></div>
            <div className="flex flex-wrap gap-2">
              {['PyTorch','JAX','Core ML','Classic ML','LLM Benchmarking'].map(t=> <Tag key={t}>{t}</Tag>)}
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-3"><Code2 className="opacity-80" /><h4 className="font-semibold">Performance Critical Systems</h4></div>
            <div className="flex flex-wrap gap-2">
              {['C/C++(Performace Level Code)', "Java(JAX-RS)", 'Profiling and Debugging','CMAKE','LLVM/MLIR'].map(t=> <Tag key={t}>{t}</Tag>)}
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-3"><Cpu className="opacity-80" /><h4 className="font-semibold">Silicon Aware Computing</h4></div>
            <div className="flex flex-wrap gap-2">
              {['Computer Architecture','CUDA','ARM64/Apple Silicon','Hardware Software Codesign'].map(t=> <Tag key={t}>{t}</Tag>)}
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-3"><Code2 className="opacity-80" /><h4 className="font-semibold">Infrastructure and Reliability</h4></div>
            <div className="flex flex-wrap gap-2">
              {['Benchmarking','Observability','Distributed Systems Fundamentals','Fault Tolerance'].map(t=> <Tag key={t}>{t}</Tag>)}
            </div>
          </Card>
        </div>
      </section>

      {/* Experience*/}

      
      <section id='experience' className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Education */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Education</h3>
            <div className="space-y-6">
              {EDUCATION.map((item) => (
                <Card1 key={item.title} className="rounded-2xl border-border/60">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>
                      {item.org} • {item.years}
                      {/* Award Highlight */}
                      {item.awards && (
                        <div className="mt-4 flex items-center gap-2 text-amber-400">
                        <Award className="h-5 w-5" />
                        <span className="font-medium">{item.awards}</span>
                      </div>
                      )}
                      
              </CardDescription>
              
            </CardHeader>
            
            <CardContent className="text-muted-foreground">
              <p className="mb-3">{item.blurb}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <Badge key={t} variant="outline" className="backdrop-blur bg-white/5 border-white/10">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card1>
        ))}
      </div>
    </div>

    {/* Right: Experience */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Experience</h3>
        <div className="space-y-6">
          {EXPERIENCE.map((item) => (
            <Card key={item.title} className="rounded-2xl border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>
                  {item.org} • {item.years}
                  {/* Award Highlight */}
                  {item.awards && (
                    <div className="mt-4 flex items-center gap-2 text-amber-400">
                    <Award className="h-5 w-5" />
                    <span className="font-medium">{item.awards}</span>
                  </div>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-3">{item.blurb}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <Badge key={t} variant="outline" className="backdrop-blur bg-white/5 border-white/10">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>

    {/* Projects */}
    <section id="projects" className="mx-auto max-w-7xl px-6 py-12">
       <h3 className="text-3xl font-bold mb-6">Projects</h3>
      
      {/* Filters */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFilterOpen((s) => !s)}
            aria-expanded={filterOpen}
            className="rounded-lg px-3 py-1 bg-white/5 border border-white/10 text-sm inline-flex items-center gap-2"
          >
            Filters
            <ChevronDown size={14} className={`transform transition-transform ${filterOpen ? "rotate-180" : ""}`} />
          </button>
          <div className="text-sm text-white/70">{filteredProjects.length} projects</div>
        </div>
        {selectedTags.length > 0 && (
          <button className="text-sm text-rose-400" onClick={() => setSelectedTags([])}>
            Clear
          </button>
        )}
      </div>

      {filterOpen && (
        <div className="mb-6 p-3 bg-white/2 rounded-lg border border-white/10">
          <div className="flex flex-wrap gap-2">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-3 py-1 text-sm border ${
                  selectedTags.includes(tag)
                    ? "bg-indigo-600/20 border-indigo-400/40 text-indigo-300"
                    : "bg-white/5 border-white/10 text-white/80"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      <div ref={projectsRef} className="overflow-x-auto -mx-6 px-6 pb-4" aria-label="Projects carousel">
         <div className="flex gap-6 w-max snap-x snap-mandatory items-stretch">
          {filteredProjects.map((p) => (
             <div key={p.title} className="snap-start flex-shrink-0 w-[20rem]">
               {/* project-measure will be measured and sized to the max height */}
               <div className="project-measure h-auto">
                 <ProjectCard p={p} />
               </div>
             </div>
           ))}
         </div>
       </div>

    </section>

    {/* GitHub Contributions (before Footer) */}
      <section id="contributions" className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            style={{
              transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 180ms ease-out",
            }}
            className="relative rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-10 shadow-2xl overflow-hidden"
          >
            {/* Gradient glow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/12 via-transparent to-purple-500/12" />

            <div className="relative z-10 flex flex-col items-center gap-8">
              <h3 className="text-3xl font-bold text-center">GitHub Contributions</h3>

              <div className="w-full flex justify-center">
                <div className="inline-block">
                  <GitHubCalendar
                    username="Sankalp22863"
                    blockSize={12}
                    blockMargin={4}
                    fontSize={14}
                    colorScheme="dark"
                    theme={{
                      dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                    }}
                  />
                </div>
              </div>

              <Button
                href="https://github.com/Sankalp22863"
                icon={Github}
                variant="primary"
              >
                View GitHub Profile
              </Button>
            </div>

            {/* Ambient blur orbs */}
            <div className="absolute top-4 right-4 w-28 h-28 bg-indigo-500/15 rounded-full blur-3xl" />
            <div className="absolute bottom-4 left-4 w-28 h-28 bg-purple-500/15 rounded-full blur-3xl" />
          </motion.div>
        </motion.div>
      </section>
        

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-12">
        <h3 className="text-3xl font-bold mb-6">Get In Touch</h3>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <Card>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><Mail className="opacity-80"/><div><div className="text-white">sgnaik@andrew.cmu.edu</div><div className="text-white/70 text-sm">Email</div></div></div>
              <div className="flex items-center gap-3"><Phone className="opacity-80"/><div><div className="text-white">+1 (412) 608-7192</div><div className="text-white/70 text-sm">Phone</div></div></div>
              <div className="flex items-center gap-3"><MapPin className="opacity-80"/><div><div className="text-white">Pittsburgh, PA</div><div className="text-white/70 text-sm">Location</div></div></div>
              <div className="flex items-center gap-4 pt-2">
                <a href="https://github.com/Sankalp22863" className="hover:text-white text-white/80"><Github/></a>
                <a href="https://www.linkedin.com/in/sankalpnaik/" className="hover:text-white text-white/80"><Linkedin/></a>
                <a href="mailto:sgnaik@andrew.cmu.edu" className="hover:text-white text-white/80"><Mail/></a>
              </div>
            </div>
          </Card>
          <Card>
            <form
  className="grid gap-3"
  onSubmit={(e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const first = form.firstName.value.trim();
    const last = form.lastName.value.trim();
    const email = form.email.value.trim();
    const subj = form.subject.value.trim() || "Contact from portfolio";
    const msg = form.message.value.trim();

    const body = encodeURIComponent(
      `Name: ${first} ${last}\nEmail: ${email}\n\n${msg}`
    );

    window.location.href = `mailto:sgnaik@andrew.cmu.edu?subject=${encodeURIComponent(
      subj
    )}&body=${body}`;
  }}
>
  <div className="grid grid-cols-2 gap-3">
    <input name="firstName" className="rounded-xl bg-white/5 border border-white/15 px-3 py-2" placeholder="First Name" />
    <input name="lastName" className="rounded-xl bg-white/5 border border-white/15 px-3 py-2" placeholder="Last Name" />
  </div>
  <input name="email" required className="rounded-xl bg-white/5 border border-white/15 px-3 py-2" placeholder="Email" />
  <input name="subject" className="rounded-xl bg-white/5 border border-white/15 px-3 py-2" placeholder="Subject" />
  <textarea name="message" required rows={5} className="rounded-xl bg-white/5 border border-white/15 px-3 py-2" placeholder="Tell me about the opportunity..." />
  <div>
    <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 text-white px-4 py-2">
      Send Message
    </button>
  </div>
</form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="font-semibold">Sankalp Naik</div>
            <p className="text-white/70 mt-2">AI/ML engineer passionate about creating intelligent systems that make a positive impact.</p>
            <div className="flex items-center gap-4 mt-3 text-white/80">
              <Github/>
              <Linkedin/>
              <Mail/>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Quick Links</div>
            <ul className="space-y-1 text-white/80">
              <li><a href="#skills" className="hover:text-white">Skills</a></li>
              <li><a href="#projects" className="hover:text-white">Projects</a></li>
              <a href="#contributions"  className="hover:text-white">Contributions</a>    
              <li><a href="#experience" className="hover:text-white">Experience</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Get In Touch</div>
            <div className="text-white/80">sgnaik@andrew.cmu.edu</div>
            <div className="text-white/80">Pittsburgh, PA</div>
            <div className="text-white/80">Available for new opportunities</div>
          </div>
        </div>
        <div className="px-6 pb-10 text-center text-xs text-white/60">© {new Date().getFullYear()} Sankalp Naik. Made with ❤ and lots of coffee.</div>
      </footer>

      {/* Local CSS for shimmering text */}
      <style>{`
        .shimmering-text {
          background: linear-gradient(90deg, #fff, #b3c7ff, #fff);
          background-size: 200% 100%;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
      `}</style>

      {/* Opportunities Popup */}
      <AnimatePresence>
        {opportunitiesVisible && (
          <motion.div
            key="opportunities-modal"
            className="fixed inset-0 z-[85] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpportunitiesVisible(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-white/10 shadow-2xl text-white p-8"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{
                scale: 1,
                y: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 180, damping: 18 },
              }}
              exit={{ scale: 0.9, y: 12, opacity: 0, transition: { duration: 0.18 } }}
            >
              <button
                onClick={() => setOpportunitiesVisible(false)}
                className="absolute top-3 right-3 text-white/70 hover:text-white text-2xl"
                aria-label="Close"
              >
                ×
              </button>

              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold">{OPPORTUNITIES_CONTENT.title}</h2>
                <div className="max-w-xl mx-auto space-y-3 text-white/80">
                  {OPPORTUNITIES_CONTENT.roles.map((role, idx) => (
                    <p key={idx} className="leading-relaxed">{role}</p>
                  ))}
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <a
                    href="/res/SankalpNaikResume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400 transition-colors"
                  >
                    <Code2 size={16} />
                    Download Resume
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sankalp-naik-ml/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                  >
                    <Linkedin size={16} />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-[width] duration-100 ease-linear"
                  style={{ width: `${opportunitiesProgress}%` }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
