// Core Types for PathFinder AI

export interface Skill {
  id: string;
  name: string;
  category: string;
  userHasSkill?: boolean;
}

export interface CareerPath {
  id: string;
  title: string;
  organization: string;
  logo?: string;
  type: 'job' | 'postgraduate';
  sector: string;
  location: string;
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  tuitionRange?: {
    min: number;
    max: number;
    currency: string;
  };
  requiredSkills: Skill[];
  recommendedMajors: string[];
  description: string;
  duration?: string;
  experienceLevel?: 'entry' | 'mid' | 'senior';
  remote?: boolean;
  applicationUrl?: string;
  universityUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostgraduateProgram extends CareerPath {
  type: 'postgraduate';
  university: string;
  degree: string;
  entryRequirements: string[];
  focusAreas: string[];
  studyMode: 'full-time' | 'part-time' | 'online' | 'hybrid';
}

export interface JobListing extends CareerPath {
  type: 'job';
  responsibilities: string[];
  tools: string[];
  careerProgression?: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  major?: string;
  university?: string;
  graduationYear?: number;
  skills: Skill[];
  savedPaths: string[];
  cvUrl?: string;
  linkedinUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkillGap {
  pathId: string;
  missingSkills: Skill[];
  matchPercentage: number;
  learningResources: LearningResource[];
}

export interface LearningResource {
  id: string;
  title: string;
  provider: 'Coursera' | 'Edraak' | 'LinkedIn Learning' | 'FutureLearn' | 'Maharat Google';
  url: string;
  duration: string;
  language: 'en' | 'ar';
  skillsCovered: string[];
  free: boolean;
}

export interface ExplorerCategory {
  id: string;
  title: string;
  description: string;
  paths: CareerPath[];
  icon?: string;
}
