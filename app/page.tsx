import Link from 'next/link';
import { Compass, Sparkles, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Title */}
          <div className="flex items-center justify-center gap-3">
            <Compass className="w-12 h-12 text-indigo-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PathFinder AI
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-2xl text-gray-700 font-medium">
            Discover Your Future: Explore Real Career & Study Pathways
          </p>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI-powered career and postgraduate discovery platform that helps university students
            explore real job opportunities and study programs aligned with their skills and aspirations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/explore"
              className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-5 h-5" />
              Start Exploring
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-all"
            >
              <TrendingUp className="w-5 h-5" />
              My Dashboard
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 pt-16">
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Compass className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Guided Explorer</h3>
              <p className="text-gray-600">
                Browse real jobs and postgraduate programs in a Netflix-style visual interface
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Matching</h3>
              <p className="text-gray-600">
                Get personalized recommendations based on your skills, major, and interests
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Skill Gap Analysis</h3>
              <p className="text-gray-600">
                Identify missing skills and get curated learning resources to bridge the gap
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
