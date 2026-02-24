# 🚀 Modelia AI — Skill Tracker Dashboard

A personalized learning dashboard for tracking DSA, Backend, and System Design progress.

## Features

- 📊 **Overview Dashboard** — Progress rings, difficulty breakdown, phase tracking
- 🧠 **DSA 150** — All LeetCode Top Interview 150 problems with direct links
- 📅 **Weekly Plan** — 12-week structured learning roadmap
- ⚙️ **Backend** — Node.js, TypeScript, Prisma, PostgreSQL topics
- 🏗️ **System Design** — Foundations, scalability, and real design exercises
- 🔒 **Edit Protection** — Password-protected edit mode (default: `modelia2026`)
- 💾 **Persistent Storage** — Progress saves in localStorage

## Deploy to Vercel (3 steps)

### Step 1: Push to GitHub

```bash
cd modelia-dashboard
git init
git add .
git commit -m "Initial commit — Modelia Skill Tracker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/modelia-skill-dashboard.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `modelia-skill-dashboard` repo
4. Vercel auto-detects Vite — just click **Deploy**
5. Done! Your dashboard is live at `https://modelia-skill-dashboard.vercel.app`

### Step 3: (Optional) Custom Domain

In Vercel dashboard → Settings → Domains → Add your custom domain

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Customization

- **Change password**: Edit the `PASS` constant in `src/App.jsx`
- **Add problems**: Add entries to `DSA_SECTIONS` array
- **Modify weekly plan**: Edit `WEEKLY_PLAN` array
- **Change theme**: Modify the CSS variables and colors in the component

## Tech Stack

- React 18
- Vite
- localStorage for persistence
- Zero external UI libraries — pure CSS

---

Built for skill-building @ Modelia AI 🎯
