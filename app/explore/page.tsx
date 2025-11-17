'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Upload, MessageCircle, TrendingUp, Briefcase, DollarSign } from 'lucide-react';
import { getUserProfile, hasUploadedCV } from '@/lib/storage/userProfile';
import { careerSectors } from '@/lib/data/career-sectors';
import OnboardingModal from '@/components/onboarding/OnboardingModal';

export default function ExplorePage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userHasProfile, setUserHasProfile] = useState(false);

  useEffect(() => {
    const hasProfile = hasUploadedCV();
    setUserHasProfile(hasProfile);

    if (!hasProfile) {
      // Show onboarding for new users
      setShowOnboarding(true);
    }
  }, []);

  const getPayTierDisplay = (tier: string) => {
    switch (tier) {
      case '$':
        return { label: 'Entry-level', range: '8K-18K EGP', color: 'text-green-400' };
      case '$$':
        return { label: 'Mid-level', range: '18K-35K EGP', color: 'text-blue-400' };
      case '$$$':
        return { label: 'High-paying', range: '35K+ EGP', color: 'text-amber-400' };
      default:
        return { label: 'Varies', range: '', color: 'text-gray-400' };
    }
  };

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
                <p className="text-sm text-gray-400">Explore Career Sectors</p>
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
            Explore Career Sectors
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start with a sector that interests you, then explore specific functions and roles within it
          </p>
        </div>

        {/* Career Sectors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {careerSectors.map((sector) => {
            const payTier = getPayTierDisplay(sector.typicalPay);

            return (
              <Link
                key={sector.id}
                href={`/explore/${sector.id}`}
                className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-amber-500/50 hover:bg-slate-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10"
              >
                {/* Icon and Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`text-5xl ${sector.color}`}>
                    {sector.icon}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${payTier.color} bg-slate-900/50`}>
                    {sector.typicalPay}
                  </div>
                </div>

                {/* Sector Name */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {sector.name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {sector.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{sector.functions.length} functions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{payTier.label}</span>
                  </div>
                </div>

                {/* Key Skills Preview */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {sector.skillsNeeded.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-slate-900/50 border border-slate-700 text-gray-400 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {sector.skillsNeeded.length > 3 && (
                    <span className="px-2 py-1 text-gray-500 text-xs">
                      +{sector.skillsNeeded.length - 3} more
                    </span>
                  )}
                </div>

                {/* Explore Button */}
                <div className="flex items-center gap-2 text-amber-500 group-hover:text-amber-400 font-semibold text-sm">
                  Explore sector
                  <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA Section for non-profiled users */}
        {!userHasProfile && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Get Personalized Recommendations
            </h3>
            <p className="text-gray-300 mb-6">
              Upload your CV or answer a few questions to see sectors and roles matched to your profile
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
