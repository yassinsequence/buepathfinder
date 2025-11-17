// Career Paths - MECE Structure (Mutually Exclusive, Collectively Exhaustive)
// Based on primary industry sectors - no overlaps

export interface CareerPathCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  matchScore?: number;
  roleCount: number;
  avgSalaryMin: number;
  avgSalaryMax: number;
  requiredSkills: string[];
  relatedJobIds: string[];
}

export const careerPaths: CareerPathCategory[] = [
  {
    id: 'technology',
    name: 'Technology',
    description: 'Software engineering, data science, cybersecurity, and IT infrastructure',
    icon: '⚡',
    color: 'from-blue-600 to-blue-800',
    roleCount: 6,
    avgSalaryMin: 15000,
    avgSalaryMax: 35000,
    requiredSkills: ['Programming', 'Problem Solving', 'Technical Skills'],
    relatedJobIds: ['eng-1', 'eng-2', 'eng-3', 'eng-4', 'eng-5', 'eng-6', 'rem-1', 'rem-3'],
  },
  {
    id: 'finance',
    name: 'Finance & Consulting',
    description: 'Banking, financial analysis, business consulting, and strategic advisory',
    icon: '📊',
    color: 'from-emerald-600 to-emerald-800',
    roleCount: 4,
    avgSalaryMin: 14000,
    avgSalaryMax: 30000,
    requiredSkills: ['Financial Analysis', 'Business Strategy', 'Communication'],
    relatedJobIds: ['bus-1', 'bus-2', 'bus-3', 'bus-4'],
  },
  {
    id: 'marketing',
    name: 'Marketing & Sales',
    description: 'Brand management, digital marketing, business development, and customer acquisition',
    icon: '📱',
    color: 'from-purple-600 to-purple-800',
    roleCount: 3,
    avgSalaryMin: 10000,
    avgSalaryMax: 25000,
    requiredSkills: ['Marketing Strategy', 'Communication', 'Data Analysis'],
    relatedJobIds: ['mar-1', 'mar-2', 'mar-3', 'rem-2'],
  },
  {
    id: 'creative',
    name: 'Design & Media',
    description: 'UX/UI design, graphic design, content production, and creative services',
    icon: '🎯',
    color: 'from-pink-600 to-pink-800',
    roleCount: 4,
    avgSalaryMin: 10000,
    avgSalaryMax: 25000,
    requiredSkills: ['Design', 'Creativity', 'Visual Communication'],
    relatedJobIds: ['cre-1', 'cre-2', 'cre-3', 'cre-4'],
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    description: 'Medical services, pharmaceuticals, biotechnology, and clinical research',
    icon: '🔬',
    color: 'from-red-600 to-red-800',
    roleCount: 4,
    avgSalaryMin: 12000,
    avgSalaryMax: 25000,
    requiredSkills: ['Medical Knowledge', 'Research', 'Analytical Skills'],
    relatedJobIds: ['med-1', 'med-2', 'med-3', 'med-4'],
  },
  {
    id: 'legal',
    name: 'Legal & Compliance',
    description: 'Corporate law, regulatory compliance, contracts, and legal advisory',
    icon: '⚖',
    color: 'from-slate-600 to-slate-800',
    roleCount: 4,
    avgSalaryMin: 12000,
    avgSalaryMax: 30000,
    requiredSkills: ['Legal Knowledge', 'Writing', 'Critical Thinking'],
    relatedJobIds: ['law-1', 'law-2', 'law-3', 'law-4'],
  },
  {
    id: 'education',
    name: 'Education & Research',
    description: 'Academic teaching, research institutions, training, and knowledge development',
    icon: '🎓',
    color: 'from-indigo-600 to-indigo-800',
    roleCount: 3,
    avgSalaryMin: 8000,
    avgSalaryMax: 20000,
    requiredSkills: ['Teaching', 'Research', 'Communication'],
    relatedJobIds: ['edu-1', 'edu-2', 'edu-3'],
  },
];

// Calculate match score based on user profile
export function calculatePathMatch(
  path: CareerPathCategory,
  userSkills: string[],
  userInterests: string[]
): number {
  if (!userSkills.length && !userInterests.length) {
    return 0;
  }

  let score = 0;
  let totalPossible = 0;

  // Skill matching (70% weight)
  if (userSkills.length > 0) {
    totalPossible += 70;
    const matchedSkills = path.requiredSkills.filter(skill =>
      userSkills.some(userSkill =>
        skill.toLowerCase().includes(userSkill.toLowerCase()) ||
        userSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );
    score += (matchedSkills.length / path.requiredSkills.length) * 70;
  }

  // Interest/keyword matching (30% weight)
  if (userInterests.length > 0) {
    totalPossible += 30;
    const pathKeywords = [path.name, path.description, ...path.requiredSkills].join(' ').toLowerCase();
    const matchedInterests = userInterests.filter(interest =>
      pathKeywords.includes(interest.toLowerCase())
    );
    score += (matchedInterests.length / Math.max(userInterests.length, 1)) * 30;
  }

  return totalPossible > 0 ? Math.round(score) : 0;
}

export function getSortedPathsByMatch(
  userSkills: string[] = [],
  userInterests: string[] = []
): CareerPathCategory[] {
  const pathsWithScores = careerPaths.map(path => ({
    ...path,
    matchScore: calculatePathMatch(path, userSkills, userInterests),
  }));

  // Sort by match score descending
  return pathsWithScores.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
}
