'use client';

import { useEffect, useState } from 'react';
import PathCard from './PathCard';
import { CareerPath } from '@/types';
import {
  egyptianCareers,
  categories,
  getCareersByCategory,
  searchCareers,
  type CareerOpportunity,
} from '@/lib/data/egyptian-careers';
import { getUserProfile } from '@/lib/storage/userProfile';
import { Star } from 'lucide-react';

interface ExplorerGridProps {
  searchQuery: string;
  filter: 'all' | 'job' | 'postgraduate';
}

// Convert CareerOpportunity to CareerPath format
function convertToCareerPath(career: CareerOpportunity): CareerPath {
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
    requiredSkills: career.requiredSkills.map((skill, index) => ({
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

export default function ExplorerGrid({ searchQuery, filter }: ExplorerGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [displayedPaths, setDisplayedPaths] = useState<CareerPath[]>([]);
  const [recommendedPaths, setRecommendedPaths] = useState<CareerPath[]>([]);

  useEffect(() => {
    // Get user profile and recommended jobs
    const profile = getUserProfile();
    if (profile && profile.recommendedJobIds) {
      const recommended = egyptianCareers
        .filter(career => profile.recommendedJobIds.includes(career.id))
        .map(convertToCareerPath);
      setRecommendedPaths(recommended);
    }

    let results: CareerOpportunity[] = [];

    // If there's a search query, search across all careers
    if (searchQuery) {
      results = searchCareers(searchQuery);
    }
    // If a specific category is selected, show only that category
    else if (selectedCategory) {
      results = getCareersByCategory(selectedCategory);
    }
    // Otherwise show all careers grouped by category
    else {
      results = [...egyptianCareers];
    }

    // Apply type filter
    if (filter !== 'all') {
      results = results.filter((career) => career.type === filter);
    }

    // Convert to CareerPath format
    setDisplayedPaths(results.map(convertToCareerPath));
  }, [searchQuery, filter, selectedCategory]);

  // Group careers by category for display
  const categorizedPaths = categories.map((category) => ({
    title: category,
    paths: displayedPaths.filter((path) => {
      const originalCareer = egyptianCareers.find((c) => c.id === path.id);
      return originalCareer?.category === category;
    }),
  }));

  return (
    <div className="space-y-8">
      {/* Category Pills - Only show when no search query */}
      {!searchQuery && (
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === null
                ? 'bg-amber-500 text-slate-900 shadow-lg'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-amber-500 text-slate-900 shadow-lg'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="text-gray-400 text-sm mb-4">
        {displayedPaths.length} {displayedPaths.length === 1 ? 'opportunity' : 'opportunities'} found
        {searchQuery && ` for "${searchQuery}"`}
        {selectedCategory && !searchQuery && ` in ${selectedCategory}`}
      </div>

      {/* Recommended for You Section */}
      {recommendedPaths.length > 0 && !searchQuery && !selectedCategory && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            <h2 className="text-2xl font-bold text-white">Recommended for You</h2>
            <span className="text-gray-400 text-sm">Based on your CV</span>
          </div>
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
              {recommendedPaths.map((path) => (
                <PathCard key={path.id} path={path} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category Sections */}
      {selectedCategory === null && !searchQuery ? (
        // Show all categories with horizontal scrolling
        <div className="space-y-12">
          {categorizedPaths.map((categoryGroup, index) => {
            if (categoryGroup.paths.length === 0) return null;

            return (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">{categoryGroup.title}</h2>
                  <span className="text-gray-400 text-sm">
                    {categoryGroup.paths.length} {categoryGroup.paths.length === 1 ? 'opportunity' : 'opportunities'}
                  </span>
                </div>
                <div className="relative">
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
                    {categoryGroup.paths.map((path) => (
                      <PathCard key={path.id} path={path} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Show filtered results in a grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPaths.map((path) => (
            <PathCard key={path.id} path={path} />
          ))}
        </div>
      )}

      {/* No Results */}
      {displayedPaths.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-400 text-lg mb-2">No opportunities found</p>
          <p className="text-gray-500 text-sm">
            Try adjusting your search or browse different categories
          </p>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              View All Categories
            </button>
          )}
        </div>
      )}
    </div>
  );
}
