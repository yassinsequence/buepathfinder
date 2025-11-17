'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Briefcase, MapPin, Building2, TrendingUp, Clock, DollarSign, ExternalLink } from 'lucide-react';
import { careerSectors, type CareerFunction } from '@/lib/data/career-sectors';
import { egyptianCareers, type CareerOpportunity } from '@/lib/data/egyptian-careers';

export default function FunctionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sectorId = params.sectorId as string;
  const functionId = params.functionId as string;

  const [functionData, setFunctionData] = useState<CareerFunction | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<CareerOpportunity[]>([]);

  useEffect(() => {
    const sector = careerSectors.find(s => s.id === sectorId);
    if (sector) {
      const func = sector.functions.find(f => f.id === functionId);
      if (func) {
        setFunctionData(func);

        // Find related jobs based on jobIds
        const jobs = egyptianCareers.filter(job => func.jobIds.includes(job.id));
        setRelatedJobs(jobs);
      }
    }
  }, [sectorId, functionId]);

  if (!functionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const getPayTierDisplay = (tier: string) => {
    switch (tier) {
      case '$':
        return { label: 'Entry-level', range: '8K-18K EGP', color: 'text-green-400', bg: 'bg-green-400/10' };
      case '$$':
        return { label: 'Mid-level', range: '18K-35K EGP', color: 'text-blue-400', bg: 'bg-blue-400/10' };
      case '$$$':
        return { label: 'High-paying', range: '35K+ EGP', color: 'text-amber-400', bg: 'bg-amber-400/10' };
      default:
        return { label: 'Varies', range: '', color: 'text-gray-400', bg: 'bg-gray-400/10' };
    }
  };

  const payTier = getPayTierDisplay(functionData.typicalPay);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-400" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">
                {functionData.name}
              </h1>
              <p className="text-sm text-gray-400">{functionData.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Function Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Detailed Description */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">What is {functionData.name}?</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {functionData.detailedDescription}
              </p>
            </div>

            {/* A Day in the Life */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-amber-500" />
                A Day in the Life
              </h2>
              <p className="text-gray-300 leading-relaxed italic">
                {functionData.dayInLife}
              </p>
            </div>

            {/* Career Path */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                Career Path & Progression
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {functionData.careerPath}
              </p>
              {functionData.growthOpportunities && (
                <div className="mt-4 p-4 bg-slate-900/50 rounded-lg">
                  <p className="text-sm font-semibold text-amber-400 mb-2">Growth Opportunities:</p>
                  <p className="text-gray-400 text-sm">
                    {functionData.growthOpportunities}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pay Tier Card */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className={`w-5 h-5 ${payTier.color}`} />
                <h3 className="text-lg font-bold text-white">Compensation</h3>
              </div>
              <div className={`px-4 py-3 rounded-lg ${payTier.bg} mb-2`}>
                <div className={`text-2xl font-bold ${payTier.color} mb-1`}>
                  {functionData.typicalPay}
                </div>
                <div className="text-sm text-gray-400">
                  {payTier.label}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {payTier.range}
              </p>
            </div>

            {/* Required Skills */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {functionData.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-slate-900/50 border border-slate-700 text-gray-300 text-sm rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Typical Titles */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Typical Job Titles</h3>
              <ul className="space-y-2">
                {functionData.typicalTitles.map((title) => (
                  <li key={title} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-amber-500 mt-1">•</span>
                    {title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Jobs */}
        {relatedJobs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Open Positions in This Function
            </h2>
            <p className="text-gray-400 mb-6">
              Real job opportunities in Egypt matching this function
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {relatedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-all"
                >
                  {/* Job Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Building2 className="w-4 h-4" />
                        <span>{job.organization}</span>
                      </div>
                    </div>
                    {job.experienceLevel && (
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        job.experienceLevel === 'entry' ? 'bg-green-400/10 text-green-400' :
                        job.experienceLevel === 'mid' ? 'bg-blue-400/10 text-blue-400' :
                        'bg-amber-400/10 text-amber-400'
                      }`}>
                        {job.experienceLevel}
                      </span>
                    )}
                  </div>

                  {/* Location & Remote */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    {job.remote && (
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded">
                        Remote
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.requiredSkills.slice(0, 5).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-slate-900/50 text-gray-400 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Salary */}
                  {job.salaryRange && (
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                      <DollarSign className="w-4 h-4" />
                      <span>
                        {job.salaryRange.min.toLocaleString()} - {job.salaryRange.max.toLocaleString()} {job.salaryRange.currency}
                      </span>
                    </div>
                  )}

                  {/* Apply Button */}
                  {job.applicationUrl && (
                    <a
                      href={job.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
                    >
                      View Job
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Jobs Message */}
        {relatedJobs.length === 0 && (
          <div className="mt-12 bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center">
            <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              No Open Positions Yet
            </h3>
            <p className="text-gray-400 mb-4">
              We're constantly adding new job opportunities. Check back soon or set up a profile to get notified.
            </p>
            <Link
              href="/explore"
              className="inline-block px-6 py-3 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
            >
              Explore Other Functions
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
