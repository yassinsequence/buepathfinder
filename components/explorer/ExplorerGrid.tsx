'use client';

import { useEffect, useState } from 'react';
import PathCard from './PathCard';
import { CareerPath } from '@/types';

interface ExplorerGridProps {
  searchQuery: string;
  filter: 'all' | 'job' | 'postgraduate';
}

// Mock data - will be replaced with Supabase queries
const mockPaths: CareerPath[] = [
  {
    id: '1',
    title: 'Software Engineer',
    organization: 'Google',
    type: 'job',
    sector: 'Technology',
    location: 'Remote',
    salaryRange: { min: 80000, max: 150000, currency: 'USD' },
    requiredSkills: [
      { id: 's1', name: 'JavaScript', category: 'Programming', userHasSkill: true },
      { id: 's2', name: 'React', category: 'Framework', userHasSkill: true },
      { id: 's3', name: 'Node.js', category: 'Backend', userHasSkill: false },
    ],
    recommendedMajors: ['Computer Science', 'Software Engineering'],
    description: 'Build scalable web applications and services',
    remote: true,
    experienceLevel: 'entry',
    applicationUrl: 'https://careers.google.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'MSc Data Science',
    organization: 'University of Leeds',
    type: 'postgraduate',
    sector: 'Education',
    location: 'Leeds, UK',
    tuitionRange: { min: 25000, max: 30000, currency: 'GBP' },
    requiredSkills: [
      { id: 's4', name: 'Python', category: 'Programming', userHasSkill: true },
      { id: 's5', name: 'Statistics', category: 'Math', userHasSkill: false },
      { id: 's6', name: 'Machine Learning', category: 'AI', userHasSkill: false },
    ],
    recommendedMajors: ['Computer Science', 'Mathematics', 'Engineering'],
    description: 'Advanced degree in data science and analytics',
    duration: '1 year',
    universityUrl: 'https://www.leeds.ac.uk',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Marketing Associate',
    organization: 'Unilever',
    type: 'job',
    sector: 'Consumer Goods',
    location: 'Cairo, Egypt',
    salaryRange: { min: 15000, max: 25000, currency: 'USD' },
    requiredSkills: [
      { id: 's7', name: 'Digital Marketing', category: 'Marketing', userHasSkill: true },
      { id: 's8', name: 'SEO', category: 'Marketing', userHasSkill: false },
      { id: 's9', name: 'Content Creation', category: 'Creative', userHasSkill: true },
    ],
    recommendedMajors: ['Marketing', 'Business', 'Communications'],
    description: 'Drive brand awareness and customer engagement',
    remote: false,
    experienceLevel: 'entry',
    applicationUrl: 'https://careers.unilever.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Data Analyst',
    organization: 'Microsoft',
    type: 'job',
    sector: 'Technology',
    location: 'Remote',
    salaryRange: { min: 70000, max: 120000, currency: 'USD' },
    requiredSkills: [
      { id: 's10', name: 'SQL', category: 'Database', userHasSkill: false },
      { id: 's11', name: 'Excel', category: 'Tools', userHasSkill: true },
      { id: 's12', name: 'Power BI', category: 'Visualization', userHasSkill: false },
    ],
    recommendedMajors: ['Computer Science', 'Business Analytics', 'Statistics'],
    description: 'Transform data into actionable insights',
    remote: true,
    experienceLevel: 'entry',
    applicationUrl: 'https://careers.microsoft.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'MBA in Innovation',
    organization: 'Stanford University',
    type: 'postgraduate',
    sector: 'Education',
    location: 'Stanford, USA',
    tuitionRange: { min: 70000, max: 75000, currency: 'USD' },
    requiredSkills: [
      { id: 's13', name: 'Leadership', category: 'Soft Skills', userHasSkill: true },
      { id: 's14', name: 'Strategic Thinking', category: 'Business', userHasSkill: false },
      { id: 's15', name: 'Finance', category: 'Business', userHasSkill: false },
    ],
    recommendedMajors: ['Business', 'Engineering', 'Economics'],
    description: 'Master business innovation and entrepreneurship',
    duration: '2 years',
    universityUrl: 'https://www.stanford.edu',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'UX Designer',
    organization: 'Airbnb',
    type: 'job',
    sector: 'Technology',
    location: 'San Francisco, USA',
    salaryRange: { min: 90000, max: 140000, currency: 'USD' },
    requiredSkills: [
      { id: 's16', name: 'Figma', category: 'Design', userHasSkill: true },
      { id: 's17', name: 'User Research', category: 'UX', userHasSkill: false },
      { id: 's18', name: 'Prototyping', category: 'Design', userHasSkill: true },
    ],
    recommendedMajors: ['Design', 'HCI', 'Computer Science'],
    description: 'Create delightful user experiences',
    remote: false,
    experienceLevel: 'mid',
    applicationUrl: 'https://careers.airbnb.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function ExplorerGrid({ searchQuery, filter }: ExplorerGridProps) {
  const [filteredPaths, setFilteredPaths] = useState<CareerPath[]>(mockPaths);

  useEffect(() => {
    let results = mockPaths;

    // Apply type filter
    if (filter !== 'all') {
      results = results.filter((path) => path.type === filter);
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (path) =>
          path.title.toLowerCase().includes(query) ||
          path.organization.toLowerCase().includes(query) ||
          path.sector.toLowerCase().includes(query) ||
          path.requiredSkills.some((skill) => skill.name.toLowerCase().includes(query))
      );
    }

    setFilteredPaths(results);
  }, [searchQuery, filter]);

  const categories = [
    {
      title: 'Top Roles for Engineering Majors',
      paths: filteredPaths.filter((p) =>
        p.recommendedMajors.some(m => m.toLowerCase().includes('engineering') || m.toLowerCase().includes('computer'))
      ),
    },
    {
      title: 'Business & Management Pathways',
      paths: filteredPaths.filter((p) =>
        p.recommendedMajors.some(m => m.toLowerCase().includes('business') || m.toLowerCase().includes('marketing'))
      ),
    },
    {
      title: 'Global Postgraduate Programs',
      paths: filteredPaths.filter((p) => p.type === 'postgraduate'),
    },
    {
      title: 'Remote Career Opportunities',
      paths: filteredPaths.filter((p) => p.type === 'job' && p.remote),
    },
  ];

  return (
    <div className="space-y-12">
      {categories.map((category, index) => {
        if (category.paths.length === 0) return null;

        return (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">{category.title}</h2>
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
                {category.paths.map((path) => (
                  <PathCard key={path.id} path={path} />
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {filteredPaths.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">No results found. Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
}
