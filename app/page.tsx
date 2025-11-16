import Link from 'next/link';
import { Compass, Sparkles, TrendingUp, MessageCircle, Upload } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Title */}
          <div className="flex items-center justify-center gap-3">
            <Compass className="w-16 h-16 text-yellow-400" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              BUE PathFinder
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-3xl text-white font-bold">
            Discover Your Future: Explore Real Career & Study Pathways
          </p>

          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            AI-powered career and postgraduate discovery platform that helps BUE students
            explore real job opportunities and study programs aligned with their skills and aspirations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/explore"
              className="flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-full font-bold hover:from-yellow-500 hover:to-orange-600 transition-all shadow-2xl hover:shadow-yellow-500/50 hover:scale-105"
            >
              <Sparkles className="w-6 h-6" />
              Start Exploring
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold hover:bg-white/20 transition-all shadow-xl"
            >
              <TrendingUp className="w-6 h-6" />
              My Dashboard
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 pt-16">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all border border-blue-400/30 hover:scale-105">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <Compass className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Guided Explorer</h3>
              <p className="text-blue-100 text-lg">
                Browse real jobs and postgraduate programs in a Netflix-style visual interface
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-8 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all border border-purple-400/30 hover:scale-105">
              <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <Sparkles className="w-8 h-8 text-purple-900" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">AI-Powered Matching</h3>
              <p className="text-purple-100 text-lg">
                Get personalized recommendations based on your skills, major, and interests
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-600 to-pink-800 p-8 rounded-2xl shadow-2xl hover:shadow-pink-500/50 transition-all border border-pink-400/30 hover:scale-105">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <TrendingUp className="w-8 h-8 text-pink-900" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Skill Gap Analysis</h3>
              <p className="text-pink-100 text-lg">
                Identify missing skills and get curated learning resources to bridge the gap
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <Link
          href="/chat"
          className="group flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-110"
          title="Chat with AI"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="font-semibold hidden group-hover:inline-block">Chat with AI</span>
        </Link>

        <Link
          href="/upload-cv"
          className="group flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all hover:scale-110"
          title="Upload CV"
        >
          <Upload className="w-6 h-6" />
          <span className="font-semibold hidden group-hover:inline-block">Upload CV</span>
        </Link>
      </div>
    </div>
  );
}
