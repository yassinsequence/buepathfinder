// Career Paths - High-level career directions
// Each path contains multiple roles and opportunities

export interface CareerPathCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  matchScore?: number; // 0-100, calculated based on user profile
  roleCount: number;
  avgSalaryMin: number;
  avgSalaryMax: number;
  requiredSkills: string[];
  relatedJobIds: string[]; // IDs from egyptian-careers.ts
}

export const careerPaths: CareerPathCategory[] = [
  {
    id: 'technology',
    name: 'Technology & Engineering',
    description: 'Software development, data engineering, DevOps, cybersecurity, and technical roles',
    icon: '💻',
    color: 'from-blue-500 to-cyan-500',
    roleCount: 6,
    avgSalaryMin: 15000,
    avgSalaryMax: 35000,
    requiredSkills: ['Programming', 'Problem Solving', 'Technical Skills'],
    relatedJobIds: ['eng-1', 'eng-2', 'eng-3', 'eng-4', 'eng-5', 'eng-6'],
  },
  {
    id: 'business',
    name: 'Business & Finance',
    description: 'Business analysis, financial planning, consulting, and strategic roles',
    icon: '💼',
    color: 'from-amber-500 to-orange-500',
    roleCount: 4,
    avgSalaryMin: 14000,
    avgSalaryMax: 30000,
    requiredSkills: ['Business Strategy', 'Financial Analysis', 'Communication'],
    relatedJobIds: ['bus-1', 'bus-2', 'bus-3', 'bus-4'],
  },
  {
    id: 'creative',
    name: 'Creative & Design',
    description: 'UX/UI design, graphic design, content creation, and creative production',
    icon: '🎨',
    color: 'from-purple-500 to-pink-500',
    roleCount: 4,
    avgSalaryMin: 10000,
    avgSalaryMax: 25000,
    requiredSkills: ['Creativity', 'Design Tools', 'Visual Communication'],
    relatedJobIds: ['cre-1', 'cre-2', 'cre-3', 'cre-4'],
  },
  {
    id: 'marketing',
    name: 'Marketing & Sales',
    description: 'Digital marketing, brand management, sales, and customer engagement',
    icon: '📈',
    color: 'from-green-500 to-emerald-500',
    roleCount: 3,
    avgSalaryMin: 10000,
    avgSalaryMax: 25000,
    requiredSkills: ['Marketing Strategy', 'Communication', 'Data Analysis'],
    relatedJobIds: ['mar-1', 'mar-2', 'mar-3'],
  },
  {
    id: 'healthcare',
    name: 'Medical & Healthcare',
    description: 'Clinical research, biomedical engineering, pharmaceutical, and healthcare roles',
    icon: '🏥',
    color: 'from-red-500 to-rose-500',
    roleCount: 4,
    avgSalaryMin: 12000,
    avgSalaryMax: 25000,
    requiredSkills: ['Medical Knowledge', 'Research', 'Attention to Detail'],
    relatedJobIds: ['med-1', 'med-2', 'med-3', 'med-4'],
  },
  {
    id: 'legal',
    name: 'Law & Legal Services',
    description: 'Legal counsel, compliance, contract management, and regulatory roles',
    icon: '⚖️',
    color: 'from-indigo-500 to-blue-500',
    roleCount: 4,
    avgSalaryMin: 12000,
    avgSalaryMax: 30000,
    requiredSkills: ['Legal Knowledge', 'Writing', 'Analytical Thinking'],
    relatedJobIds: ['law-1', 'law-2', 'law-3', 'law-4'],
  },
  {
    id: 'remote',
    name: 'Remote & Flexible Work',
    description: 'Location-independent roles across various fields with flexible schedules',
    icon: '🌍',
    color: 'from-teal-500 to-cyan-500',
    roleCount: 4,
    avgSalaryMin: 15000,
    avgSalaryMax: 40000,
    requiredSkills: ['Self-Management', 'Communication', 'Digital Literacy'],
    relatedJobIds: ['rem-1', 'rem-2', 'rem-3', 'rem-4'],
  },
  {
    id: 'education',
    name: 'Education & Research',
    description: 'Teaching, research, academic writing, and educational development',
    icon: '📚',
    color: 'from-violet-500 to-purple-500',
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
    return 0; // No profile data, show all paths equally
  }

  let score = 0;
  let totalPossible = 0;

  // Check skill matches (60% weight)
  if (userSkills.length > 0) {
    totalPossible += 60;
    const matchedSkills = path.requiredSkills.filter(skill =>
      userSkills.some(userSkill =>
        skill.toLowerCase().includes(userSkill.toLowerCase()) ||
        userSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );
    score += (matchedSkills.length / path.requiredSkills.length) * 60;
  }

  // Check interest matches (40% weight)
  if (userInterests.length > 0) {
    totalPossible += 40;
    const pathKeywords = [path.name, path.description].join(' ').toLowerCase();
    const matchedInterests = userInterests.filter(interest =>
      pathKeywords.includes(interest.toLowerCase())
    );
    score += (matchedInterests.length / Math.min(userInterests.length, 3)) * 40;
  }

  return totalPossible > 0 ? Math.round(score) : 0;
}

export function getSortedPathsByMatch(
  userSkills: string[] = [],
  userInterests: string[] = []
): CareerPathCategory[] {
  return careerPaths
    .map(path => ({
      ...path,
      matchScore: calculatePathMatch(path, userSkills, userInterests),
    }))
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
}
