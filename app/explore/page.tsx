'use client';

import { useState } from 'react';
import ExplorerGrid from '@/components/explorer/ExplorerGrid';
import { Search, Filter } from 'lucide-react';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'job' | 'postgraduate'>('all');

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">PathFinder AI</h1>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search careers, programs, or skills..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-full border border-gray-700 focus:outline-none focus:border-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('job')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === 'job'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Jobs
              </button>
              <button
                onClick={() => setSelectedFilter('postgraduate')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === 'postgraduate'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Programs
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <ExplorerGrid searchQuery={searchQuery} filter={selectedFilter} />
      </main>
    </div>
  );
}
