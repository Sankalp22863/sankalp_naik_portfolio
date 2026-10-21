"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import academic from "@/data/academic.json";
import projects from "@/data/projects.json";
import research from "@/data/research.json";
import articles from "@/data/articles.json";
import styles from "./academic.module.css";

const GitHubCalendar = dynamic(() => import("react-github-calendar"), {
  ssr: false,
  loading: () => <p>Loading GitHub contributions…</p>,
});

const sections = [
  ["Research", "research"],
  ["Publications", "publications"],
  ["Experience", "experience"],
  ["Education", "education"],
  ["Teaching", "teaching"],
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Honors & Awards", "awards"],
  ["Tech Reads", "articles"],
  ["GitHub Contributions", "contributions"],
  ["Contact", "contact"],
];

const allProjects = [...academic.projects, ...projects];
const projectTags = [...new Set(allProjects.flatMap((project) => project.tags))].sort();

function SocialLinks() {
  return (
    <div className={styles.socialLinks}>
      <a href="/res/AcademicCV.pdf">CV</a>
      <a href="https://github.com/Sankalp22863" aria-label="GitHub"><Github size={19} /></a>
      <a href="https://www.linkedin.com/in/sankalp-naik-ml/" aria-label="LinkedIn"><Linkedin size={19} /></a>
      <a href="mailto:sgnaik@andrew.cmu.edu" aria-label="Email"><Mail size={19} /></a>
    </div>
  );
}

function ContactDetails() {
  return (
    <address className={styles.contactDetails}>
      <div><Mail size={16} aria-hidden="true" /><a href="mailto:sgnaik@andrew.cmu.edu">sgnaik@andrew.cmu.edu</a></div>
      <div><Phone size={16} aria-hidden="true" /><a href="tel:+14126087192">+1 (412) 608-7192</a></div>
      <div><MapPin size={16} aria-hidden="true" /><span>Pittsburgh, PA</span></div>
      <SocialLinks />
    </address>
  );
}

