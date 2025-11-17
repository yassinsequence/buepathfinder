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
      <div className="group bg-slate-800 border border-slate-700 hover:border-amber-500 rounded-lg p-6 transition-colors cursor-pointer h-full">
        {/* Icon and Match Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${path.color} rounded-lg flex items-center justify-center text-2xl`}>
            {path.icon}
          </div>
          {showMatch && path.matchScore !== undefined && path.matchScore > 0 && (
            <div className="flex items-center gap-1 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded text-sm font-semibold">
              {path.matchScore}%
            </div>
          )}
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-semibold text-white mb-2">
          {path.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{path.description}</p>

        {/* Stats */}
        <div className="space-y-2 mb-4 pb-4 border-b border-slate-700">
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="w-4 h-4 text-gray-500" />
            <span className="text-gray-300">{path.roleCount} roles</span>
          </div>
          <div className="text-sm text-gray-300">
            {path.avgSalaryMin.toLocaleString()} - {path.avgSalaryMax.toLocaleString()} EGP
          </div>
        </div>

        {/* View Details Link */}
        <div className="flex items-center gap-2 text-amber-400 text-sm font-medium">
          <span>View Opportunities</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
