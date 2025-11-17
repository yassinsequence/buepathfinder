// User profile storage using localStorage
// Will be replaced with Supabase when authentication is implemented

export interface UserProfile {
  cvText: string;
  cvFileName: string;
  cvUploadedAt: string;
  skills: string[];
  careerLevel: string;
  aiSummary: string;
  recommendedJobIds: string[];
  interests?: string[];
  major?: string;
  experience?: string[];
  careerPaths?: string[];
}

const PROFILE_KEY = 'bue_pathfinder_profile';

export function saveUserProfile(profile: Partial<UserProfile>): void {
  if (typeof window === 'undefined') return;

  const existing = getUserProfile();
  const updated = { ...existing, ...profile };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
}

export function getUserProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem(PROFILE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as UserProfile;
  } catch {
    return null;
  }
}

export function clearUserProfile(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROFILE_KEY);
}

export function hasUploadedCV(): boolean {
  const profile = getUserProfile();
  return !!(profile && profile.cvText);
}
