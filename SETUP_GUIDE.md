# PathFinder AI - Complete Setup Guide

## Current Status ✅

Your PathFinder AI application is ready! Here's what's been completed:

- ✅ Next.js 14 project with TypeScript & TailwindCSS
- ✅ Netflix-style Explorer Grid interface
- ✅ Interactive career and study path cards
- ✅ Dashboard page
- ✅ PWA configuration
- ✅ Supabase database schema
- ✅ Git repository initialized with first commit

---

## Next Steps: GitHub & Deployment

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `pathfinder-ai`
3. Description: `AI-driven career and postgraduate discovery platform`
4. Choose: **Public** or **Private** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

### Step 2: Push Code to GitHub

After creating the repository, GitHub will show you commands. Copy your repository URL, then run these commands in your terminal:

```bash
cd C:\Users\adamt\pathfinder-ai

# Add GitHub as remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/pathfinder-ai.git

# Push your code
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/john-doe/pathfinder-ai.git
git branch -M main
git push -u origin main
```

---

## Step 3: Set Up Supabase

### Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click **"New Project"**
3. Fill in:
   - Name: `pathfinder-ai`
   - Database Password: (create a strong password and save it)
   - Region: (choose closest to your users)
4. Click **"Create new project"** (takes ~2 minutes)

### Run Database Schema

1. Once project is ready, click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Copy the entire contents from `lib/supabase/schema.sql` in your project
4. Paste into the SQL editor
5. Click **"Run"** (bottom right)
6. You should see success messages

### Get Your Supabase Credentials

1. Go to **"Settings"** → **"API"** in the left sidebar
2. Copy these values:
   - **Project URL** (starts with https://...supabase.co)
   - **anon public** key (long string starting with eyJ...)

3. Create `.env.local` file in your project root:

```bash
# In C:\Users\adamt\pathfinder-ai\.env.local

NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: Add later when you get Gemini API key
GEMINI_API_KEY=your_gemini_api_key
```

---

## Step 4: Test Locally

```bash
cd C:\Users\adamt\pathfinder-ai
npm run dev
```

Open http://localhost:3000 - you should see the PathFinder AI homepage!

---

## Step 5: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Easiest)

1. Go to https://vercel.com/signup
2. Sign up/Login with **GitHub**
3. Click **"Add New..."** → **"Project"**
4. Select your `pathfinder-ai` repository
5. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Click **"Environment Variables"** and add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
7. Click **"Deploy"**

Your app will be live at `https://pathfinder-ai.vercel.app` in ~2 minutes!

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd C:\Users\adamt\pathfinder-ai
vercel

# Follow the prompts, then:
vercel --prod
```

---

## Step 6: Optional - Get Gemini AI API Key

For AI-powered features:

1. Go to https://aistudio.google.com/apikey
2. Create a new API key
3. Add to your `.env.local`:
   ```
   GEMINI_API_KEY=your_key_here
   ```
4. Also add to Vercel environment variables

---

## What You Can Do Now

### Local Development
- Navigate to `/explore` - See the Explorer Grid
- Navigate to `/dashboard` - See your dashboard
- Click on any career/program card to see details
- View skill gap analysis

### Customize Your App
- Add real job listings in `components/explorer/ExplorerGrid.tsx`
- Connect to LinkedIn API, Wuzzuf API, etc.
- Build the Supabase integration for saving paths
- Add authentication with Supabase Auth

---

## Project Structure

```
pathfinder-ai/
├── app/
│   ├── page.tsx              # Homepage
│   ├── explore/page.tsx      # Explorer Grid
│   └── dashboard/page.tsx    # User Dashboard
├── components/
│   └── explorer/
│       ├── ExplorerGrid.tsx      # Main grid component
│       ├── PathCard.tsx          # Individual path cards
│       └── PathDetailModal.tsx   # Detail popup
├── lib/
│   └── supabase/
│       ├── client.ts         # Supabase client
│       └── schema.sql        # Database schema
├── types/
│   └── index.ts              # TypeScript types
└── public/
    └── manifest.json         # PWA manifest
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
npm run dev
```

### Environment Variables Not Working
- Make sure `.env.local` is in the root directory
- Restart dev server after adding variables
- In Vercel, redeploy after adding environment variables

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

---

## Need Help?

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **TailwindCSS**: https://tailwindcss.com/docs
- **Vercel Support**: https://vercel.com/support

---

**You're all set! 🚀 Start by creating your GitHub repo and pushing your code!**
