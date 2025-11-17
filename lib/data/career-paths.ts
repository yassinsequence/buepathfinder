// Career Paths - Market-oriented categories inspired by BUE faculties
// MECE structure aligned with Egyptian job market realities

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
  facultyAlignment: string[]; // BUE faculties this path serves
}

export const careerPaths: CareerPathCategory[] = [
  {
    id: 'software-tech',
    name: 'Software & Technology',
    description: 'Software development, data science, AI/ML, cloud computing, and digital products',
    icon: '💻',
    color: 'from-blue-600 to-blue-800',
    roleCount: 8,
    avgSalaryMin: 15000,
    avgSalaryMax: 35000,
    requiredSkills: ['Programming', 'Algorithms', 'Software Development', 'Problem Solving'],
    relatedJobIds: ['eng-1', 'eng-2', 'eng-3', 'eng-4', 'eng-5', 'eng-6', 'rem-1', 'rem-3'],
    facultyAlignment: ['Informatics & Computer Science'],
  },
  {
    id: 'industrial-engineering',
    name: 'Industrial & Systems Engineering',
    description: 'Manufacturing, automotive, construction, electrical systems, and infrastructure',
    icon: '⚙️',
    color: 'from-gray-600 to-gray-800',
    roleCount: 5,
    avgSalaryMin: 12000,
    avgSalaryMax: 28000,
    requiredSkills: ['CAD', 'Technical Design', 'Systems Thinking', 'Engineering Principles'],
    relatedJobIds: ['mech-1', 'mech-2', 'mech-3', 'civil-1', 'elec-1'],
    facultyAlignment: ['Engineering'],
  },
  {
    id: 'sustainability',
    name: 'Sustainability & Green Tech',
    description: 'Renewable energy, environmental consulting, climate solutions, and sustainable development',
    icon: '🌱',
    color: 'from-green-600 to-green-800',
    roleCount: 4,
    avgSalaryMin: 13000,
    avgSalaryMax: 30000,
    requiredSkills: ['Sustainability', 'Environmental Analysis', 'Energy Systems', 'Project Management'],
    relatedJobIds: ['energy-1', 'energy-2', 'energy-3', 'energy-4'],
    facultyAlignment: ['Energy & Environmental Engineering'],
  },
  {
    id: 'business-finance',
    name: 'Business & Finance',
    description: 'Banking, consulting, financial analysis, economics, and strategic management',
    icon: '💼',
    color: 'from-emerald-600 to-emerald-800',
    roleCount: 4,
    avgSalaryMin: 14000,
    avgSalaryMax: 30000,
    requiredSkills: ['Financial Analysis', 'Business Strategy', 'Excel', 'Communication'],
    relatedJobIds: ['bus-1', 'bus-2', 'bus-3', 'bus-4'],
    facultyAlignment: ['Business Administration, Economics & Political Science'],
  },
  {
    id: 'media-marketing',
    name: 'Media & Marketing',
    description: 'Digital marketing, content creation, advertising, PR, and brand management',
    icon: '📱',
    color: 'from-purple-600 to-purple-800',
    roleCount: 4,
    avgSalaryMin: 10000,
    avgSalaryMax: 25000,
    requiredSkills: ['Marketing', 'Content Creation', 'Social Media', 'Communication'],
    relatedJobIds: ['mar-1', 'mar-2', 'mar-3', 'rem-2'],
    facultyAlignment: ['Communication & Mass Media'],
  },
  {
    id: 'creative-design',
    name: 'Design & Creative Industries',
    description: 'UX/UI design, graphic design, visual arts, branding, and multimedia production',
    icon: '🎨',
    color: 'from-pink-600 to-pink-800',
    roleCount: 4,
    avgSalaryMin: 10000,
    avgSalaryMax: 25000,
    requiredSkills: ['Design Software', 'Creativity', 'Visual Communication', 'User Research'],
    relatedJobIds: ['cre-1', 'cre-2', 'cre-3', 'cre-4'],
    facultyAlignment: ['Art & Design'],
  },
  {
    id: 'research-education',
    name: 'Research & Education',
    description: 'Academic research, teaching, cultural preservation, translation, and knowledge work',
    icon: '📚',
    color: 'from-indigo-600 to-indigo-800',
    roleCount: 6,
    avgSalaryMin: 8000,
    avgSalaryMax: 20000,
    requiredSkills: ['Research', 'Writing', 'Analysis', 'Communication'],
    relatedJobIds: ['arts-1', 'arts-2', 'arts-3', 'arts-4', 'edu-1', 'edu-2', 'edu-3'],
    facultyAlignment: ['Arts & Humanities'],
  },
  {
    id: 'legal-compliance',
    name: 'Legal & Compliance',
    description: 'Corporate law, legal consulting, regulatory compliance, and contract management',
    icon: '⚖️',
    color: 'from-slate-600 to-slate-800',
    roleCount: 4,
    avgSalaryMin: 12000,
    avgSalaryMax: 30000,
    requiredSkills: ['Legal Knowledge', 'Analysis', 'Writing', 'Negotiation'],
    relatedJobIds: ['law-1', 'law-2', 'law-3', 'law-4'],
    facultyAlignment: ['Law'],
  },
  {
    id: 'healthcare-clinical',
    name: 'Healthcare & Clinical Services',
    description: 'Medical practice, dentistry, nursing, patient care, and clinical operations',
    icon: '🏥',
    color: 'from-red-600 to-red-800',
    roleCount: 8,
    avgSalaryMin: 12000,
    avgSalaryMax: 35000,
    requiredSkills: ['Patient Care', 'Clinical Skills', 'Medical Knowledge', 'Compassion'],
    relatedJobIds: ['dent-1', 'dent-2', 'dent-3', 'dent-4', 'nurs-1', 'nurs-2', 'nurs-3', 'nurs-4'],
    facultyAlignment: ['Dentistry', 'Nursing'],
  },
  {
    id: 'pharma-biotech',
    name: 'Pharmaceuticals & Biotech',
    description: 'Drug development, clinical pharmacy, regulatory affairs, and pharmaceutical research',
    icon: '💊',
    color: 'from-teal-600 to-teal-800',
    roleCount: 6,
    avgSalaryMin: 12000,
    avgSalaryMax: 28000,
    requiredSkills: ['Pharmacology', 'Research', 'Regulatory Knowledge', 'Scientific Communication'],
    relatedJobIds: ['pharm-1', 'pharm-2', 'pharm-3', 'pharm-4', 'med-1', 'med-4'],
    facultyAlignment: ['Pharmacy'],
  },
  {
    id: 'rehabilitation',
    name: 'Rehabilitation & Wellness',
    description: 'Physiotherapy, sports medicine, rehabilitation programs, and wellness management',
    icon: '🏃',
    color: 'from-orange-600 to-orange-800',
    roleCount: 6,
    avgSalaryMin: 10000,
    avgSalaryMax: 26000,
    requiredSkills: ['Physical Therapy', 'Patient Assessment', 'Rehabilitation', 'Exercise Science'],
    relatedJobIds: ['physio-1', 'physio-2', 'physio-3', 'physio-4', 'med-2', 'med-3'],
    facultyAlignment: ['Physiotherapy'],
  },
];

