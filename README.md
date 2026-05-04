# 🤖 NexInnovator — World-Class Robotics Education Platform

Free robotics education for every student. English & Bangla. 25+ robot manuals with full code.

**Founded by:** Abdur Rahman Lahi & Kazi Mahir Adeeb

---

## 🚀 Deploy to GitHub + Vercel (5 minutes)

### Step 1: Create GitHub Repo

```bash
# Initialize git in this folder
git init
git add .
git commit -m "🤖 NexInnovator v2.0 — initial commit"

# Create repo on GitHub (go to github.com → New repository)
# Name it: nexinnovator (or any name)
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/nexinnovator.git
git branch -M main
git push -u origin main
```

### Step 2: Add API Key

Create `.env.local` in project root:
```
ANTHROPIC_API_KEY=your_key_here
```
Get your key at: https://console.anthropic.com

### Step 3: Deploy to Vercel

1. Go to **https://vercel.com** → Sign in with GitHub
2. Click **"Add New Project"**
3. Select your `nexinnovator` repo
4. Under **Environment Variables**, add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your Anthropic API key
5. Click **Deploy** ✅

Your site will be live at: `https://nexinnovator.vercel.app`

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Create .env.local and add your API key
cp .env.example .env.local
# Edit .env.local with your ANTHROPIC_API_KEY

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
nexinnovator/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── site-shell.tsx        # Navbar + Footer
│   ├── globals.css           # Design system
│   ├── learning-hub/
│   │   ├── page.tsx          # Robot library
│   │   └── [id]/page.tsx     # Robot detail
│   ├── ai-assistant/
│   │   └── page.tsx          # NexBot AI chat
│   ├── projects/page.tsx     # Project ideas
│   ├── dashboard/page.tsx    # XP + achievements
│   ├── certifications/page.tsx # Quiz system
│   ├── about/page.tsx        # About page
│   └── api/chat/route.ts     # Claude AI API
├── lib/
│   ├── store.ts              # Zustand XP + lang state
│   └── platform-data.ts      # 25+ robot manuals + data
├── .env.example
├── package.json
└── README.md
```

---

## 🔑 Features

- **25+ Robot Manuals** — Full Arduino/Python code, components, viva questions
- **NexBot AI** — Claude-powered tutor in Bangla & English
- **XP Gamification** — Level up as you learn
- **Certification Quizzes** — Test your knowledge
- **Bilingual** — English + বাংলা toggle
- **100% Free** — No paywalls, no ads

---

## 📄 License

MIT License — Free for everyone, forever.
