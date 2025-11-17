'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Upload, MessageCircle } from 'lucide-react';
import { getUserProfile, hasUploadedCV } from '@/lib/storage/userProfile';
import { getSortedPathsByMatch, type CareerPathCategory } from '@/lib/data/career-paths';
import OnboardingModal from '@/components/onboarding/OnboardingModal';
import CareerPathCard from '@/components/paths/CareerPathCard';

export default function ExplorePage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [careerPaths, setCareerPaths] = useState<CareerPathCategory[]>([]);
  const [userHasProfile, setUserHasProfile] = useState(false);

  useEffect(() => {
    const hasProfile = hasUploadedCV();
    setUserHasProfile(hasProfile);

    if (!hasProfile) {
      // Show onboarding for new users
      setShowOnboarding(true);
    }

    // Get user profile for matching
    const profile = getUserProfile();
    const userSkills = profile?.skills || [];
    const userInterests = profile?.interests || profile?.skills || [];

    // Get paths sorted by match score
    const sortedPaths = getSortedPathsByMatch(userSkills, userInterests);
    setCareerPaths(sortedPaths);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Compass className="w-8 h-8 text-amber-500" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  BUE PathFinder
                </h1>
                <p className="text-sm text-gray-400">Discover Your Career Path</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {userHasProfile && (
                <Link
                  href="/dashboard"
                  className="px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Dashboard
                </Link>
              )}
              {!userHasProfile && (
                <button
                  onClick={() => setShowOnboarding(true)}
                  className="px-4 py-2 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            {userHasProfile ? 'Explore Your Career Paths' : 'Choose Your Career Direction'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {userHasProfile
              ? 'Paths are ranked based on your profile. Click any path to see roles and opportunities.'
              : 'Select a career path to explore roles, opportunities, and what it takes to succeed'}
          </p>
        </div>

        {/* Career Paths Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {careerPaths.map((path) => (
            <CareerPathCard key={path.id} path={path} showMatch={userHasProfile} />
          ))}
        </div>

        {/* CTA Section for non-profiled users */}
        {!userHasProfile && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Get Personalized Recommendations
            </h3>
            <p className="text-gray-300 mb-6">
              Upload your CV or answer a few questions to see paths ranked specifically for you
            </p>
            <button
              onClick={() => setShowOnboarding(true)}
              className="px-8 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
            >
              Get Started Now
            </button>
          </div>
        )}
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-40">
        <Link
          href="/chat"
          className="flex items-center justify-center w-14 h-14 bg-slate-800 border border-slate-700 text-white rounded-xl shadow-lg hover:bg-slate-700 hover:border-amber-500 transition-colors"
          title="Chat with AI"
        >
          <MessageCircle className="w-6 h-6" />
        </Link>

        {!userHasProfile && (
          <button
            onClick={() => setShowOnboarding(true)}
            className="flex items-center justify-center w-14 h-14 bg-amber-500 text-slate-900 rounded-xl shadow-lg hover:bg-amber-400 transition-colors"
            title="Upload CV"
          >
            <Upload className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Onboarding Modal */}
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
    </div>
  );
}
