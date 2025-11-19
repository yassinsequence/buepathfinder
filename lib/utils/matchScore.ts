// Match score calculation for job recommendations
import { CareerOpportunity } from '@/lib/data/egyptian-careers';
import { UserProfile } from '@/lib/storage/userProfile';

export interface JobMatchScore {
  jobId: string;
  matchPercentage: number;
  skillMatch: number;
  majorMatch: boolean;
  levelMatch: boolean;
  matchedSkills: string[];
  missingSkills: string[];
}

/**
 * Calculate how well a job matches a user's profile
 * @param job - The career opportunity
 * @param profile - User's profile with skills, major, career level
 * @returns Match score object with percentage and details
 */
export function calculateJobMatch(
  job: CareerOpportunity,
  profile: UserProfile
): JobMatchScore {
  const userSkills = profile.skills.map(s => s.toLowerCase().trim());
  const requiredSkills = job.requiredSkills.map(s => s.toLowerCase().trim());
  const userMajor = profile.major?.toLowerCase().trim() || '';
  const userLevel = profile.careerLevel.toLowerCase();

  // 1. Skill matching (60% weight)
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  requiredSkills.forEach(reqSkill => {
    const isMatched = userSkills.some(userSkill =>
      userSkill.includes(reqSkill) ||
      reqSkill.includes(userSkill) ||
      userSkill === reqSkill
    );

    if (isMatched) {
      matchedSkills.push(reqSkill);
    } else {
      missingSkills.push(reqSkill);
    }
  });

  const skillMatchPercentage = requiredSkills.length > 0
    ? (matchedSkills.length / requiredSkills.length) * 100
    : 0;

  // 2. Major matching (25% weight)
  const majorMatch = job.recommendedMajors.some(major =>
    major.toLowerCase().includes(userMajor) ||
    userMajor.includes(major.toLowerCase())
  );
  const majorMatchScore = majorMatch ? 100 : 0;

  // 3. Experience level matching (15% weight)
  const levelMatch = job.experienceLevel === userLevel;
  const levelMatchScore = levelMatch ? 100 :
    // Partial match if one level difference
    (job.experienceLevel === 'mid' && userLevel === 'entry') ? 50 :
    (job.experienceLevel === 'entry' && userLevel === 'mid') ? 70 :
    (job.experienceLevel === 'senior' && userLevel === 'mid') ? 50 :
    30;

  // Calculate weighted final score
  const finalScore = (
    (skillMatchPercentage * 0.60) +
    (majorMatchScore * 0.25) +
    (levelMatchScore * 0.15)
  );

  return {
    jobId: job.id,
    matchPercentage: Math.round(finalScore),
    skillMatch: Math.round(skillMatchPercentage),
    majorMatch,
    levelMatch,
    matchedSkills: matchedSkills.map(s =>
      job.requiredSkills.find(rs => rs.toLowerCase() === s) || s
    ),
    missingSkills: missingSkills.map(s =>
      job.requiredSkills.find(rs => rs.toLowerCase() === s) || s
    ),
  };
}

/**
 * Calculate match scores for multiple jobs and sort by relevance
 * @param jobs - Array of career opportunities
 * @param profile - User's profile
 * @returns Array of jobs with their match scores, sorted by match percentage (highest first)
 */
export function rankJobsByMatch(
  jobs: CareerOpportunity[],
  profile: UserProfile
): Array<CareerOpportunity & { matchScore: JobMatchScore }> {
  const jobsWithScores = jobs.map(job => ({
    ...job,
    matchScore: calculateJobMatch(job, profile),
  }));

  // Sort by match percentage (highest first)
  return jobsWithScores.sort((a, b) =>
    b.matchScore.matchPercentage - a.matchScore.matchPercentage
  );
}

/**
 * Get color class based on match percentage
 */
export function getMatchColor(percentage: number): string {
  if (percentage >= 80) return 'text-green-400 bg-green-500/20 border-green-500/50';
  if (percentage >= 60) return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
  if (percentage >= 40) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
  return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
}

/**
 * Get match label based on percentage
 */
export function getMatchLabel(percentage: number): string {
  if (percentage >= 80) return 'Excellent Match';
  if (percentage >= 60) return 'Good Match';
  if (percentage >= 40) return 'Moderate Match';
  return 'Potential Match';
}
