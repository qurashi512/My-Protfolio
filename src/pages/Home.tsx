import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, ChevronDown, Star, Code2, Globe, HardDrive, CheckCircle2, Quote } from "lucide-react";

// ─── Typewriter ────────────────────────────────────────────────────────────
function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && display.length < word.length) {
      timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), 80);
    } else if (!deleting && display.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && display.length > 0) {
      timeout = setTimeout(() => setDisplay(display.slice(0, -1)), 40);
    } else {
      setDeleting(false);
      setIdx((i) => i + 1);
    }
    return () => clearTimeout(timeout);
  }, [display, deleting, idx, words]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#06B6D4]">
      {display}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// ─── Animated Section ──────────────────────────────────────────────────────
function AnimSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={ref} id={id} className={`${className} transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {children}
    </section>
  );
}

function SectionTitle({ en, de, ar }: { en: string; de: string; ar: string }) {
  const { language } = useLanguage();
  const label = language === "de" ? de : language === "ar" ? ar : en;
  return (
    <div className="text-center mb-14">
      <h2 className="font-['Sora'] text-3xl md:text-4xl font-bold text-[#F1F5F9] mb-3">{label}</h2>
      <div className="w-16 h-1 bg-gradient-to-r from-[#6366F1] to-[#06B6D4] rounded-full mx-auto" />
    </div>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────
function Hero() {
  const { t, language } = useLanguage();
  const typeWords = language === "de"
    ? ["Junior Android-Entwickler", "Webentwickler", "IT-Spezialist", "Problemlöser"]
    : language === "ar"
    ? ["مطور أندرويد مبتدئ", "مطور ويب", "متخصص تقنية معلومات", "حلال مشكلات"]
    : ["Junior Android Developer", "Web Developer", "IT Specialist", "Problem Solver"];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#6366F1]/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#06B6D4]/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMzMzQxNTUiIG9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==')] opacity-40" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E293B] border border-[#334155]/60 text-[#94A3B8] text-sm mb-8 backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          {t("hero.tag")}
        </div>

        {/* Name */}
        <h1 className="font-['Sora'] text-5xl md:text-7xl font-bold text-[#F1F5F9] mb-4 leading-tight">
          Gorashe <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#06B6D4]">Suliman</span>
        </h1>

        {/* Typewriter */}
        <div className="font-['Sora'] text-xl md:text-2xl font-medium text-[#94A3B8] mb-6 h-8">
          <Typewriter words={typeWords} />
        </div>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-[#94A3B8] text-base md:text-lg leading-relaxed mb-10">
          {t("hero.desc")}
        </p>

        {/* Buttons */}
        <div className={`flex flex-wrap gap-3 justify-center mb-10 ${language === "ar" ? "flex-row-reverse" : ""}`}>
          <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#06B6D4] text-white font-semibold
              hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300" data-testid="btn-view-projects">
            {t("hero.btn.projects")}
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-6 py-3 rounded-xl border border-[#334155] text-[#F1F5F9] font-semibold hover:border-[#6366F1]/60
              hover:bg-white/5 hover:scale-105 transition-all duration-300" data-testid="btn-contact">
            {t("hero.btn.contact")}
          </a>
          <a href="cv/Gorashe_Suliman_CV_EN.pdf" download
            className="px-6 py-3 rounded-xl border border-[#334155] text-[#94A3B8] font-medium hover:border-[#334155]/80
              hover:bg-white/5 transition-all duration-300 text-sm" data-testid="btn-cv-en">
            CV (EN)
          </a>
          <a href="cv/Gorashe_Suliman_CV_DE.pdf" download
            className="px-6 py-3 rounded-xl border border-[#334155] text-[#94A3B8] font-medium hover:border-[#334155]/80
              hover:bg-white/5 transition-all duration-300 text-sm" data-testid="btn-cv-de">
            Lebenslauf (DE)
          </a>
        </div>

        {/* Socials */}
        <div className="flex items-center justify-center gap-4">
          {[
            { href: "https://github.com/qurashi512", icon: Github, label: "GitHub" },
            { href: "https://linkedin.com/in/qurashi512", icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:gorashe.suliman@outlook.com", icon: Mail, label: "Email" },
          ].map(({ href, icon: Icon, label }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
              aria-label={label} data-testid={`link-social-${label.toLowerCase()}`}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-[#94A3B8] hover:text-[#F1F5F9]
                bg-[#1E293B] border border-[#334155]/40 hover:border-[#6366F1]/50 hover:shadow-lg hover:shadow-indigo-500/20
                hover:scale-110 transition-all duration-300">
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[#334155]">
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────
function About() {
  const { language } = useLanguage();
  const base = import.meta.env.BASE_URL;

  const text = language === "de"
    ? "Ich habe einen unkonventionellen Karrierewechsel vollzogen — von der Medizin zur Technologie — weil ich daran glaube, Dinge zu bauen, die echte Probleme lösen. Heute entwickle ich Android-Apps mit Kotlin und Weblösungen mit modernen Tools und erweitere ständig die Grenzen meiner Möglichkeiten. Mein Ziel ist es, diese Leidenschaft und technische Grundlage in einem professionellen Umfeld in Deutschland einzubringen."
    : language === "ar"
    ? "قمت بتحول مهني غير تقليدي — من الطب إلى التقنية — لأنني أؤمن ببناء أشياء تحل مشكلات حقيقية. اليوم أطور تطبيقات أندرويد بـ Kotlin وحلول ويب بأدوات حديثة، وأتوسع باستمرار في حدود ما أستطيع إنشاؤه. هدفي هو إحضار هذا الشغف والأساس التقني إلى بيئة عمل احترافية في ألمانيا."
    : "I made an unconventional career switch — from medicine to technology — because I believe in building things that solve real problems. Today I develop Android apps with Kotlin and web solutions with modern tools, constantly pushing the boundaries of what I can create. My goal is to bring this passion and technical foundation to a professional environment in Germany.";

  const subtitle = language === "de" ? "Von Medizin zu Technologie" : language === "ar" ? "من الطب إلى التقنية" : "From Medicine to Technology";

  const infoCards = [
    { icon: "📍", label: language === "ar" ? "الموقع" : language === "de" ? "Standort" : "Location", value: "Cairo, Egypt → Germany 🇩🇪" },
    { icon: "🗣️", label: language === "ar" ? "اللغات" : language === "de" ? "Sprachen" : "Languages", value: language === "ar" ? "العربية (أصيلة) · الإنجليزية (B1) · الألمانية (B2)" : language === "de" ? "Arabisch (Muttersp.) · Englisch (B1) · Deutsch (B2)" : "Arabic (Native) · English (B1) · German (B2)" },
    { icon: "🎓", label: language === "ar" ? "التعليم" : language === "de" ? "Bildung" : "Education", value: language === "ar" ? "جامعة حلوان (جامعة العاصمة)" : "Helwan University (Capital University)" },
  ];

  return (
    <AnimSection id="about" className="py-24 bg-[#111827]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionTitle en="About Me" de="Über mich" ar="عني" />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo + text */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-44 h-44 rounded-2xl overflow-hidden border-2 border-[#6366F1]/40 shadow-xl shadow-indigo-500/20">
                <img
                  src={`${base}images/profile-photo.jpg`}
                  alt="Gorashe Suliman"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#06B6D4]
                flex items-center justify-center text-white font-bold text-xs shadow-lg">GS</div>
            </div>
            <div>
              <span className="font-['Sora'] text-sm font-semibold text-[#6366F1] block mb-3 uppercase tracking-widest">{subtitle}</span>
              <p className="text-[#94A3B8] text-base leading-relaxed">{text}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {infoCards.map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 p-4 rounded-xl bg-[#1E293B]/60 border border-[#334155]/40
                hover:border-[#6366F1]/30 transition-all duration-300">
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-[#F1F5F9] text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimSection>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────
function Services() {
  const { language } = useLanguage();
  const services = [
    {
      icon: Code2,
      en: { title: "Android Development", desc: "Native Android apps using Kotlin & Jetpack Compose. Clean architecture, Google OAuth, YouTube API integration." },
      de: { title: "Android-Entwicklung", desc: "Native Android-Apps mit Kotlin & Jetpack Compose. Saubere Architektur, Google OAuth, YouTube-API-Integration." },
      ar: { title: "تطوير أندرويد", desc: "تطبيقات أندرويد أصيلة باستخدام Kotlin و Jetpack Compose. معمارية نظيفة، تكامل Google OAuth وYouTube API." },
      color: "from-[#6366F1] to-[#818CF8]",
      glow: "hover:shadow-indigo-500/20",
    },
    {
      icon: Globe,
      en: { title: "Web Development", desc: "Full-stack web applications with Python/Flask, HTML, CSS, JavaScript. Responsive, accessible, and performant." },
      de: { title: "Webentwicklung", desc: "Full-Stack-Webanwendungen mit Python/Flask, HTML, CSS, JavaScript. Responsiv, zugänglich und performant." },
      ar: { title: "تطوير الويب", desc: "تطبيقات ويب متكاملة باستخدام Python/Flask وHTML وCSS وJavaScript. متجاوبة وسريعة وسهلة الوصول." },
      color: "from-[#06B6D4] to-[#38BDF8]",
      glow: "hover:shadow-cyan-500/20",
    },
    {
      icon: HardDrive,
      en: { title: "IT Support & Linux", desc: "System administration, networking (TCP/IP, DNS), hardware troubleshooting, and Linux environments." },
      de: { title: "IT-Support & Linux", desc: "Systemadministration, Netzwerke (TCP/IP, DNS), Hardware-Fehlerbehebung und Linux-Umgebungen." },
      ar: { title: "دعم تقني وLinux", desc: "إدارة الأنظمة والشبكات (TCP/IP, DNS) واستكشاف أعطال الأجهزة وبيئات Linux." },
      color: "from-[#A855F7] to-[#C084FC]",
      glow: "hover:shadow-purple-500/20",
    },
  ];

  return (
    <AnimSection id="services" className="py-24 bg-[#0A0E1A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle en="What I Do" de="Was ich tue" ar="ماذا أفعل" />
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => {
            const content = language === "de" ? s.de : language === "ar" ? s.ar : s.en;
            return (
              <div key={s.en.title}
                className={`p-6 rounded-2xl bg-[#1E293B]/60 border border-[#334155]/40 hover:border-[#334155]/80
                  hover:shadow-xl ${s.glow} backdrop-blur-sm transition-all duration-300 hover:-translate-y-1`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-['Sora'] text-lg font-semibold text-[#F1F5F9] mb-3">{content.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{content.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimSection>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────
function Projects() {
  const { language } = useLanguage();
  const base = import.meta.env.BASE_URL;

  const featuredLabel = language === "de" ? "Ausgezeichnetes Projekt" : language === "ar" ? "مشروع مميز" : "Featured Project";
  const viewGH = language === "de" ? "Auf GitHub" : language === "ar" ? "على GitHub" : "View on GitHub";
  const readDoc = language === "de" ? "Dokumentation" : language === "ar" ? "التوثيق" : "Read Docs";
  const tryDemo = language === "de" ? "Live Demo" : language === "ar" ? "جرب التطبيق" : "Try Live Demo";
  const sectionKeys = {
    problem: language === "de" ? "Problem" : language === "ar" ? "المشكلة" : "Problem Statement",
    why: language === "de" ? "Warum ich es gebaut habe" : language === "ar" ? "لماذا بنيته" : "Why I Built It",
    challenges: language === "de" ? "Herausforderungen" : language === "ar" ? "التحديات" : "Challenges",
    tech: language === "de" ? "Technologien" : language === "ar" ? "التقنيات المستخدمة" : "Tech Stack",
    keyFeatures: language === "de" ? "Hauptfunktionen" : language === "ar" ? "الميزات الرئيسية" : "Key Features",
  };

  const sorttubeProblem = language === "de"
    ? "YouTube bietet keine integrierte Möglichkeit, Kanäle und Playlists in Ordner zu organisieren. Power-User mit 100+ Abonnements finden keine Struktur."
    : language === "ar"
    ? "يوتيوب لا يوفر طريقة لتنظيم القنوات داخل مجلدات. المستخدمون النشطون الذين لديهم 100+ اشتراك لا يجدون أي تنظيم — فقط قائمة فوضوية."
    : "YouTube has no built-in way to organize subscribed channels into custom folders. Power users with 100+ subscriptions have no structure — just an endless, chaotic list.";

  const sorttubeBuild = language === "de"
    ? "Ich hatte dasselbe Problem — 200+ YouTube-Abonnements ohne Möglichkeit zur Gruppierung. Also baute ich SortTube, die App, die ich haben wollte."
    : language === "ar"
    ? "كنت أعاني من نفس المشكلة. أكثر من 200 اشتراك بيوتيوب ولا طريقة لتجميعها. فبنيت SortTube — التطبيق الذي أردته لكن لم أجده في المتجر."
    : "I had the same problem — 200+ YouTube subscriptions and no way to group them. So I built SortTube, the app I wanted but couldn't find on the Play Store.";

  const sorttubeChallenge = language === "de"
    ? "OAuth-Token-Verwaltung über Sessions, Room-Datenbankmigrationen mit Kontoisolierung, flüssiges Drag-and-Drop mit ItemTouchHelper."
    : language === "ar"
    ? "إدارة OAuth tokens عبر الجلسات، ترحيل قاعدة بيانات Room مع عزل الحسابات، تنفيذ سحب وإفلات سلس."
    : "OAuth token handling across sessions, Room database migrations with account isolation, implementing smooth drag-and-drop with ItemTouchHelper.";

  const sorttubeFeatures = language === "de"
    ? ["Google OAuth-Anmeldung mit YouTube API v3", "Ordner für Kanäle & Playlists", "Drag-and-Drop-Neuordnung", "Glassmorphism-UI, Dunkel/Hell-Modus", "Arabisch & Englisch mit RTL-Unterstützung", "Kontobezogene Datenisolierung"]
    : language === "ar"
    ? ["تسجيل الدخول بـ Google OAuth مع YouTube API v3", "مجلدات للقنوات وقوائم التشغيل", "سحب وإفلات لإعادة الترتيب", "واجهة Glassmorphism مع الوضع الداكن/الفاتح", "دعم العربية والإنجليزية مع RTL", "عزل البيانات لكل حساب"]
    : ["Google OAuth sign-in with YouTube API v3", "Custom folders for channels & playlists", "Drag-and-drop reordering", "Glassmorphism UI with dark/light mode", "Full Arabic & English with RTL support", "Per-account data isolation"];

  const expenseTitle = language === "de" ? "Expense Tracker" : "Expense Tracker";
  const expenseDesc = language === "de"
    ? "Eine Full-Stack-Ausgabenverwaltungs-App, entwickelt als Harvard CS50-Abschlussprojekt. Transaktionen verfolgen, Analysen anzeigen, Budgets verwalten."
    : language === "ar"
    ? "تطبيق ويب متكامل لتتبع النفقات، بُني كمشروع تخرج من هارفارد CS50. تتبع المعاملات، عرض التحليلات، إدارة الميزانيات."
    : "A full-stack expense tracking web app built as my Harvard CS50 final project. Track transactions, view analytics, and manage budgets with Python/Flask.";

  const sorttubeTech = ["Kotlin", "Jetpack Compose", "Android SDK", "YouTube API v3", "Google OAuth 2.0", "Room DB", "Hilt (DI)", "Retrofit"];
  const expenseTech = ["Python", "Flask", "SQL", "HTML5", "CSS3", "JavaScript"];

  return (
    <AnimSection id="projects" className="py-24 bg-[#111827]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle en="Featured Projects" de="Ausgewählte Projekte" ar="أبرز المشاريع" />

        {/* SortTube — Featured */}
        <div className="relative mb-10 p-6 md:p-8 rounded-2xl bg-[#1E293B]/80 border border-[#6366F1]/30
          shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-300 backdrop-blur-sm">
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#6366F1] to-[#06B6D4]
            text-white text-xs font-bold flex items-center gap-1.5">
            <Star className="w-3 h-3" /> {featuredLabel}
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
            
              <div className="flex items-center gap-3">
              <img
                src={`${base}images/sorttube-icon.webp`}
                alt="SortTube Icon"
                className="w-14 h-14 rounded-2xl object-cover shadow-lg shadow-red-500/25 flex-shrink-0"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  const fallback = document.createElement('div');
                  fallback.className =
                    'w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-2xl shadow-lg flex-shrink-0';
                  fallback.textContent = '▶';
                  img.parentNode?.replaceChild(fallback, img);
                }}
              />
              <div>
                <h3 className="font-['Sora'] text-2xl font-bold text-[#F1F5F9]">SortTube</h3>
                <p className="text-[#94A3B8] text-sm">
                  {language === "de"
                    ? "Android-Mobilanwendung · Mai 2026"
                    : language === "ar"
                    ? "تطبيق أندرويد · مايو 2026"
                    : "Android Mobile Application · May 2026"}
                </p>
              </div>
            </div>
            {/* Screenshots */}
            <div className="flex gap-2 ms-auto">
              <div className="w-24 h-16 rounded-lg overflow-hidden border border-[#334155]/40">
                <img src={`${base}images/sorttube-home.png`} alt="SortTube Home" loading="lazy"
                  className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }} />
              </div>
              <div className="w-24 h-16 rounded-lg overflow-hidden border border-[#334155]/40">
                <img src={`${base}images/sorttube-channels.png`} alt="SortTube Channels" loading="lazy"
                  className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }} />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {[
              { label: sectionKeys.problem, text: sorttubeProblem },
              { label: sectionKeys.why, text: sorttubeBuild },
              { label: sectionKeys.challenges, text: sorttubeChallenge },
            ].map(({ label, text }) => (
              <div key={label} className="p-4 rounded-xl bg-[#0A0E1A]/60 border border-[#334155]/40">
                <p className="text-xs font-bold text-[#6366F1] uppercase tracking-wider mb-2">{label}</p>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mb-6">
            <p className="text-xs font-bold text-[#6366F1] uppercase tracking-wider mb-3">{sectionKeys.keyFeatures}</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {sorttubeFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2 text-[#94A3B8] text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#6366F1] flex-shrink-0" /> {f}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
  {[
    { n: "8", l: language === "ar" ? "ميزات أساسية" : language === "de" ? "Kernfunktionen" : "Core Features" },
    { n: "8", l: language === "ar" ? "تقنيات" : language === "de" ? "Technologien" : "Tech Stack" },
    { n: "2", l: language === "ar" ? "لغات" : language === "de" ? "Sprachen" : "Languages" },
    { n: "Android", l: language === "ar" ? "المنصة" : language === "de" ? "Plattform" : "Platform" },
  ].map(({ n, l }) => (
    <div key={l} className="text-center p-3 rounded-xl bg-[#0A0E1A]/60 border border-[#334155]/40">
      <p className="font-['Sora'] text-base font-bold text-[#6366F1] break-words">{n}</p>
      <p className="text-[#94A3B8] text-xs mt-0.5 leading-tight">{l}</p>
    </div>
  ))}
</div>

          {/* Tech Stack */}
          <div className="mb-6">
            <p className="text-xs font-bold text-[#6366F1] uppercase tracking-wider mb-3">{sectionKeys.tech}</p>
            <div className="flex flex-wrap gap-2">
              {sorttubeTech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-lg bg-[#0A0E1A] border border-[#334155]/60 text-[#94A3B8] font-['JetBrains_Mono',monospace] text-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            <a href="https://qurashi512.github.io/SortTube/" target="_blank" rel="noopener noreferrer"
              data-testid="btn-sorttube-demo"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#06B6D4]
                text-white font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300">
              <ExternalLink className="w-4 h-4" /> {tryDemo}
            </a>
            <a href="https://github.com/qurashi512/SortTube" target="_blank" rel="noopener noreferrer"
              data-testid="btn-sorttube-github"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#334155] text-[#F1F5F9] font-semibold text-sm
                hover:border-[#6366F1]/50 hover:bg-white/5 transition-all duration-300">
              <Github className="w-4 h-4" /> {viewGH}
            </a>
            <a href="https://github.com/qurashi512/SortTube/blob/main/README.md" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#334155] text-[#94A3B8] font-semibold text-sm
                hover:border-[#334155]/80 hover:bg-white/5 transition-all duration-300">
              <ExternalLink className="w-4 h-4" /> {readDoc}
            </a>
          </div>
        </div>

        {/* Expense Tracker */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#1E293B]/60 border border-[#334155]/40
          hover:border-[#334155]/80 hover:shadow-xl hover:shadow-black/20 transition-all duration-300">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] text-xs font-bold">CS50</span>
                <span className="text-[#94A3B8] text-xs">
                  {language === "ar" ? "مشروع تخرج" : language === "de" ? "Abschlussprojekt" : "Final Project"}
                </span>
              </div>
              <h3 className="font-['Sora'] text-xl font-bold text-[#F1F5F9]">{expenseTitle}</h3>
              <p className="text-[#94A3B8] text-sm mt-1">
                {language === "de" ? "Full-Stack-Webanwendung · Apr 2026" : language === "ar" ? "تطبيق ويب متكامل · أبريل 2026" : "Full-Stack Web Application · Apr 2026"}
              </p>
            </div>
          </div>
          <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">{expenseDesc}</p>
          {/* Desktop screenshot */}
          <div className="rounded-xl overflow-hidden border border-[#334155]/40 mb-5 max-h-40">
            <img src={`${base}images/expense-tracker-desktop.png`} alt="Expense Tracker" loading="lazy"
              className="w-full object-cover object-top"
              onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }} />
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {expenseTech.map((t) => (
              <span key={t} className="px-3 py-1 rounded-lg bg-[#0A0E1A] border border-[#334155]/60 text-[#94A3B8] font-['JetBrains_Mono',monospace] text-xs">{t}</span>
            ))}
          </div>
          <a href="https://github.com/qurashi512/Expense-Tracker" target="_blank" rel="noopener noreferrer"
            data-testid="btn-expense-github"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#334155] text-[#F1F5F9] font-semibold text-sm
              hover:border-[#6366F1]/50 hover:bg-white/5 transition-all duration-300">
            <Github className="w-4 h-4" /> {viewGH}
          </a>
        </div>
      </div>
    </AnimSection>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────
function Skills() {
  const { language } = useLanguage();
  const cats = [
    {
      en: "Mobile Development", de: "Mobile-Entwicklung", ar: "تطوير الجوال",
      color: "border-[#6366F1]/40 hover:border-[#6366F1]/70",
      badge: "bg-[#6366F1]/10 text-[#818CF8] border-[#6366F1]/30",
      skills: ["Kotlin", "Jetpack Compose", "Android SDK", "Room DB", "Hilt (DI)", "Retrofit"],
    },
    {
      en: "Web Development", de: "Webentwicklung", ar: "تطوير الويب",
      color: "border-[#06B6D4]/40 hover:border-[#06B6D4]/70",
      badge: "bg-[#06B6D4]/10 text-[#38BDF8] border-[#06B6D4]/30",
      skills: ["HTML5", "CSS3", "JavaScript", "Python", "Flask", "SQL"],
    },
    {
      en: "IT & Systems", de: "IT & Systeme", ar: "تقنية المعلومات والأنظمة",
      color: "border-[#A855F7]/40 hover:border-[#A855F7]/70",
      badge: "bg-[#A855F7]/10 text-[#C084FC] border-[#A855F7]/30",
      skills: ["Linux", "Bash", "TCP/IP", "DNS", "Networking", "Hardware"],
    },
    {
      en: "Tools & Platforms", de: "Tools & Plattformen", ar: "الأدوات والمنصات",
      color: "border-[#F59E0B]/40 hover:border-[#F59E0B]/70",
      badge: "bg-[#F59E0B]/10 text-[#FCD34D] border-[#F59E0B]/30",
      skills: ["Git", "GitHub", "VS Code", "Android Studio"],
    },
  ];

  return (
    <AnimSection id="skills" className="py-24 bg-[#0A0E1A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle en="Technical Skills" de="Technische Fähigkeiten" ar="المهارات التقنية" />
        <div className="grid sm:grid-cols-2 gap-6">
          {cats.map((cat) => {
            const label = language === "de" ? cat.de : language === "ar" ? cat.ar : cat.en;
            return (
              <div key={cat.en} className={`p-6 rounded-2xl bg-[#1E293B]/60 border transition-all duration-300 ${cat.color}`}>
                <h3 className="font-['Sora'] text-base font-semibold text-[#F1F5F9] mb-4">{label}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span key={s} className={`px-3 py-1.5 rounded-lg border text-xs font-['JetBrains_Mono',monospace] font-medium ${cat.badge}`}>{s}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimSection>
  );
}

// ─── TOP CERTS ────────────────────────────────────────────────────────────
function TopCerts() {
  const { t, language } = useLanguage();
  const verifyLabel = language === "de" ? "Verifizieren" : language === "ar" ? "التحقق" : "Verify";

  const certs = [
    {
      title: "Google IT Support Professional Certificate",
      issuer: language === "de" ? "Google (via Coursera)" : language === "ar" ? "Google (عبر Coursera)" : "Google (via Coursera)",
      date: language === "de" ? "Nov. 2025 – Apr. 2026" : language === "ar" ? "نوفمبر 2025 – أبريل 2026" : "Nov 2025 – Apr 2026",
      skills: ["IT Support", "System Administration", "Networking", "IT Security"],
      verify: "https://coursera.org/verify/professional-cert/RUJ79AOXC8KT",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      color: "hover:border-[#6366F1]/50 hover:shadow-indigo-500/10",
    },
    {
      title: "CS50x: Introduction to Computer Science",
      issuer: language === "de" ? "Harvard University" : language === "ar" ? "جامعة هارفارد" : "Harvard University",
      date: language === "de" ? "Feb. 2026 – Apr. 2026" : language === "ar" ? "فبراير 2026 – أبريل 2026" : "Feb 2026 – Apr 2026",
      skills: ["C Programming", "Python", "SQL", "Data Structures", "Algorithms"],
      verify: "https://cs50.harvard.edu/certificates/9e5b3fa6-aeb5-48df-9a76-3c56df45076a",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/70/Harvard_University_logo.svg",
      color: "hover:border-[#06B6D4]/50 hover:shadow-cyan-500/10",
    },
    {
      title: "Google AI Essentials",
      issuer: language === "de" ? "Google (via Coursera)" : language === "ar" ? "Google (عبر Coursera)" : "Google (via Coursera)",
      date: language === "de" ? "10. Mai 2026" : language === "ar" ? "10 مايو 2026" : "May 10, 2026",
      skills: ["AI Foundations", "Prompt Engineering", "AI Ethics", "AI Productivity", "AI Trends"],
      verify: "https://www.coursera.org/verify/specialization/KFXVQ8YXI4QO",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      color: "hover:border-[#A855F7]/50 hover:shadow-purple-500/10",
    },
  ];

  return (
    <AnimSection id="certifications" className="py-24 bg-[#111827]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle en="Top Certifications" de="Top-Zertifikate" ar="أبرز الشهادات" />
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {certs.map((c) => (
            <div key={c.title} className={`p-6 rounded-2xl bg-[#1E293B]/60 border border-[#334155]/40 hover:shadow-xl
              ${c.color} transition-all duration-300 flex flex-col`}>
              <div className="h-10 flex items-center mb-5">
                <img src={c.logo} alt={c.issuer} className="max-h-8 max-w-[120px] object-contain brightness-[0.9]" loading="lazy" />
              </div>
              <h3 className="font-['Sora'] text-sm font-semibold text-[#F1F5F9] mb-1 leading-snug flex-1">{c.title}</h3>
              <p className="text-[#94A3B8] text-xs mb-1">{c.issuer}</p>
              <p className="text-[#6366F1] text-xs font-medium mb-4">{c.date}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {c.skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-md bg-[#0A0E1A] border border-[#334155]/60 text-[#94A3B8] text-[10px]">{s}</span>
                ))}
              </div>
              <a href={c.verify} target="_blank" rel="noopener noreferrer"
                className="mt-auto flex items-center gap-1.5 text-[#6366F1] hover:text-[#818CF8] text-xs font-medium transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> {verifyLabel}
              </a>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/certifications">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#6366F1]/40 text-[#6366F1] font-semibold text-sm
              hover:bg-[#6366F1]/10 hover:border-[#6366F1]/70 transition-all duration-300 cursor-pointer">
              {t("certs.viewAll")} →
            </span>
          </Link>
        </div>
      </div>
    </AnimSection>
  );
}

// ─── GITHUB ───────────────────────────────────────────────────────────────
function GitHubStatCard() {
  const [stats, setStats] = useState<{ repos: number; followers: number; following: number; stars: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://api.github.com/users/qurashi512").then((r) => r.json()),
      fetch("https://api.github.com/users/qurashi512/repos?per_page=100").then((r) => r.json()),
    ])
      .then(([user, repos]) => {
        const stars = Array.isArray(repos)
          ? repos.reduce((sum: number, r: { stargazers_count: number }) => sum + r.stargazers_count, 0)
          : 0;
        setStats({ repos: user.public_repos || 0, followers: user.followers || 0, following: user.following || 0, stars });
      })
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const items = stats
    ? [
        { label: "Repos", value: stats.repos, icon: "📁" },
        { label: "Stars", value: stats.stars, icon: "⭐" },
        { label: "Followers", value: stats.followers, icon: "👥" },
        { label: "Following", value: stats.following, icon: "➕" },
      ]
    : [];

  return (
    <div className="p-4 rounded-2xl bg-[#1E293B]/60 border border-[#334155]/40 hover:border-[#6366F1]/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
      <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-wider mb-3">GitHub Stats</p>
      {loading ? (
        <div className="flex items-center justify-center h-28">
          <div className="w-6 h-6 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 gap-3 mt-1">
          {items.map(({ label, value, icon }) => (
            <div key={label} className="text-center p-3 rounded-xl bg-[#0A0E1A]/60 border border-[#334155]/30">
              <span className="text-base">{icon}</span>
              <p className="font-['Sora'] text-xl font-bold text-[#6366F1] mt-1">{value}</p>
              <p className="text-[#94A3B8] text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      ) : (
        <a href="https://github.com/qurashi512" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center h-28 text-[#94A3B8] text-sm hover:text-[#6366F1] transition-colors">
          View on GitHub →
        </a>
      )}
    </div>
  );
}

function TopLanguagesCard() {
  const [langs, setLangs] = useState<{ name: string; pct: number; color: string }[] | null>(null);
  const [loading, setLoading] = useState(true);

  const LANG_COLORS: Record<string, string> = {
    Kotlin: "#7F52FF", TypeScript: "#3178C6", JavaScript: "#F7DF1E",
    Python: "#3776AB", HTML: "#E34F26", CSS: "#1572B6",
    Java: "#ED8B00", Swift: "#FA7343", Dart: "#0175C2",
    "C#": "#178600", C: "#A97BFF", "C++": "#F34B7D",
    Shell: "#89E051", Go: "#00ADD8", Rust: "#DEA584",
  };

  useEffect(() => {
    fetch("https://api.github.com/users/qurashi512/repos?per_page=100")
      .then((r) => r.json())
      .then((repos) => {
        if (!Array.isArray(repos)) return;
        const counts: Record<string, number> = {};
        repos.forEach((repo: { language: string | null }) => {
          if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
        });
        const total = Object.values(counts).reduce((a, b) => a + b, 0);
        if (total === 0) return;
        const sorted = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({
            name,
            pct: Math.round((count / total) * 100),
            color: LANG_COLORS[name] || "#6366F1",
          }));
        setLangs(sorted);
      })
      .catch(() => setLangs(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 rounded-2xl bg-[#1E293B]/60 border border-[#334155]/40 hover:border-[#6366F1]/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
      <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-wider mb-3">Top Languages</p>
      {loading ? (
        <div className="flex items-center justify-center h-28">
          <div className="w-6 h-6 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : langs && langs.length > 0 ? (
        <div className="flex flex-col gap-3 mt-1">
          {langs.map(({ name, pct, color }) => (
            <div key={name}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#F1F5F9] font-medium">{name}</span>
                <span className="text-[#94A3B8]">{pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#0A0E1A] overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <a href="https://github.com/qurashi512" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center h-28 text-[#94A3B8] text-sm hover:text-[#6366F1] transition-colors">
          View on GitHub →
        </a>
      )}
    </div>
  );
}

// ─── GITHUB ───────────────────────────────────────────────────────────────
function GitHubActivity() {
  const { t, language } = useLanguage();
  const username = "qurashi512";
  const [stats, setStats] = useState<{ repos: number; stars: number; followers: number; following: number } | null>(null);
  const [langs, setLangs] = useState<{ name: string; pct: number; color: string }[]>([]);
  const COLORS = ["#6366F1","#06B6D4","#A855F7","#F59E0B","#10B981","#EF4444","#F97316","#EC4899"];

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(r => r.json())
      .then(d => setStats({ repos: d.public_repos, stars: 0, followers: d.followers, following: d.following }));
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then(r => r.json())
      .then((repos: { language: string | null; stargazers_count: number }[]) => {
        if (!Array.isArray(repos)) return;
        const starTotal = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
        setStats(prev => prev ? { ...prev, stars: starTotal } : prev);
        const counts: Record<string, number> = {};
        repos.forEach(r => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
        const total = Object.values(counts).reduce((a, b) => a + b, 0);
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
        setLangs(sorted.map(([name, cnt], i) => ({ name, pct: Math.round((cnt / total) * 100), color: COLORS[i % COLORS.length] })));
      });
  }, []);

  const statLabels = {
    repos:     language === "ar" ? "مستودع" : language === "de" ? "Repos" : "Repos",
    stars:     language === "ar" ? "نجمة" : "Stars",
    followers: language === "ar" ? "متابع" : language === "de" ? "Follower" : "Followers",
    following: language === "ar" ? "يتابع" : language === "de" ? "Folgt" : "Following",
  };

  return (
    <AnimSection id="github" className="py-24 bg-[#0A0E1A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle en="GitHub Activity" de="GitHub-Aktivität" ar="نشاط GitHub" />

        {/* Stats + Languages */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* GitHub Stats */}
          <div className="p-6 rounded-2xl bg-[#1E293B]/60 border border-[#334155]/40
            hover:border-[#6366F1]/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
            <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-wider mb-4">GitHub Stats</p>
            {stats ? (
              <div className="grid grid-cols-2 gap-4">
                {([
                  { label: statLabels.repos,     value: stats.repos,     icon: "📁" },
                  { label: statLabels.stars,     value: stats.stars,     icon: "⭐" },
                  { label: statLabels.followers, value: stats.followers, icon: "👥" },
                  { label: statLabels.following, value: stats.following, icon: "➕" },
                ] as { label: string; value: number; icon: string }[]).map(({ label, value, icon }) => (
                  <div key={label} className="p-3 rounded-xl bg-[#0A0E1A]/60 border border-[#334155]/30 text-center">
                    <div className="text-2xl mb-1">{icon}</div>
                    <div className="text-2xl font-bold text-[#6366F1] font-['Sora']">{value}</div>
                    <div className="text-xs text-[#94A3B8] mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center py-8">
                <div className="w-6 h-6 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Top Languages */}
          <div className="p-6 rounded-2xl bg-[#1E293B]/60 border border-[#334155]/40
            hover:border-[#6366F1]/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
            <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-wider mb-4">
              {language === "ar" ? "أكثر اللغات استخداماً" : language === "de" ? "Top-Sprachen" : "Top Languages"}
            </p>
            {langs.length > 0 ? (
              <div className="flex flex-col gap-3">
                {langs.map(({ name, pct, color }) => (
                  <div key={name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#F1F5F9] font-medium">{name}</span>
                      <span className="text-[#94A3B8]">{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#0A0E1A]">
                      <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center py-8">
                <div className="w-6 h-6 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Contribution Graph — full width */}
        <div className="p-6 rounded-2xl bg-[#1E293B]/60 border border-[#334155]/40
          hover:border-[#6366F1]/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
          <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-wider mb-4">Contribution Graph</p>
          <div className="overflow-x-auto">
            <img
              src={`https://ghchart.rshah.org/6366F1/${username}`}
              alt="Contribution Graph"
              loading="lazy"
              className="rounded-lg min-w-[600px] w-full"
              style={{ imageRendering: "crisp-edges" }}
            />
          </div>
          <p className="text-xs text-[#475569] mt-2 text-center">
            {language === "ar" ? "اسحب للتمرير →" : language === "de" ? "Zum Scrollen ziehen →" : "Swipe to scroll →"}
          </p>
        </div>

      </div>
    </AnimSection>
  );
}
// ─── LANGUAGES ────────────────────────────────────────────────────────────
function LanguageSkills() {
  const { language } = useLanguage();
  const title = language === "de" ? "Sprachkenntnisse" : language === "ar" ? "مهارات اللغة" : "Language Skills";
  const langs = [
    {
      en: "Arabic", de: "Arabisch", ar: "العربية",
      level: language === "de" ? "Muttersprache" : language === "ar" ? "اللغة الأم" : "Native",
      cefr: "C2", pct: 100, color: "from-[#6366F1] to-[#818CF8]",
    },
    {
      en: "German", de: "Deutsch", ar: "الألمانية",
      level: "B2", cefr: "B2", pct: 75, color: "from-[#06B6D4] to-[#38BDF8]",
    },
    {
      en: "English", de: "Englisch", ar: "الإنجليزية",
      level: "B1", cefr: "B1", pct: 65, color: "from-[#A855F7] to-[#C084FC]",
    },
  ];

  return (
    <AnimSection className="py-24 bg-[#111827]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="font-['Sora'] text-3xl md:text-4xl font-bold text-[#F1F5F9] mb-3">{title}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#6366F1] to-[#06B6D4] rounded-full mx-auto" />
        </div>
        <div className="flex flex-col gap-6">
          {langs.map((l) => {
            const name = language === "de" ? l.de : language === "ar" ? l.ar : l.en;
            return (
              <div key={l.en} className="p-5 rounded-2xl bg-[#1E293B]/60 border border-[#334155]/40">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-['Sora'] text-base font-semibold text-[#F1F5F9]">{name}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#0A0E1A] border border-[#334155]/60 text-[#94A3B8]">
                      {l.cefr}
                    </span>
                  </div>
                  <span className="text-[#94A3B8] text-sm font-medium">{l.level}</span>
                </div>
                <div className="h-2 rounded-full bg-[#0A0E1A] overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${l.color}`} style={{ width: `${l.pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimSection>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────
const SB_URL = "https://nijmaixshspqogidtdai.supabase.co/rest/v1";
const SB_KEY = "sb_publishable_9U-mT8VLJQ0E5XoMIfIrTA_JmiERNXn";
const SB_HEADERS = { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` };

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  message: string;
  created_at: string;
}

function Testimonials() {
  const { language } = useLanguage();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SB_URL}/testimonials?order=created_at.desc&limit=2`, { headers: SB_HEADERS })
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setItems(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const viewAll = language === "de" ? "Alle Referenzen ansehen" : language === "ar" ? "عرض كل الآراء" : "View All Testimonials";
  const leaveReview = language === "de" ? "Referenz hinterlassen" : language === "ar" ? "اترك رأيك" : "Leave a Review";
  const noReviews = language === "de" ? "Noch keine Referenzen. Sei der Erste!" : language === "ar" ? "لا توجد آراء بعد. كن أول من يكتب!" : "No reviews yet. Be the first!";

  return (
    <AnimSection id="testimonials" className="py-24 bg-[#0A0E1A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionTitle en="Testimonials" de="Referenzen" ar="آراء الآخرين" />

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-[#94A3B8]">{noReviews}</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {items.map((item) => (
              <div key={item.id} className="p-6 rounded-2xl bg-[#1E293B]/60 border border-[#334155]/40 relative
                hover:border-[#6366F1]/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col">
                <Quote className="w-8 h-8 text-[#6366F1]/20 mb-4" />
                <p className="text-[#94A3B8] text-sm leading-relaxed italic flex-1">&ldquo;{item.message}&rdquo;</p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#334155]/40">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366F1] to-[#06B6D4] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-['Sora'] text-sm font-semibold text-[#F1F5F9]">{item.name}</p>
                    {item.role && <p className="text-[#94A3B8] text-xs">{item.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/testimonials">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#6366F1]/40 text-[#6366F1]
              font-semibold text-sm hover:bg-[#6366F1]/10 hover:border-[#6366F1]/70 transition-all duration-300 cursor-pointer">
              {viewAll} →
            </span>
          </Link>
          <Link href="/testimonials#write">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6366F1] text-white
              font-semibold text-sm hover:bg-[#4F46E5] transition-all duration-300 cursor-pointer">
              ✍️ {leaveReview}
            </span>
          </Link>
        </div>
      </div>
    </AnimSection>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────
function Contact() {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xvzlobpz", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, _replyto: form.email, subject: form.subject, message: form.message }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const sending = language === "de" ? "Senden..." : language === "ar" ? "جارٍ الإرسال..." : "Sending...";
  const successMsg = language === "de" ? "Nachricht gesendet! Ich melde mich bald." : language === "ar" ? "تم الإرسال بنجاح! سأرد عليك قريباً." : "Message sent! I'll get back to you soon.";
  const errorMsg = language === "de" ? "Fehler beim Senden. Bitte erneut versuchen." : language === "ar" ? "فشل الإرسال. يرجى المحاولة مجدداً." : "Failed to send. Please try again.";
  const downloadEN = language === "de" ? "Lebenslauf (EN)" : language === "ar" ? "CV (إنجليزي)" : "Download CV (EN)";
  const downloadDE = language === "de" ? "Lebenslauf (DE)" : language === "ar" ? "CV (ألماني)" : "Download CV (DE)";

  return (
    <AnimSection id="contact" className="py-24 bg-[#111827]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle en="Get in Touch" de="Kontakt aufnehmen" ar="تواصل معي" />
        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <div className="flex flex-col gap-4 mb-8">
              {[
                { icon: Mail,      label: "Email",    labelAr: "البريد",   labelDe: "E-Mail",   value: "gorashe.suliman@outlook.com", href: "mailto:gorashe.suliman@outlook.com" },
                { icon: Phone,     label: "Phone",    labelAr: "الهاتف",   labelDe: "Telefon",  value: "+20 101 073 6525",             href: "tel:+201010736525" },
                { icon: MapPin,    label: "Location", labelAr: "الموقع",   labelDe: "Standort", value: "Cairo, Egypt → Germany 🇩🇪",   href: null },
              ].map(({ icon: Icon, label, labelAr, labelDe, value, href }) => (
               <div key={label} className="flex items-center gap-4 p-4 rounded-xl bg-[#1E293B]/60 border border-[#334155]/40">
                 <div className="w-10 h-10 rounded-lg bg-[#0A0E1A] border border-[#334155]/40 flex items-center justify-center">
                   <Icon className="w-4 h-4 text-[#6366F1]" />
                 </div>
                 <div>
                   <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-wider">
                     {language === "ar" ? labelAr : language === "de" ? labelDe : label}
                   </p>
                   {href ? <a href={href} className="text-[#F1F5F9] text-sm hover:text-[#6366F1] transition-colors">{value}</a>
                     : <p className="text-[#F1F5F9] text-sm">{value}</p>}
                 </div>
               </div>
             ))}
            </div>

            {/* Social */}
            <div className="flex flex-col gap-3 mb-8">
              {[
                { label: "GitHub", sub: "@qurashi512", href: "https://github.com/qurashi512", icon: Github },
                { label: "LinkedIn", sub: "qurashi512", href: "https://linkedin.com/in/qurashi512", icon: Linkedin },
              ].map(({ label, sub, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#1E293B]/60 border border-[#334155]/40
                    hover:border-[#6366F1]/40 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[#0A0E1A] border border-[#334155]/40 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#94A3B8]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#F1F5F9] text-sm font-semibold">{label}</p>
                    <p className="text-[#94A3B8] text-xs">{sub}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#334155]" />
                </a>
              ))}
            </div>

            {/* CV */}
            <div className="flex flex-wrap gap-3">
              <a href="cv/Gorashe_Suliman_CV_EN.pdf" download
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#06B6D4]
                  text-white font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300">
                ↓ {downloadEN}
              </a>
              <a href="cv/Gorashe_Suliman_CV_DE.pdf" download
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#334155] text-[#F1F5F9] font-semibold text-sm
                  hover:border-[#6366F1]/50 hover:bg-white/5 transition-all duration-300">
                ↓ {downloadDE}
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { key: "name", type: "text", labelKey: "contact.name" },
              { key: "email", type: "email", labelKey: "contact.email" },
              { key: "subject", type: "text", labelKey: "contact.subject" },
            ].map(({ key, type, labelKey }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-[#6366F1] uppercase tracking-wider mb-1.5">{t(labelKey)}</label>
                <input type={type} value={(form as Record<string, string>)[key]} required
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  data-testid={`input-${key}`}
                  className="w-full px-4 py-3 rounded-xl bg-[#1E293B] border border-[#334155]/60 text-[#F1F5F9] text-sm
                    placeholder:text-[#334155] focus:outline-none focus:border-[#6366F1]/60 focus:shadow-lg focus:shadow-indigo-500/10
                    transition-all duration-300" />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-[#6366F1] uppercase tracking-wider mb-1.5">{t("contact.message")}</label>
              <textarea rows={5} value={form.message} required
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                data-testid="input-message"
                className="w-full px-4 py-3 rounded-xl bg-[#1E293B] border border-[#334155]/60 text-[#F1F5F9] text-sm
                  placeholder:text-[#334155] focus:outline-none focus:border-[#6366F1]/60 focus:shadow-lg focus:shadow-indigo-500/10
                  transition-all duration-300 resize-none" />
            </div>
            {status === "success" && <p className="text-green-400 text-sm font-medium">{successMsg}</p>}
            {status === "error" && <p className="text-red-400 text-sm font-medium">{errorMsg}</p>}
            <button type="submit" disabled={status === "sending"} data-testid="btn-send-message"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#06B6D4] text-white font-semibold text-sm
                hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60">
              {status === "sending" ? sending : t("contact.send")}
            </button>
          </form>
        </div>
      </div>
    </AnimSection>
  );
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────
function FinalCTA() {
  const { language } = useLanguage();
  const title = language === "de" ? "Verfügbar für Ausbildung & Freelance" : language === "ar" ? "متاح للتدريب المهني والعمل الحر" : "Available for Ausbildung & Freelance";
  const sub = language === "de" ? "Bereit, echte Fähigkeiten in ein echtes Team einzubringen." : language === "ar" ? "مستعد لإحضار مهارات حقيقية لفريق حقيقي." : "Ready to bring real skills to a real team.";
  const cta = language === "de" ? "Kontakt aufnehmen" : language === "ar" ? "تواصل معي" : "Get in Touch";

  return (
    <section className="py-20 bg-gradient-to-r from-[#6366F1] to-[#06B6D4] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-60" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-['Sora'] text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
        <p className="text-white/80 text-lg mb-8">{sub}</p>
        <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#6366F1] font-bold text-base
            hover:shadow-2xl hover:scale-105 transition-all duration-300">
          {cta} →
        </a>
      </div>
    </section>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="bg-[#0A0E1A]">
      <Hero />
      <About />
      <Services />
      <Projects />
      <Skills />
      <TopCerts />
      <GitHubActivity />
      <LanguageSkills />
      <Testimonials />
      <Contact />
      <FinalCTA />
    </main>
  );
}
