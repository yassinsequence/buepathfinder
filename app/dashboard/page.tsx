'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, FileText, Briefcase, TrendingUp, X, GraduationCap, Target } from 'lucide-react';
import { getUserProfile, clearUserProfile, type UserProfile } from '@/lib/storage/userProfile';
import { egyptianCareers } from '@/lib/data/egyptian-careers';
import LearningPathGenerator from '@/components/learning/LearningPathGenerator';
import { rankJobsByMatch, getMatchColor, getMatchLabel } from '@/lib/utils/matchScore';

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setProfile(getUserProfile());
  }, []);

  const handleClearCV = () => {
    if (confirm('Are you sure you want to remove your CV?')) {
      clearUserProfile();
      setProfile(null);
    }
  };

  // Get recommended jobs with match scores and sort by relevance
  const recommendedJobs = profile?.recommendedJobIds
    ? rankJobsByMatch(
        egyptianCareers.filter(job => profile.recommendedJobIds.includes(job.id)),
        profile
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5 text-amber-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                BUE PathFinder
              </h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/explore"
                className="px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Explore Careers
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h2 className="text-3xl font-bold text-white mb-8">My Dashboard</h2>

        {/* CV Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-bold text-white">My CV</h3>
            </div>
            {profile && (
              <button
                onClick={handleClearCV}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {profile ? (
            <div className="space-y-4">
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-300 font-medium">{profile.cvFileName}</p>
                  <span className="text-sm text-gray-400">
                    Uploaded {new Date(profile.cvUploadedAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-200 leading-relaxed">{profile.aiSummary}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Career Level</h4>
                  <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm inline-block capitalize">
                    {profile.careerLevel} Level
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No CV uploaded yet</p>
              <Link
                href="/upload-cv"
                className="inline-block px-6 py-3 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
              >
                Upload Your CV
              </Link>
            </div>
          )}
        </div>

        {/* Learning Path Section */}
        {profile && recommendedJobs.length > 0 && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-bold text-white">My Learning Path</h3>
            </div>
            <LearningPathGenerator
              userSkills={profile.skills}
              targetRole={recommendedJobs[0]?.title || 'Your Dream Career'}
              requiredSkills={recommendedJobs[0]?.requiredSkills || []}
              userLevel={profile.careerLevel}
            />
          </div>
        )}

        {/* Recommended Jobs Section */}
        {profile && recommendedJobs.length > 0 && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-bold text-white">Recommended for You</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 hover:border-amber-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-white flex-1">{job.title}</h4>
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded ml-2">
                      {job.type}
                    </span>
                  </div>

                  {/* Match Score Badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold mb-3 border ${getMatchColor(job.matchScore.matchPercentage)}`}>
                    <Target className="w-4 h-4" />
                    <span>{job.matchScore.matchPercentage}% Match</span>
                  </div>

                  <p className="text-amber-400 text-sm mb-2">{job.organization}</p>
                  <p className="text-gray-400 text-sm mb-3">{job.location}</p>

                  {/* Skills Match Info */}
                  <div className="mb-3">
                    <p className="text-gray-300 text-xs mb-1">
                      Skills: {job.matchScore.matchedSkills.length}/{job.requiredSkills.length} matched
                    </p>
                    {job.matchScore.majorMatch && (
                      <p className="text-green-400 text-xs">✓ Major aligned</p>
                    )}
                  </div>

                  {job.salaryRange && (
                    <p className="text-gray-300 text-sm font-medium">
                      {job.salaryRange.min.toLocaleString()} - {job.salaryRange.max.toLocaleString()} {job.salaryRange.currency}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/explore"
                className="inline-block px-6 py-3 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
              >
                View All Opportunities →
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
