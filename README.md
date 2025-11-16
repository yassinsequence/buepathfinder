# PathFinder AI - Guided Explorer Edition

AI-driven career and postgraduate discovery platform that empowers final-year university students and recent graduates to explore real job and study pathways through a guided visual interface.

## Features

### Phase 1 - MVP (Current)

- **Netflix-Style Explorer Interface**: Browse career opportunities and postgraduate programs in an engaging visual grid
- **AI-Powered Skill Matching**: Get personalized recommendations based on your academic background and skills
- **Skill Gap Analysis**: Identify missing skills and receive curated learning resources
- **Real-time Path Discovery**: Explore jobs from LinkedIn, Wuzzuf, Indeed, and postgraduate programs from global universities
- **My Dashboard**: Track saved paths, learning progress, and career readiness
- **Progressive Web App (PWA)**: Install on mobile devices for on-the-go exploration

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **AI**: Google Gemini
- **Deployment**: Vercel
- **PWA**: next-pwa

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Google Gemini API key (optional for AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/pathfinder-ai.git
cd pathfinder-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials:
- Supabase URL and Anon Key
- Gemini API Key

4. Set up Supabase database:
- Create a new Supabase project
- Run the SQL schema from `lib/supabase/schema.sql` in the Supabase SQL Editor

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
pathfinder-ai/
├── app/                    # Next.js 14 App Router
│   ├── explore/           # Explorer interface
│   ├── dashboard/         # User dashboard
│   └── api/               # API routes
├── components/            # React components
│   ├── explorer/          # Explorer-specific components
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and configs
│   ├── supabase/         # Supabase client and schema
│   └── ai/               # AI integration
├── types/                 # TypeScript type definitions
└── public/               # Static assets

```

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema from `lib/supabase/schema.sql`
3. Copy your project URL and anon key to `.env.local`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in Vercel dashboard
4. Deploy!

## Roadmap

### Phase 2 - Expansion
- Alumni Journey Visualization
- AI Career Coach Companion
- Scholarship & Fellowship Integrations
- University Partnership Portals
- Multi-language support (Arabic/English toggle)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ for university students exploring their future**
