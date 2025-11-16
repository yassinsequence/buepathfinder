'use client';

import { CareerPath, JobListing, PostgraduateProgram } from '@/types';
import { X, ExternalLink, Bookmark, Check, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

interface PathDetailModalProps {
  path: CareerPath;
  isOpen: boolean;
  onClose: () => void;
}

export default function PathDetailModal({ path, isOpen, onClose }: PathDetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const skillsMatch = path.requiredSkills.filter((s) => s.userHasSkill).length;
  const totalSkills = path.requiredSkills.length;
  const matchPercentage = Math.round((skillsMatch / totalSkills) * 100);
  const missingSkills = path.requiredSkills.filter((s) => !s.userHasSkill);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-indigo-600 to-purple-600 p-6 border-b border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold uppercase">
                  {path.type === 'job' ? 'Career Opportunity' : 'Postgraduate Program'}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-bold">
                  {matchPercentage}% Match
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{path.title}</h2>
              <p className="text-xl text-white/90">{path.organization}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {path.type === 'job' ? 'What You\'ll Do' : 'Program Overview'}
            </h3>
            <p className="text-gray-300 leading-relaxed">{path.description}</p>
          </div>

          {/* Key Details Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Location</div>
              <div className="text-white font-semibold">{path.location}</div>
            </div>

            {path.salaryRange && (
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Salary Range</div>
                <div className="text-white font-semibold">
                  {path.salaryRange.currency} {path.salaryRange.min.toLocaleString()} -{' '}
                  {path.salaryRange.max.toLocaleString()}
                </div>
              </div>
            )}

            {path.tuitionRange && (
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Tuition Range</div>
                <div className="text-white font-semibold">
                  {path.tuitionRange.currency} {path.tuitionRange.min.toLocaleString()} -{' '}
                  {path.tuitionRange.max.toLocaleString()}
                </div>
              </div>
            )}

            {path.duration && (
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Duration</div>
                <div className="text-white font-semibold">{path.duration}</div>
              </div>
            )}

            {path.experienceLevel && (
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Experience Level</div>
                <div className="text-white font-semibold capitalize">{path.experienceLevel}</div>
              </div>
            )}

            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Sector</div>
              <div className="text-white font-semibold">{path.sector}</div>
            </div>
          </div>

          {/* Recommended Majors */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Recommended Backgrounds</h3>
            <div className="flex flex-wrap gap-2">
              {path.recommendedMajors.map((major, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30"
                >
                  {major}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Assessment */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Skills Required</h3>
            <div className="space-y-3">
              {path.requiredSkills.map((skill) => (
                <div
                  key={skill.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    skill.userHasSkill ? 'bg-green-500/10 border border-green-500/30' : 'bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {skill.userHasSkill ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                    )}
                    <div>
                      <div className="text-white font-medium">{skill.name}</div>
                      <div className="text-sm text-gray-400">{skill.category}</div>
                    </div>
                  </div>
                  {skill.userHasSkill ? (
                    <span className="text-green-400 text-sm font-semibold">You have this!</span>
                  ) : (
                    <span className="text-yellow-400 text-sm font-semibold">Learn this</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skill Gap Summary */}
          {missingSkills.length > 0 && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-1" />
                <div className="flex-1">
                  <h4 className="text-yellow-400 font-semibold mb-2">Skill Gap Analysis</h4>
                  <p className="text-gray-300 mb-3">
                    You already have {skillsMatch} out of {totalSkills} required skills ({matchPercentage}
                    % match). Consider learning these skills to strengthen your fit:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {missingSkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors">
              <Bookmark className="w-5 h-5" />
              Save to Dashboard
            </button>
            {path.applicationUrl && (
              <a
                href={path.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                {path.type === 'job' ? 'View Job Opening' : 'Visit University'}
              </a>
            )}
            {missingSkills.length > 0 && (
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
                Learn Missing Skills
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
