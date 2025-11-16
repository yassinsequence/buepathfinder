'use client';

import { useState, useEffect } from 'react';
import { X, ExternalLink, Clock, DollarSign, Loader2, BookOpen } from 'lucide-react';

interface Course {
  title: string;
  provider: string;
  url: string;
  duration: string;
  level: string;
  free: boolean;
  description: string;
}

interface CourseRecommendationsModalProps {
  skillName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseRecommendationsModal({ skillName, isOpen, onClose }: CourseRecommendationsModalProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && skillName) {
      fetchCourses();
    }
  }, [isOpen, skillName]);

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

  const fetchCourses = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/recommend-courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillName }),
      });

      const data = await response.json();

      if (data.courses) {
        setCourses(data.courses);
      } else {
        throw new Error('No courses returned');
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load course recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-amber-600 p-6 border-b border-slate-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6 text-slate-900" />
                <span className="px-3 py-1 bg-slate-900/20 backdrop-blur-sm rounded-lg text-slate-900 text-sm font-semibold">
                  Learning Resources
                </span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Learn {skillName}</h2>
              <p className="text-slate-800">Curated courses and pathways to master this skill</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-900/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-900" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
              <p className="text-gray-400">Finding the best courses for you...</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-center">
              <p className="text-red-400">{error}</p>
              <button
                onClick={fetchCourses}
                className="mt-4 px-6 py-2 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-400 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400">No courses found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-slate-700/50 border border-slate-600 rounded-lg p-5 hover:border-amber-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1 line-clamp-2">{course.title}</h3>
                      <p className="text-amber-400 text-sm">{course.provider}</p>
                    </div>
                    {course.free && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded ml-2">
                        FREE
                      </span>
                    )}
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{course.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg font-semibold transition-colors"
                  >
                    Start Learning
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
