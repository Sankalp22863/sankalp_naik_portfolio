import React, { useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Code2, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { Card as Card1, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import { Typewriter } from 'react-simple-typewriter'
import Image from "next/image";
import FloatingParallaxCard from "@/components/FloatingParallaxCard";
import dynamic from "next/dynamic";
const HolidayCursor = dynamic(() => import("@/components/HolidayCursor"), { ssr: false });

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
    title: "M.S. (AIE – ECE)",
    org: "Carnegie Mellon University",
    years: "2025 – 2026",
    blurb:
      "Interests: Hardware-aware NAS, edge inference, systems for ML.",
    tags: ["Research", "Deep Learning", "Systems", "Robotics"],
  },
  {
    title: "B.Tech (ECE)",
    org: "VNIT",
    years: "2016 – 2020",
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
    years: "2022 – Present",
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

export default function Portfolio() {
  const projectsRef = useRef(null);

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

  return (
    <div className="dark min-h-screen text-white bg-[#0b0d12] [--ring:theme(colors.indigo.400)]">
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
              <Button href="#projects" icon={ExternalLink}>View My Work</Button>
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
            className="rounded-[28px] overflow-hidden border border-white/15 bg-white/5 backdrop-blur shadow-2xl"
          >
           
            <FloatingParallaxCard
              src="/res/SankalpNaik-removebg-preview.png"   // your image
              alt="Profile"
              fill                      // fills the parent div
              className="object-cover"  // scales + crops to fit
            />

            {/* <img
              src="/res/SankalpNaik-removebg-preview.png"
              alt="Desk setup with code"
              className="w-full h-[420px] object-cover"
            /> */}
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-7xl px-6 py-12">
        <h3 className="text-3xl font-bold mb-6">Skills</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center gap-3 mb-3"><Cpu className="opacity-80" /><h4 className="font-semibold">ML / AI</h4></div>
            <div className="flex flex-wrap gap-2">
              {['PyTorch','TensorFlow','Transformers','Scikit‑learn','RL','Computer Vision'].map(t=> <Tag key={t}>{t}</Tag>)}
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-3"><Code2 className="opacity-80" /><h4 className="font-semibold">Systems</h4></div>
            <div className="flex flex-wrap gap-2">
              {['Python','C++','FastAPI','Docker','Kubernetes','MLOps'].map(t=> <Tag key={t}>{t}</Tag>)}
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-3"><Cpu className="opacity-80" /><h4 className="font-semibold">Hardware</h4></div>
            <div className="flex flex-wrap gap-2">
              {['Raspberry Pi','CUDA','ONNX','Vitis HLS','Verilog (basics)'].map(t=> <Tag key={t}>{t}</Tag>)}
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-3"><Code2 className="opacity-80" /><h4 className="font-semibold">Cloud</h4></div>
            <div className="flex flex-wrap gap-2">
              {['AWS','GCP','CI/CD','Metrics','Tracing'].map(t=> <Tag key={t}>{t}</Tag>)}
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
  
      <div ref={projectsRef} className="overflow-x-auto -mx-6 px-6 pb-4" aria-label="Projects carousel">
        <div className="flex gap-6 w-max snap-x snap-mandatory items-stretch">
          {projects.map((p) => (
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
            <form className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <input className="rounded-xl bg-white/5 border border-white/15 px-3 py-2" placeholder="First Name" />
                <input className="rounded-xl bg-white/5 border border-white/15 px-3 py-2" placeholder="Last Name" />
              </div>
              <input className="rounded-xl bg-white/5 border border-white/15 px-3 py-2" placeholder="Email" />
              <input className="rounded-xl bg-white/5 border border-white/15 px-3 py-2" placeholder="Subject" />
              <textarea rows={5} className="rounded-xl bg-white/5 border border-white/15 px-3 py-2" placeholder="Tell me about the opportunity..." />
              <div>
                <Button icon={Mail}>Send Message</Button>
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
    </div>
  );
}
