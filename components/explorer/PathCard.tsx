'use client';

import { useState } from 'react';
import { CareerPath } from '@/types';
import { MapPin, DollarSign, Clock, Briefcase, GraduationCap, ExternalLink, Check, X } from 'lucide-react';
import PathDetailModal from './PathDetailModal';

interface PathCardProps {
  path: CareerPath;
}

export default function PathCard({ path }: PathCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skillsMatch = path.requiredSkills.filter((s) => s.userHasSkill).length;
  const totalSkills = path.requiredSkills.length;
  const matchPercentage = Math.round((skillsMatch / totalSkills) * 100);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex-none w-80 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl border border-gray-700 hover:border-indigo-500"
      >
        {/* Card Header */}
        <div className="relative h-40 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
          <div className="text-center text-white p-4">
            {path.type === 'job' ? (
              <Briefcase className="w-12 h-12 mx-auto mb-2" />
            ) : (
              <GraduationCap className="w-12 h-12 mx-auto mb-2" />
            )}
            <div className="text-xs font-semibold uppercase tracking-wider opacity-90">
              {path.organization}
            </div>
          </div>

          {/* Match Badge */}
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white text-sm font-bold">{matchPercentage}% Match</span>
          </div>

          {/* Type Badge */}
          <div className="absolute top-3 left-3 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white text-xs font-semibold uppercase">
              {path.type === 'job' ? 'Career' : 'Study'}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <h3 className="text-xl font-bold text-white line-clamp-2">{path.title}</h3>

          {/* Info Row */}
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>{path.location}</span>
              {path.remote && (
                <span className="ml-auto px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                  Remote
                </span>
              )}
            </div>

            {path.salaryRange && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span>
                  {path.salaryRange.currency} {path.salaryRange.min.toLocaleString()} -{' '}
                  {path.salaryRange.max.toLocaleString()}
                </span>
              </div>
            )}

            {path.tuitionRange && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-yellow-400" />
                <span>
                  {path.tuitionRange.currency} {path.tuitionRange.min.toLocaleString()} -{' '}
                  {path.tuitionRange.max.toLocaleString()}
                </span>
              </div>
            )}

            {path.duration && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>{path.duration}</span>
              </div>
            )}
          </div>

          {/* Skills Preview */}
          <div className="space-y-2">
            <div className="text-xs text-gray-400 font-semibold">Required Skills</div>
            <div className="flex flex-wrap gap-2">
              {path.requiredSkills.slice(0, 3).map((skill) => (
                <div
                  key={skill.id}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    skill.userHasSkill
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-gray-700 text-gray-400 border border-gray-600'
                  }`}
                >
                  {skill.userHasSkill ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <X className="w-3 h-3" />
                  )}
                  {skill.name}
                </div>
              ))}
              {path.requiredSkills.length > 3 && (
                <div className="px-2 py-1 bg-gray-700 text-gray-400 rounded-full text-xs">
                  +{path.requiredSkills.length - 3} more
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              View Details
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isModalOpen && (
        <PathDetailModal path={path} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
