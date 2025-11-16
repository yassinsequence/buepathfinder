import Link from 'next/link';
import { Compass, Sparkles, TrendingUp, MessageCircle, Upload } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Title */}
          <div className="flex items-center justify-center gap-3">
            <Compass className="w-16 h-16 text-amber-500" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              BUE PathFinder
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-3xl text-white font-semibold">
            Discover Your Future Career Path
          </p>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            AI-powered platform helping BUE students explore career opportunities
            and postgraduate programs in Egypt and beyond.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/explore"
              className="flex items-center gap-2 px-10 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-400 transition-all shadow-lg hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              Start Exploring
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-10 py-4 bg-slate-800 border border-slate-700 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all shadow-lg"
            >
              <TrendingUp className="w-5 h-5" />
              My Dashboard
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-16">
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-amber-500/50 transition-all">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                <Compass className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Career Explorer</h3>
              <p className="text-gray-400">
                Browse Egyptian job opportunities and programs with intuitive categories
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-amber-500/50 transition-all">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">AI Matching</h3>
              <p className="text-gray-400">
                Get personalized recommendations based on your skills and interests
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-amber-500/50 transition-all">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Skill Analysis</h3>
              <p className="text-gray-400">
                Identify skill gaps and discover learning resources to grow your career
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
        <Link
          href="/chat"
          className="group flex items-center gap-2 bg-slate-800 border border-slate-700 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-slate-700 hover:border-amber-500 transition-all"
          title="Chat with AI"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300">Chat with AI</span>
        </Link>

        <Link
          href="/upload-cv"
          className="group flex items-center gap-2 bg-amber-500 text-slate-900 px-5 py-3 rounded-lg shadow-lg hover:bg-amber-400 transition-all"
          title="Upload CV"
        >
          <Upload className="w-5 h-5" />
          <span className="font-medium max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300">Upload CV</span>
        </Link>
      </div>
    </div>
  );
}
