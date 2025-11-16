'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, ExternalLink, Clock, DollarSign } from 'lucide-react';

interface LearningResource {
  id: string;
  title: string;
  provider: string;
  url: string;
  duration: string;
  free: boolean;
  skills: string[];
  image?: string;
}

const resources: LearningResource[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    provider: 'Coursera',
    url: 'https://www.coursera.org/learn/web-development',
    duration: '12 weeks',
    free: false,
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    id: '2',
    title: 'Data Science Professional Certificate',
    provider: 'edX',
    url: 'https://www.edx.org/professional-certificate/data-science',
    duration: '6 months',
    free: false,
    skills: ['Python', 'Machine Learning', 'Statistics'],
  },
  {
    id: '3',
    title: 'Digital Marketing Fundamentals',
    provider: 'Edraak',
    url: 'https://www.edraak.org/en',
    duration: '4 weeks',
    free: true,
    skills: ['SEO', 'Social Media', 'Content Marketing'],
  },
  {
    id: '4',
    title: 'Google Career Certificates',
    provider: 'Maharat Google',
    url: 'https://grow.google/intl/ar/google-career-certificates/',
    duration: '3-6 months',
    free: true,
    skills: ['IT Support', 'Data Analytics', 'Project Management'],
  },
  {
    id: '5',
    title: 'SQL for Data Analysis',
    provider: 'LinkedIn Learning',
    url: 'https://www.linkedin.com/learning/sql-essential-training-3',
    duration: '3 hours',
    free: false,
    skills: ['SQL', 'Database', 'Data Analysis'],
  },
  {
    id: '6',
    title: 'UX Design Professional',
    provider: 'FutureLearn',
    url: 'https://www.futurelearn.com/subjects/business-and-management-courses/ux-design',
    duration: '8 weeks',
    free: true,
    skills: ['UX Design', 'User Research', 'Prototyping'],
  },
];

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Learning Resources
              </h1>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses or skills..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-full border border-gray-700 focus:outline-none focus:border-orange-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Resources Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:border-orange-500 transition-all hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm text-orange-400 font-semibold mb-1">
                      {resource.provider}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {resource.title}
                    </h3>
                  </div>
                  {resource.free && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                      FREE
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {resource.duration}
                  </div>
                  {!resource.free && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      Paid
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Start Learning
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No resources found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