export default function AcademicPortfolio() {
  const [selectedTags, setSelectedTags] = useState([]);
  const filteredProjects = allProjects.filter((project) => selectedTags.every((tag) => project.tags.includes(tag)));

  function toggleTag(tag) {
    setSelectedTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]);
  }

  function sendMessage(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = `${form.get("firstName").trim()} ${form.get("lastName").trim()}`.trim();
    const subject = form.get("subject").trim() || "Contact from portfolio";
    const body = `Name: ${name}\nEmail: ${form.get("email").trim()}\n\n${form.get("message").trim()}`;
    window.location.href = `mailto:sgnaik@andrew.cmu.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className={styles.site} id="home">
      <a className={styles.skipLink} href="#main">Skip to content</a>
      <header className={styles.header}>
        <nav className={styles.topNav} aria-label="Main navigation">
          <a className={styles.brand} href="#home">Sankalp Naik</a>
          <div>
            <a href="#research">Academic</a>
            <a href="#projects">Projects</a>
            <a href="#articles">Articles</a>
            <a href="/res/AcademicCV.pdf">CV</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <Image className={styles.portrait} src="/res/SankalpNaik.png" alt="Sankalp Naik" width={240} height={360} priority />
          <nav aria-label="Page sections">
            <ul>{sections.map(([label, id]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul>
          </nav>
          <a className={styles.cvLink} href="/res/AcademicCV.pdf" download>Download Academic CV</a>
          <a className={styles.cvLink} href="/res/SankalpNaikResume.pdf" download>Download Resume</a>
        </aside>

        <main className={styles.main} id="main">
          <section className={styles.intro} aria-labelledby="name">
            <h1 id="name">Sankalp Naik</h1>
            <p className={styles.subtitle}>M.S. Artificial Intelligence Engineering (ECE), Carnegie Mellon University</p>
            <div className={styles.introColumns}>
              <div className={styles.biography}>
                <p>I’m a master’s student at Carnegie Mellon University and a graduate research assistant in the NEXUS Research Group, advised by Prof. Tathagata Srimani. My research spans heterogeneous memory systems, hardware–software co-design, and compiler-guided optimization for ML workloads.</p>
                <p>Previously, I was an Associate Applications Developer at Oracle Financial Services. I received my B.Tech in Electronics &amp; Communication Engineering from VNIT, graduating first in my class.</p>
                <p>Passionate about intelligent systems, edge inference, and hardware-aware ML. I love turning research into production—fast, reliable, and delightful.</p>
              </div>
              <ContactDetails />
            </div>
          </section>

          <section id="research" className={styles.section}>
            <h2>Research</h2>
            <p><strong>Research interests.</strong> {academic.interests}</p>
            <details className={styles.vision}><summary>Research vision</summary><p>{academic.vision}</p></details>
            {academic.research.map((work) => (
              <article className={styles.entry} key={work.title}>
                <h3>{work.title}</h3>
                <p className={styles.meta}>{work.status}</p>
                <p>{work.details[0]}</p>
                <details><summary>Research details</summary><ul>{work.details.slice(1).map((detail) => <li key={detail}>{detail}</li>)}</ul></details>
              </article>
            ))}
            <p className={styles.patent}><strong>Patent pending:</strong> “XBM: Heterogeneous 3D-stacked high-bandwidth memory with non-volatile base dies.”</p>
          </section>

          <section id="publications" className={styles.section}>
            <h2>Publications</h2>
            {[...research].sort((first, second) => Number(second.year) - Number(first.year)).map((paper) => (
              <article className={styles.entry} key={paper.title}>
                <h3><a href={paper.link}>{paper.title}</a></h3>
                <p className={styles.meta}>{paper.authors.join(", ")}. <em>{paper.venue}</em>, {paper.year}. {paper.status}.</p>
                {paper.award && <p className={styles.award}>{paper.award}</p>}
                <details><summary>Abstract</summary><p>{paper.abstract}</p><p className={styles.meta}>{paper.tags.join(" · ")}</p></details>
                <a className={styles.resourceLink} href={paper.link}>[Paper]</a>
              </article>
            ))}
          </section>

          <section id="experience" className={styles.section}>
            <h2>Experience</h2>
            {academic.experience.map((position) => (
              <article className={styles.entry} key={position.title}>
                <div className={styles.entryHeading}><h3>{position.title}</h3><span>{position.dates}</span></div>
                <p className={styles.organization}>{position.organization}</p>
                <p>{position.description}</p>
                {position.award && <p className={styles.award}>{position.award}</p>}
                <p className={styles.meta}>{position.technologies}</p>
              </article>
            ))}
          </section>

          <section id="education" className={styles.section}>
            <h2>Education</h2>
            {academic.education.map((degree) => (
              <article className={styles.entry} key={degree.title}>
                <div className={styles.entryHeading}><h3>{degree.organization}</h3><span>{degree.dates}</span></div>
                <p className={styles.organization}>{degree.title} · {degree.location}</p>
                <p>{degree.details}</p>
                <p><strong>Selected coursework:</strong> {degree.coursework}</p>
              </article>
            ))}
          </section>

          <section id="teaching" className={styles.section}>
            <h2>Teaching</h2>
            {academic.teaching.map((position) => (
              <article className={styles.entry} key={position.title}>
                <div className={styles.entryHeading}><h3>{position.title}</h3><span>{position.dates}</span></div>
                <p className={styles.organization}>Carnegie Mellon University</p>
                <p>{position.description}</p>
              </article>
            ))}
          </section>

          <section id="projects" className={styles.section}>
            <h2>Projects</h2>
            <div className={styles.projectControls}>
              <details className={styles.filters}><summary>Filter by topic</summary>
                <div className={styles.tags}>{projectTags.map((tag) => <button type="button" key={tag} aria-pressed={selectedTags.includes(tag)} onClick={() => toggleTag(tag)}>{tag}</button>)}</div>
              </details>
              <span className={styles.meta} role="status">{filteredProjects.length} projects</span>
              {selectedTags.length > 0 && <button type="button" className={styles.clearButton} onClick={() => setSelectedTags([])}>Clear filters</button>}
            </div>
            {filteredProjects.length === 0 && <p>No projects match all selected topics. Clear filters to see all projects.</p>}
            {filteredProjects.map((project) => (
              <article className={styles.entry} key={project.title}>
                <h3>{project.codeUrl ? <a href={project.codeUrl}>{project.title}</a> : project.title}</h3>
                <p>{project.desc}</p>
                {project.title === "Fault-Tolerant Distributed System" && <p>Active/passive replication with checkpointing and heartbeat-based failure detection.</p>}
                <p className={styles.meta}>{project.tags.join(" · ")}</p>
                {project.codeUrl && <a className={styles.resourceLink} href={project.codeUrl}>[Code]</a>}
                {project.demoUrl && <a className={styles.resourceLink} href={project.demoUrl}>[Demo]</a>}
              </article>
            ))}
          </section>

          <section id="skills" className={styles.section}>
            <h2>Technical Skills</h2>
            <dl className={styles.skills}>{academic.skills.map((skill) => <div key={skill.category}><dt>{skill.category}</dt><dd>{skill.items}</dd></div>)}</dl>
          </section>

          <section id="awards" className={styles.section}>
            <h2>Honors &amp; Awards</h2>
            <ul>{academic.awards.map((award) => <li key={award}>{award}</li>)}</ul>
          </section>

          <section id="articles" className={styles.section}>
            <h2>Tech Reads</h2>
            {articles.map((article) => (
              <article className={styles.entry} key={article.title}>
                <h3><a href={article.link}>{article.title}</a></h3>
                <p className={styles.meta}>{article.date} · {article.readTime} · {article.tags.join(" · ")}</p>
                <p>{article.description}</p>
                <a href={article.link} className={styles.resourceLink}>[Read on Medium]</a>
              </article>
            ))}
          </section>

          <section id="contributions" className={styles.section}>
            <h2>GitHub Contributions</h2>
            <div className={styles.calendar}><GitHubCalendar username="Sankalp22863" colorScheme="light" blockSize={10} blockMargin={3} fontSize={13} /></div>
            <a href="https://github.com/Sankalp22863">View GitHub Profile</a>
          </section>

          <section id="contact" className={styles.section}>
            <h2>Get In Touch</h2>
            <p>Available for new opportunities. <a href="https://www.linkedin.com/in/sankalp-naik-ml/">Connect on LinkedIn</a> or send me a message.</p>
            <div className={styles.contactColumns}>
              <ContactDetails />
              <form className={styles.form} onSubmit={sendMessage}>
                <div className={styles.nameFields}>
                  <label>First Name<input name="firstName" autoComplete="given-name" /></label>
                  <label>Last Name<input name="lastName" autoComplete="family-name" /></label>
                </div>
                <label>Email<input name="email" type="email" autoComplete="email" required /></label>
                <label>Subject<input name="subject" /></label>
                <label>Message<textarea name="message" rows={4} placeholder="Tell me about the opportunity…" required /></label>
                <div><button type="submit">Send Message</button><p className={styles.meta}>Opens your email app with your message.</p></div>
              </form>
            </div>
          </section>

          <footer className={styles.footer}>
            <p>AI/ML engineer passionate about creating intelligent systems that make a positive impact.</p>
            <p>© {new Date().getFullYear()} Sankalp Naik. Made with ❤ and lots of coffee. <a href="#home">Back to top ↑</a></p>
          </footer>
        </main>
      </div>
    </div>
  );
}
