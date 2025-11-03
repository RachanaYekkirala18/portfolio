"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Terminal,
  Rocket,
  Zap,
  Database,
  GraduationCap,
  User,
  FileDown,
  PenSquare,
} from "lucide-react";

// --- Types for section keys & refs ---
const NAV_KEYS = [
  "home",
  "about",
  "projects",
  "skills",
  "experience",
  "education",
  "contact",
] as const;

type SectionKey = typeof NAV_KEYS[number];
type SectionRef = React.MutableRefObject<HTMLDivElement | null>;
type SectionMap = Record<SectionKey, SectionRef>;

export default function Portfolio() {
  const resumeUrl = "https://drive.google.com/your-resume-link";
  const githubUrl = "https://github.com/RachanaYekkirala18";
  const mediumUrl = "https://medium.com/@rachana18apr";
  const linkedinUrl = "https://www.linkedin.com/in/venkata-rachana-213748350/";

  const [activeSection, setActiveSection] = useState<SectionKey>("home");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const fullText = "Data Engineer / Analyst";

  // Refs
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
 
  const contactRef = useRef<HTMLDivElement>(null);

  const sections: SectionMap = {
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    skills: skillsRef,
    experience: experienceRef,
    education: educationRef,
   
    contact: contactRef,
  };

  const handleNavClick = (key: SectionKey) => {
    setActiveSection(key);
    sections[key]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Typing effect
  useEffect(() => {
    if (displayText.length < fullText.length) {
      const t = setTimeout(() => setDisplayText(fullText.slice(0, displayText.length + 1)), 70);
      return () => clearTimeout(t);
    } else {
      setIsTyping(false);
    }
  }, [displayText]);

  // Cursor-follow blob
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Active section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id as SectionKey;
            if (id && NAV_KEYS.includes(id)) setActiveSection(id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] }
    );

    NAV_KEYS.forEach((k) => sections[k].current && observer.observe(sections[k].current!));
    return () => observer.disconnect();
  }, []);

  // -------- Projects (curated) --------
  const projects = useMemo(
    () => [
      {
        title: "AWS Data Lakehouse Pipeline",
        tech: [
          "AWS S3",
          "Glue (PySpark)",
          "Step Functions",
          "Lambda",
          "Athena",
          "QuickSight",
          "Redshift",
          "SQL",
        ],
        description:
          "Batch + event-driven ingestion, medallion layers, serverless orchestration.",
        gradient: "from-amber-600 to-yellow-600",
        icon: <Database className="w-12 h-12" />,
        link: `${githubUrl}/aws-data-lakehouse-pipeline`,
      },
      {
        title: "IEEE-CIS Fraud Detection",
        tech: ["Python", "Pandas", "Feature Engineering", "XGBoost/LightGBM", "Scikit-learn"],
        description: "EDA → preprocessing → training pipeline for fraud scoring.",
        gradient: "from-yellow-700 to-amber-600",
        icon: <Zap className="w-12 h-12" />,
        link: `${githubUrl}/IEEE-CIS-Fraud-Detection`,
      },
      {
        title: "Netflix Content Strategy Analysis",
        tech: ["Python", "PySpark", "SQL", "Tableau", "Power BI"],
        description:
          "ETL/ELT and analytics on catalog to assess genres and releases.",
        gradient: "from-amber-500 to-yellow-600",
        icon: <Terminal className="w-12 h-12" />,
        link: `${githubUrl}/Netflix_Content_Strategy_Analysis`,
      },
      {
        title: "Flight Delay Analysis (Spark)",
        tech: ["Apache Spark", "PySpark", "MongoDB", "Python", "SQL"],
        description: "Distributed processing and features for delay insights.",
        gradient: "from-stone-600 to-amber-600",
        icon: <Rocket className="w-12 h-12" />,
        link: `${githubUrl}/Fligth-Delay-Analysis`,
      },
      {
        title: "Synthetic Data Generator (GenAI)",
        tech: ["Python", "Transformers", "Faker", "Pandas"],
        description:
          "Config-driven synthetic tabular data with LLM prompts + rules.",
        gradient: "from-amber-700 to-stone-600",
        icon: <Database className="w-12 h-12" />,
        link: `${githubUrl}/Synthetic_Data_Generator_Using_GenAI`,
      },
      {
        title: "Financial Data Analysis",
        tech: ["Python", "Pandas", "Matplotlib", "Time Series", "SQL"],
        description: "Exploratory and factor-style analysis with charts.",
        gradient: "from-yellow-700 to-amber-700",
        icon: <Database className="w-12 h-12" />,
        link: `${githubUrl}/Financial-Data-Analysis`,
      },
      {
        title: "UBC Ovarian Cancer ML",
        tech: ["Python", "EDA", "Scikit-learn", "Imbalanced Data"],
        description: "Health domain classification and evaluation.",
        gradient: "from-stone-700 to-amber-500",
        icon: <GraduationCap className="w-12 h-12" />,
        link: `${githubUrl}/UBC-Ovarian-Cancer`,
      },
      {
        title: "Stock Price Prediction",
        tech: ["Python", "Scikit-learn", "Regression", "Time Series"],
        description: "Baseline ML with robust validation.",
        gradient: "from-stone-700 to-yellow-700",
        icon: <Terminal className="w-12 h-12" />,
        link: `${githubUrl}/Stock-Price-Prediction`,
      },
      {
        title: "Power BI Gallery",
        tech: ["Power BI", "DAX", "Data Modeling", "Visualization"],
        description:
          "Selected BI reports with clean star schemas and measures.",
        gradient: "from-amber-700 to-stone-700",
        icon: <PenSquare className="w-12 h-12" />,
        link: `${githubUrl}/Power-Bi`,
      },
      {
        title: "EDA Projects",
        tech: ["Jupyter", "Pandas", "Seaborn", "Statistics"],
        description: "Cleaning, profiling, and insight notebooks.",
        gradient: "from-stone-600 to-yellow-700",
        icon: <Terminal className="w-12 h-12" />,
        link: `${githubUrl}/EDA_Projects`,
      },
      {
        title: "UMBC DATA606 Capstone",
        tech: ["Python/R", "Statistical Modeling", "Visualization"],
        description: "Graduate capstone with reproducible analysis.",
        gradient: "from-stone-800 to-amber-700",
        icon: <GraduationCap className="w-12 h-12" />,
        link: `${githubUrl}/UMBC-DATA606-Capstone`,
      },
    ],
    []
  );

  const bgClass = "bg-gradient-to-br from-[#faf7f2] via-[#fdfbf8] to-[#ffffff]";
  const orbColors = ["bg-amber-200/30", "bg-amber-100/30"];

  return (
    <div
      className={`min-h-screen ${bgClass} text-gray-800 overflow-x-hidden scroll-smooth relative text-lg md:text-xl`}
    >
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] bg-black/10" />
        <div
          className={`absolute w-[30rem] h-[30rem] ${orbColors[0]} rounded-full blur-3xl`}
          style={{
            left: `${cursorPos.x - 240}px`,
            top: `${cursorPos.y - 240}px`,
            transition: "all 0.25s ease-out",
          }}
        />
        <div
          className={`absolute top-1/3 right-1/3 w-[28rem] h-[28rem] ${orbColors[1]} rounded-full blur-3xl`}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-md bg-white/60 text-gray-800 rounded-full px-6 py-3 border border-amber-200/60 shadow-md">
        <div className="flex gap-6 items-center text-base md:text-2xl">
          {NAV_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => handleNavClick(key)}
              className={`capitalize transition-all ${
                activeSection === key
                  ? "text-amber-700 font-semibold"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </nav>

      {/* Content wrapper */}
      <div className="relative z-10 px-6 2xl:px-24 pt-28 pb-20 max-w-[120rem] mx-auto space-y-28">
        {/* Home */}
        <section
          id="home"
          ref={homeRef}
          className="min-h-[85vh] flex flex-col justify-center items-center text-center gap-8"
        >
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full blur-xl opacity-50" />
              <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center border-4 border-white/40 overflow-hidden">
                <div className="w-full h-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-700" />
                  <span className="absolute bottom-4 text-[10px] text-gray-600">
                    Add Your Photo
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl text-amber-700/90">Hey there! I am</h2>
            <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-400 bg-clip-text text-transparent">
              Venkata Rachana Yekkirala
            </h1>
          </div>

          <div className="flex items-center justify-center gap-3 text-3xl md:text-4xl text-gray-700">
            <Database className="w-7 h-7 text-amber-500" />
            <span className="font-mono">
              {displayText}
              {isTyping && <span className="animate-pulse">|</span>}
            </span>
          </div>

          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Code. Cloud. Curiosity. That’s my stack.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => handleNavClick("projects")}
              className="group relative px-7 py-3.5 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full font-semibold hover:scale-105 transition-all shadow-lg shadow-amber-400/20"
            >
              <span className="flex items-center gap-2">
                View Projects
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 border-2 border-amber-400 rounded-full font-semibold hover:bg-amber-50 hover:scale-105 transition-all"
            >
              <span className="flex items-center gap-2">
                <FileDown className="w-6 h-6" /> Get Resume
              </span>
            </a>

            <a
              href={mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 border-2 border-amber-300 rounded-full font-semibold hover:bg-amber-50 hover:scale-105 transition-all"
            >
              <span className="flex items-center gap-2">
                <PenSquare className="w-6 h-6" /> Medium
              </span>
            </a>
          </div>
        </section>

        {/* About */}
        <section id="about" ref={aboutRef} className="space-y-12">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-center mb-6 bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Reduced-size photo */}
            <div className="relative flex justify-center">
              <div className="absolute w-[32rem] h-[32rem] bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl blur-xl opacity-40" />
              <div className="relative w-[32rem] h-[32rem] rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center border-4 border-white/50 overflow-hidden">
                <div className="w-full h-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <User className="w-100 h-100 text-gray-700" />
                  <span className="absolute bottom-4 text-2xl text-gray-700">
                    Your Photo Here
                  </span>
                </div>
              </div>
            </div>

           <div className="space-y-6 text-3xl text-gray-700 leading-relaxed text-justify">
  <p>
    Hi, I’m  a passionate
    <span className="font-semibold text-amber-700"> Data Engineer</span> and
    <span className="font-semibold text-amber-700"> Analyst</span> who loves turning raw,
    complex data into meaningful insights and intelligent systems.
  </p>

  <p>
    I build reliable, scalable data pipelines and analytics-ready models using
    <span className="font-semibold text-amber-700"> AWS</span>, 
    <span className="font-semibold text-amber-700"> GCP</span>, and 
    <span className="font-semibold text-amber-700"> PySpark</span> — focusing on clean architecture,
    automation, and real-time processing that drives smarter business decisions.
  </p>

  <p>
    With a Master’s in Data Science from the University of Maryland, Baltimore County (UMBC)
    and experience as a Project Engineer at Wipro, I enjoy working across every layer of the data
    ecosystem — from ingestion and transformation to visualization and analytics.
  </p>

  <p>
    Outside of work, I’m constantly exploring new tools, designing data projects, and sharing my
    learning journey through blogs and dashboards. My goal is simple — to build systems that make
    data reliable, accessible, and truly impactful.
  </p>
</div>

          </div>
        </section>

        {/* Projects (with increased fonts) */}
        <section
          id="projects"
          ref={projectsRef}
          className="space-y-20 py-16"
        >
          <h2 className="text-5xl sm:text-6xl font-extrabold text-center mb-12 bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
            {projects.map((p, idx) => (
              <div
                key={idx}
                className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-10 border border-amber-200 hover:border-amber-400 transition-all duration-300 hover:scale-[1.05] shadow-lg hover:shadow-xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity`}
                />
                <div className="relative z-10 space-y-6">
                  <div
                    className={`w-24 h-24 bg-gradient-to-br ${p.gradient} rounded-2xl flex items-center justify-center mb-4`}
                  >
                    {/* ensure icon color & size */}
                    {React.cloneElement(p.icon, { className: "w-14 h-14 text-white" })}
                  </div>

                  <h3 className="text-3xl font-extrabold text-gray-900 leading-snug">
                    {p.title}
                  </h3>

                  <p className="text-xl text-gray-700 leading-relaxed font-medium">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {p.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-2 bg-white/80 rounded-full text-base font-medium border border-amber-200 shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-amber-700 hover:text-amber-600 pt-4 text-lg font-semibold"
                  >
                    View on GitHub <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" ref={skillsRef} className="space-y-16 py-8">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-center mb-10 bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
            Technical Arsenal
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-6">
            {[
              {
                category: "Cloud & Big Data",
                icon: "☁️",
                skills: ["AWS S3", "AWS Glue", "Lambda", "Redshift", "EMR", "Apache Spark", "Hadoop"],
                color: "from-amber-600 to-yellow-600",
              },
              {
                category: "Programming",
                icon: "💻",
                skills: ["Python", "SQL", "PySpark", "PL/SQL", "HiveQL", "Shell"],
                color: "from-yellow-600 to-amber-700",
              },
              {
                category: "Data Warehousing",
                icon: "🏗️",
                skills: ["Snowflake", "Redshift", "Data Modeling", "Schema Design", "ETL/ELT"],
                color: "from-stone-500 to-amber-700",
              },
              {
                category: "ETL & Orchestration",
                icon: "🔄",
                skills: ["AWS Glue", "Informatica", "Talend", "Airflow", "Step Functions"],
                color: "from-stone-600 to-amber-600",
              },
              {
                category: "Databases",
                icon: "🗄️",
                skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Oracle"],
                color: "from-stone-600 to-yellow-600",
              },
              {
                category: "Visualization",
                icon: "📊",
                skills: ["Tableau", "Power BI", "QuickSight", "Storytelling"],
                color: "from-amber-700 to-stone-700",
              },
            ].map((c, idx) => (
              <div
                key={idx}
                className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-10 border border-amber-200 hover:border-amber-400 transition-all duration-300 hover:scale-[1.03] shadow-lg"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity`}
                />
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-4xl md:text-5xl">{c.icon}</span>
                    <h3 className="text-2xl font-bold text-gray-900">{c.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {c.skills.map((s, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-white/70 rounded-full text-sm md:text-base font-medium border border-amber-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" ref={experienceRef} className="space-y-16 py-8">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-center mb-10 bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
            Professional Experience
          </h2>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-10 border border-amber-200 shadow-lg">
            <div className="flex items-start justify-between gap-6 mb-6">
              <div>
                <h3 className="text-3xl font-bold text-amber-800">
                  Project Engineer – Data Engineering
                </h3>
                <p className="text-2xl text-gray-900 mt-2">Wipro Limited</p>
                <p className="text-lg text-gray-600 mt-1">Hyderabad, India</p>
              </div>
              <span className="text-gray-600 text-lg">May 2021 – Jun 2022</span>
            </div>
            <ul className="space-y-3 text-gray-700 text-2xl leading-relaxed list-disc pl-6">
              <li>
                Architected 15+ scalable ETL/ELT pipelines using Python, PySpark, and Apache Hive,
                processing 10M+ records daily.
              </li>
              <li>
                Improved data ingestion performance by 40% and reliability by 30% via partitioning &
                checkpointing.
              </li>
              <li>
                Optimized 100+ SQL queries, cutting execution time by 35% through indexing and
                partitioning.
              </li>
              <li>
                Implemented data quality frameworks ensuring 99.5% accuracy across pipelines.
              </li>
              <li>Built Flask REST APIs for real-time analytical data delivery to BI tools.</li>
              <li>
                Reduced incident resolution time by 45% via proactive monitoring and RCA playbooks.
              </li>
            </ul>
          </div>
          
        </section>

        {/* Education */}
        <section id="education" ref={educationRef} className="space-y-16 py-8">
          <h2 className="text-5xl font-bold text-center mb-10 text-gray-800">Education</h2>

<div className="bg-white/80 backdrop-blur-md rounded-3xl p-10 border border-amber-200">
  <div className="space-y-10">
    {/* Master's */}
    <div className="flex items-start gap-5">
      <GraduationCap className="w-10 h-10 text-amber-700 flex-shrink-0 mt-1" />
      <div className="w-full">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              Master of Professional Studies in Data Science
            </p>
            <p className="text-lg text-gray-700">
              University of Maryland, Baltimore County (UMBC)
            </p>
          </div>
          <div className="text-gray-600 sm:text-right text-lg">
            Aug 2022 – May 2024
          </div>
        </div>
      </div>
    </div>

    {/* Bachelor's */}
    <div className="flex items-start gap-5">
      <GraduationCap className="w-10 h-10 text-amber-700 flex-shrink-0 mt-1" />
      <div className="w-full">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              Bachelor in Electronics & Communication Engineering
            </p>
            <p className="text-lg text-gray-700">
              Marri Laxman Reddy Institute of Technology
            </p>
          </div>
          <div className="text-gray-600 sm:text-right text-lg">
            Aug 2018 – Aug 2020
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </section>

   

        {/* Contact */}
        <section id="contact" ref={contactRef} className="space-y-10">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-center mb-4 bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
            Let's Connect
          </h2>

          <p className="text-center text-xl text-gray-700">
            If you have any questions or opportunities, feel free to reach out. I'm open to
            freelance, full-time roles, and consulting.
          </p>

          {/* Direct email form */}
          <form
  action="https://api.web3forms.com/submit"
  method="POST"
  className="max-w-xl mx-auto bg-white/80 backdrop-blur-md border border-amber-200 rounded-2xl p-8 shadow-md space-y-4"
>
  {/* REQUIRED: get a free access key at https://web3forms.com */}
  <input type="hidden" name="access_key" value="02904bcd-b726-4531-922b-9c8162e1a138" />
  {/* Optional: redirect on success */}
  <input type="hidden" name="redirect" value="https://rachana18apr@gmail.com/thanks" />
  {/* Optional: nicer email formatting */}
  <input type="hidden" name="from_name" value="Rachana Portfolio" />
  {/* Honeypot anti-spam */}
  <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

  <input
    type="text"
    name="name"
    placeholder="Your Name"
    required
    className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
  />
  <input
    type="email"
    name="email"
    placeholder="Your Email"
    required
    className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
  />
  <textarea
    name="message"
    rows={4}
    placeholder="Your Message"
    required
    className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
  />
  <button
    type="submit"
    className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
  >
    Send Message
  </button>
</form>


          <div className="flex flex-col items-center gap-3 pt-2">
            <a
              href="mailto:rachana18apr@gmail.com"
              className="flex items-center gap-2 text-amber-700 hover:underline"
            >
              <Mail className="w-5 h-5" /> rachana18apr@gmail.com
            </a>
            <div className="flex items-center gap-2 text-gray-800">
              <span className="text-lg">📍</span>
              <span className="text-base md:text-lg">Maryland, USA</span>
            </div>
            <div className="flex gap-4 pt-2">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 border border-amber-200 rounded-full hover:bg-amber-50"
              >
                <Github className="w-5 h-5" /> GitHub
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 border border-amber-200 rounded-full hover:bg-amber-50"
              >
                <Linkedin className="w-5 h-5" /> LinkedIn
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 border border-amber-200 rounded-full hover:bg-amber-50"
              >
                <FileDown className="w-5 h-5" /> Resume
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-sm text-gray-600 border-t border-amber-100 bg-white/70 backdrop-blur-sm">
        Made with ❤️ by Rachana
      </footer>
    </div>
  );
}