// Calculate match score based on user profile - improved algorithm
export function calculatePathMatch(
  path: CareerPathCategory,
  userSkills: string[],
  userInterests: string[]
): number {
  if (!userSkills.length && !userInterests.length) {
    return 0;
  }

  let score = 0;

  // Skill matching (50% weight) - more lenient fuzzy matching
  if (userSkills.length > 0) {
    const matchedSkills = path.requiredSkills.filter(pathSkill => {
      return userSkills.some(userSkill => {
        const pathSkillLower = pathSkill.toLowerCase();
        const userSkillLower = userSkill.toLowerCase();

        // Exact match
        if (pathSkillLower === userSkillLower) return true;

        // Contains match (either direction)
        if (pathSkillLower.includes(userSkillLower) || userSkillLower.includes(pathSkillLower)) {
          return true;
        }

        // Word overlap (e.g., "Project Management" matches "Management")
        const pathWords = pathSkillLower.split(/\s+/);
        const userWords = userSkillLower.split(/\s+/);
        return pathWords.some(pw => userWords.some(uw =>
          pw.length > 3 && uw.length > 3 && (pw.includes(uw) || uw.includes(pw))
        ));
      });
    });

    score += (matchedSkills.length / path.requiredSkills.length) * 50;
  }

  // Interest matching (30% weight) - check against path name, description, and skills
  if (userInterests.length > 0) {
    const pathText = [
      path.name,
      path.description,
      ...path.requiredSkills,
      ...path.facultyAlignment
    ].join(' ').toLowerCase();

    const matchedInterests = userInterests.filter(interest => {
      const interestLower = interest.toLowerCase();
      return pathText.includes(interestLower) ||
             interestLower.split(/\s+/).some(word =>
               word.length > 3 && pathText.includes(word)
             );
    });

    score += (matchedInterests.length / userInterests.length) * 30;
  }

  // Keyword boost (20% weight) - check for domain-specific keywords
  const domainKeywords: Record<string, string[]> = {
    'software-tech': ['software', 'programming', 'developer', 'code', 'tech', 'computer', 'web', 'app', 'data', 'ai', 'ml'],
    'industrial-engineering': ['mechanical', 'civil', 'electrical', 'engineering', 'cad', 'design', 'manufacturing', 'construction'],
    'sustainability': ['environment', 'energy', 'renewable', 'sustainability', 'green', 'climate', 'solar', 'wind'],
    'business-finance': ['business', 'finance', 'accounting', 'economics', 'banking', 'investment', 'consulting', 'strategy'],
    'media-marketing': ['marketing', 'advertising', 'media', 'social', 'content', 'brand', 'pr', 'communications'],
    'creative-design': ['design', 'graphic', 'ux', 'ui', 'creative', 'art', 'visual', 'photoshop', 'figma'],
    'research-education': ['research', 'teaching', 'education', 'academic', 'professor', 'study', 'learning'],
    'legal-compliance': ['law', 'legal', 'compliance', 'regulatory', 'lawyer', 'attorney', 'contracts'],
    'healthcare-clinical': ['healthcare', 'medical', 'clinical', 'hospital', 'patient', 'nursing', 'dentist'],
    'pharma-biotech': ['pharmacy', 'pharmaceutical', 'biotech', 'drug', 'medicine', 'clinical'],
    'rehabilitation': ['physiotherapy', 'rehabilitation', 'therapy', 'physical', 'sports medicine', 'wellness'],
  };

  const pathKeywords = domainKeywords[path.id] || [];
  const allUserText = [...userSkills, ...userInterests].join(' ').toLowerCase();
  const matchedKeywords = pathKeywords.filter(keyword => allUserText.includes(keyword));

  if (pathKeywords.length > 0) {
    score += (matchedKeywords.length / pathKeywords.length) * 20;
  }

  return Math.min(Math.round(score), 100);
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
