'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Briefcase, TrendingUp, CheckCircle2, DollarSign } from 'lucide-react';
import { careerSectors, type CareerSector, type CareerFunction } from '@/lib/data/career-sectors';

export default function SectorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sectorId = params.sectorId as string;

  const [sector, setSector] = useState<CareerSector | null>(null);

  useEffect(() => {
    const foundSector = careerSectors.find(s => s.id === sectorId);
    if (foundSector) {
      setSector(foundSector);
    }
  }, [sectorId]);

  if (!sector) {
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
            <div className="flex items-center gap-3">
              <div className={`text-3xl ${sector.color}`}>
                {sector.icon}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  {sector.name}
                </h1>
                <p className="text-sm text-gray-400">{sector.description}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Sector Overview */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Sector Overview</h2>
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getPayTierDisplay(sector.typicalPay).color} ${getPayTierDisplay(sector.typicalPay).bg}`}>
              {sector.typicalPay} {getPayTierDisplay(sector.typicalPay).label}
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            {sector.overview}
          </p>

          {/* Why This Sector */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-3">Why This Sector?</h3>
            <p className="text-gray-300 leading-relaxed">
              {sector.whyThisSector}
            </p>
          </div>

          {/* Skills Needed */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-3">Key Skills Needed</h3>
            <div className="flex flex-wrap gap-2">
              {sector.skillsNeeded.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-2 bg-slate-900/50 border border-slate-700 text-gray-300 text-sm rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Faculty Alignment */}
          {sector.facultyAlignment && sector.facultyAlignment.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">BUE Faculties</h3>
              <div className="flex flex-wrap gap-2">
                {sector.facultyAlignment.map((faculty) => (
                  <span
                    key={faculty}
                    className="px-3 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm rounded-lg"
                  >
                    {faculty}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Functions in This Sector */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Explore Functions in {sector.name}
          </h2>
          <p className="text-gray-400 mb-6">
            Choose a function to see specific roles, career paths, and what a typical day looks like
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {sector.functions.map((func) => {
              const payTier = getPayTierDisplay(func.typicalPay);

              return (
                <Link
                  key={func.id}
                  href={`/explore/${sectorId}/${func.id}`}
                  className="group bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 hover:bg-slate-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10"
                >
                  {/* Function Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {func.name}
                    </h3>
                    <div className={`px-2 py-1 rounded text-xs font-semibold ${payTier.color} ${payTier.bg}`}>
                      {func.typicalPay}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {func.description}
                  </p>

                  {/* Required Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {func.requiredSkills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-slate-900/50 text-gray-400 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {func.requiredSkills.length > 4 && (
                        <span className="px-2 py-1 text-gray-500 text-xs">
                          +{func.requiredSkills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Typical Titles */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Common titles:</p>
                    <p className="text-sm text-gray-400">
                      {func.typicalTitles.slice(0, 2).join(', ')}
                      {func.typicalTitles.length > 2 && '...'}
                    </p>
                  </div>

                  {/* Explore Button */}
                  <div className="flex items-center gap-2 text-amber-500 group-hover:text-amber-400 font-semibold text-sm">
                    View details
                    <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
