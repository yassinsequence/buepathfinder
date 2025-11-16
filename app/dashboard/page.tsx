'use client';

import Link from 'next/link';
import { Bookmark, TrendingUp, Award, ArrowLeft } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
              <h1 className="text-2xl font-bold text-white">My Dashboard</h1>
            </div>
            <Link
              href="/explore"
              className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
            >
              Explore More
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome to Your Career Journey!</h2>
            <p className="text-lg opacity-90">
              Track your saved paths, monitor your skill development, and stay on top of your goals.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
                  <Bookmark className="w-6 h-6 text-indigo-400" />
                </div>
                <span className="text-3xl font-bold text-white">0</span>
              </div>
              <h3 className="text-gray-400 font-medium">Saved Paths</h3>
              <p className="text-sm text-gray-500 mt-1">Career & study opportunities</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-3xl font-bold text-white">0</span>
              </div>
              <h3 className="text-gray-400 font-medium">Skills Acquired</h3>
              <p className="text-sm text-gray-500 mt-1">Through learning resources</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-3xl font-bold text-white">0%</span>
              </div>
              <h3 className="text-gray-400 font-medium">Average Match</h3>
              <p className="text-sm text-gray-500 mt-1">Across saved paths</p>
            </div>
          </div>

          {/* Saved Paths Section */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Saved Paths</h3>
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-4">No saved paths yet</p>
              <p className="text-gray-500 mb-6">
                Start exploring careers and programs to save them here
              </p>
              <Link
                href="/explore"
                className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Explore Pathways
              </Link>
            </div>
          </div>

          {/* Learning Progress Section */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Learning Progress</h3>
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-4">No learning activities yet</p>
              <p className="text-gray-500">
                Complete skill gap analysis to get personalized learning recommendations
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
