'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Briefcase } from 'lucide-react';
import { careerPaths } from '@/lib/data/career-paths';
import { egyptianCareers } from '@/lib/data/egyptian-careers';
import PathCard from '@/components/explorer/PathCard';
import { CareerPath } from '@/types';

function convertToCareerPath(career: any): CareerPath {
  return {
    id: career.id,
    title: career.title,
    organization: career.organization,
    logo: career.logo,
    type: career.type,
    sector: career.sector,
    location: career.location,
    salaryRange: career.salaryRange,
    tuitionRange: career.tuitionRange,
    requiredSkills: career.requiredSkills.map((skill: string, index: number) => ({
      id: `${career.id}-skill-${index}`,
      name: skill,
      category: 'General',
      userHasSkill: false,
    })),
    recommendedMajors: career.recommendedMajors,
    description: career.description,
    duration: career.duration,
    experienceLevel: career.experienceLevel,
    remote: career.remote,
    applicationUrl: career.applicationUrl,
    universityUrl: career.applicationUrl,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export default function PathDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [filter, setFilter] = useState<'all' | 'job' | 'postgraduate'>('all');

  const path = careerPaths.find((p) => p.id === id);

  if (!path) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Path not found</h1>
          <Link href="/explore" className="text-amber-400 hover:text-amber-300">
                ← Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  // Get all opportunities for this path
  const pathOpportunities = egyptianCareers
    .filter((career) => path.relatedJobIds.includes(career.id))
    .map(convertToCareerPath);

  // Apply filter
  const filteredOpportunities =
    filter === 'all'
      ? pathOpportunities
      : pathOpportunities.filter((opp) => opp.type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/explore"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All Paths
          </Link>
        </div>
      </header>

      {/* Path Header */}
      <div className={`bg-gradient-to-br ${path.color} border-b border-slate-700`}>
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="flex items-start gap-6">
            <div className="text-7xl">{path.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-4xl font-bold text-white">{path.name}</h1>
                {path.matchScore && path.matchScore > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                    <span className="text-white font-bold">{path.matchScore}% Match</span>
                  </div>
                )}
              </div>
              <p className="text-xl text-white/90 mb-6">{path.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-semibold">{path.roleCount} Opportunities</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">💰</span>
                  <span className="font-semibold">
                    {path.avgSalaryMin.toLocaleString()} - {path.avgSalaryMax.toLocaleString()} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Key Skills Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Key Skills for This Path</h2>
          <div className="flex flex-wrap gap-3">
            {path.requiredSkills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-amber-500/20 text-amber-300 rounded-lg border border-amber-500/30 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-white">Available Opportunities</h2>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              All ({pathOpportunities.length})
            </button>
            <button
              onClick={() => setFilter('job')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'job'
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              Jobs ({pathOpportunities.filter((o) => o.type === 'job').length})
            </button>
            <button
              onClick={() => setFilter('postgraduate')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'postgraduate'
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              Programs ({pathOpportunities.filter((o) => o.type === 'postgraduate').length})
            </button>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity) => (
            <PathCard key={opportunity.id} path={opportunity} />
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No {filter === 'all' ? 'opportunities' : filter === 'job' ? 'jobs' : 'programs'} found in this path.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
