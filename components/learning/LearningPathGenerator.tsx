'use client';

import { useState } from 'react';
import { BookOpen, TrendingUp, Target, Clock, CheckCircle2, ExternalLink, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

interface Course {
  title: string;
  provider: string;
  url: string;
  duration: string;
  free: boolean;
  skillsCovered: string[];
}

interface LearningPhase {
  phase: number;
  title: string;
  duration: string;
  skills: string[];
  description: string;
  courses: Course[];
}

interface SkillToLearn {
  name: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  reason: string;
}

interface Milestone {
  week: number;
  goal: string;
  deliverable: string;
}

interface LearningPathData {
  skillGapAnalysis: {
    matchPercentage: number;
    skillsYouHave: string[];
    skillsToLearn: SkillToLearn[];
  };
  learningPath: {
    totalDuration: string;
    phases: LearningPhase[];
  };
  milestones: Milestone[];
  careerReadiness: {
    currentLevel: string;
    afterCompletion: string;
    estimatedTimeToJobReady: string;
  };
  actionableNextSteps: string[];
}

interface LearningPathGeneratorProps {
  userSkills: string[];
  targetRole: string;
  requiredSkills: string[];
  userLevel?: string;
}

export default function LearningPathGenerator({
  userSkills,
  targetRole,
  requiredSkills,
  userLevel = 'entry'
}: LearningPathGeneratorProps) {
  const [learningPath, setLearningPath] = useState<LearningPathData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  const generateLearningPath = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-learning-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userSkills,
          targetRole,
          requiredSkills,
          userLevel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate learning path');
      }

      setLearningPath(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Generate Button */}
      {!learningPath && (
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-8 text-center">
          <Target className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready to Achieve Your Career Goals?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get a personalized learning path tailored to your skills and target role: <span className="font-semibold text-amber-400">{targetRole}</span>
          </p>
          <button
            onClick={generateLearningPath}
            disabled={isLoading}
            className="px-8 py-4 bg-amber-500 text-slate-900 rounded-lg font-bold text-lg hover:bg-amber-400 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-3 border-slate-900 border-t-transparent rounded-full animate-spin" />
                Generating Your Path...
              </span>
            ) : (
              'Generate My Learning Path'
            )}
          </button>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <p className="text-red-300 text-center">{error}</p>
          <button
            onClick={generateLearningPath}
            className="mt-4 px-6 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors mx-auto block"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Learning Path Display */}
      {learningPath && (
        <div className="space-y-6">
          {/* Skill Gap Analysis */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-amber-500" />
              <h3 className="text-2xl font-bold text-white">Your Skill Gap Analysis</h3>
            </div>

            {/* Match Percentage */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 font-medium">Current Match</span>
                <span className="text-2xl font-bold text-amber-400">
                  {learningPath.skillGapAnalysis.matchPercentage}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${learningPath.skillGapAnalysis.matchPercentage}%` }}
                />
              </div>
            </div>

            {/* Skills You Have */}
            {learningPath.skillGapAnalysis.skillsYouHave.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Skills You Already Have
                </h4>
                <div className="flex flex-wrap gap-2">
                  {learningPath.skillGapAnalysis.skillsYouHave.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Skills to Learn */}
            <div>
              <h4 className="text-lg font-semibold text-amber-400 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Skills You Need to Learn
              </h4>
              <div className="space-y-3">
                {learningPath.skillGapAnalysis.skillsToLearn.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-slate-700/50 border border-slate-600 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-white">{skill.name}</h5>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded border ${getPriorityColor(skill.priority)}`}>
                          {skill.priority}
                        </span>
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {skill.estimatedTime}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">{skill.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learning Path Phases */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-amber-500" />
                <h3 className="text-2xl font-bold text-white">Your Learning Path</h3>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Total Duration</div>
                <div className="text-lg font-bold text-amber-400">
                  {learningPath.learningPath.totalDuration}
                </div>
              </div>
            </div>

            {/* Phases */}
            <div className="space-y-4">
              {learningPath.learningPath.phases.map((phase) => (
                <div
                  key={phase.phase}
                  className="bg-slate-700/50 border border-slate-600 rounded-lg overflow-hidden"
                >
                  {/* Phase Header */}
                  <button
                    onClick={() => setExpandedPhase(expandedPhase === phase.phase ? null : phase.phase)}
                    className="w-full p-4 flex items-center justify-between hover:bg-slate-700/70 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center font-bold">
                        {phase.phase}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white text-lg">{phase.title}</h4>
                        <p className="text-sm text-gray-400">{phase.duration}</p>
                      </div>
                    </div>
                    {expandedPhase === phase.phase ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {/* Phase Content */}
                  {expandedPhase === phase.phase && (
                    <div className="p-4 border-t border-slate-600">
                      <p className="text-gray-300 mb-4">{phase.description}</p>

                      {/* Skills in this phase */}
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-gray-400 mb-2">Skills Covered</h5>
                        <div className="flex flex-wrap gap-2">
                          {phase.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Courses */}
                      <div>
                        <h5 className="text-sm font-semibold text-gray-400 mb-3">Recommended Courses</h5>
                        <div className="space-y-3">
                          {phase.courses.map((course, index) => (
                            <a
                              key={index}
                              href={course.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block bg-slate-800 border border-slate-600 rounded-lg p-4 hover:border-amber-500/50 transition-all group"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h6 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                                    {course.title}
                                  </h6>
                                  <p className="text-sm text-gray-400">{course.provider}</p>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                  {course.free && (
                                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30">
                                      FREE
                                    </span>
                                  )}
                                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-amber-400 transition-colors" />
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {course.duration}
                                </span>
                                <span className="text-xs">
                                  {course.skillsCovered.join(', ')}
                                </span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Steps */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold text-white">Start Today</h3>
            </div>
            <div className="space-y-2">
              {learningPath.actionableNextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-200">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Career Readiness */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Your Career Trajectory</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Current Level</div>
                <div className="text-lg font-bold text-white">
                  {learningPath.careerReadiness.currentLevel}
                </div>
              </div>
              <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">After Completion</div>
                <div className="text-lg font-bold text-green-400">
                  {learningPath.careerReadiness.afterCompletion}
                </div>
              </div>
              <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Time to Job-Ready</div>
                <div className="text-lg font-bold text-amber-400">
                  {learningPath.careerReadiness.estimatedTimeToJobReady}
                </div>
              </div>
            </div>
          </div>

          {/* Regenerate Button */}
          <div className="text-center">
            <button
              onClick={generateLearningPath}
              disabled={isLoading}
              className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50"
            >
              Regenerate Learning Path
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
