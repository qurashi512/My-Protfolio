# Gorashe Suliman — Portfolio

Personal portfolio website for Gorashe Suliman, Junior Android & Web Developer.

**Live site:** https://qurashi512.github.io/My-Portfolio/

## Stack

- React + Vite + TypeScript
- Tailwind CSS + Framer Motion
- Wouter (routing)
- Multilingual: English / Deutsch / العربية (RTL)

## Structure

```
src/
  pages/       — Home, Certifications
  components/  — Navbar, Footer, ScrollProgressBar, ScrollToTop
  contexts/    — LanguageContext (EN/DE/AR)
  hooks/       — useScrollProgress
images/        — Profile photo, project screenshots, cert logos
cv/            — PDF CVs (EN + DE)
fonts/         — Arabic fonts
```

## Local development

```bash
npm install
npm run dev
```

## Deploy

Pushes to `main` trigger GitHub Actions → builds → deploys to GitHub Pages automatically.
