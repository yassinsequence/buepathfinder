'use client';

import Link from 'next/link';
import { ArrowRight, Briefcase, TrendingUp } from 'lucide-react';
import { CareerPathCategory } from '@/lib/data/career-paths';

interface CareerPathCardProps {
  path: CareerPathCategory;
  showMatch: boolean;
}

export default function CareerPathCard({ path, showMatch }: CareerPathCardProps) {
  return (
    <Link href={`/path/${path.id}`}>
      <div className="group bg-slate-800 border-2 border-slate-700 hover:border-amber-500 rounded-xl p-6 transition-all hover:scale-105 cursor-pointer h-full">
        {/* Icon and Match Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className={`text-5xl bg-gradient-to-br ${path.color} p-4 rounded-xl`}>
            {path.icon}
          </div>
          {showMatch && path.matchScore !== undefined && path.matchScore > 0 && (
            <div className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-sm font-bold">
              <TrendingUp className="w-4 h-4" />
              {path.matchScore}% Match
            </div>
          )}
        </div>

        {/* Title and Description */}
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
          {path.name}
        </h3>
        <p className="text-gray-300 mb-4 line-clamp-2">{path.description}</p>

        {/* Stats */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300">{path.roleCount} roles available</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">💰</span>
            <span className="text-gray-300">
              {path.avgSalaryMin.toLocaleString()} - {path.avgSalaryMax.toLocaleString()} EGP
            </span>
          </div>
        </div>

        {/* Key Skills Preview */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {path.requiredSkills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-700 text-gray-300 rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* View Details Link */}
        <div className="flex items-center gap-2 text-amber-400 font-semibold group-hover:gap-4 transition-all">
          <span>Explore Path</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </Link>
  );
}
