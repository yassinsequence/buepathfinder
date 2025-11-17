'use client';

import { useState } from 'react';
import { Upload, FileText, Sparkles, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { saveUserProfile } from '@/lib/storage/userProfile';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<'choice' | 'upload' | 'preferences'>('choice');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Preferences form
  const [major, setMajor] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState('entry');

  const availableInterests = [
    'Technology', 'Business', 'Design', 'Marketing', 'Engineering',
    'Healthcare', 'Law', 'Education', 'Sales', 'Research'
  ];

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadCV = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('cv', file);

      const response = await fetch('/api/upload-cv', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        setUploadError(data.error + (data.details ? `: ${data.details}` : ''));
        return;
      }

      if (data.analysis) {
        saveUserProfile({
          cvText: data.cvText,
          cvFileName: data.fileName,
          cvUploadedAt: new Date().toISOString(),
          skills: data.analysis.skills || [],
          careerLevel: data.analysis.careerLevel || 'entry',
          aiSummary: data.analysis.summary || data.analysis,
          recommendedJobIds: data.analysis.recommendedJobIds || [],
        });

        onClose();
        window.location.reload();
      } else {
        setUploadError('No analysis data received from server');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Failed to analyze CV. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSavePreferences = () => {
    // Save basic preferences
    saveUserProfile({
      cvText: `Major: ${major}\nInterests: ${interests.join(', ')}\nExperience: ${experienceLevel}`,
      cvFileName: 'Quick Preferences',
      cvUploadedAt: new Date().toISOString(),
      skills: interests,
      careerLevel: experienceLevel as any,
      aiSummary: `${experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)} level professional interested in ${interests.join(', ')} with background in ${major}`,
      recommendedJobIds: [],
    });

    onClose();
    window.location.reload();
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome to BUE PathFinder</h2>
              <p className="text-slate-800">Let's personalize your career exploration journey</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-900/10 rounded-lg transition-colors">
              <X className="w-6 h-6 text-slate-900" />
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Step 1: Choice */}
          {step === 'choice' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                How would you like to start?
              </h3>

              <div className="grid gap-4">
                <button
                  onClick={() => setStep('upload')}
                  className="group bg-slate-700 hover:bg-slate-600 border-2 border-slate-600 hover:border-amber-500 rounded-xl p-6 transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/20 rounded-lg">
                      <Upload className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">Upload Your CV</h4>
                      <p className="text-gray-300">
                        Get AI-powered analysis and personalized recommendations based on your experience
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setStep('preferences')}
                  className="group bg-slate-700 hover:bg-slate-600 border-2 border-slate-600 hover:border-amber-500 rounded-xl p-6 transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/20 rounded-lg">
                      <Sparkles className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">Quick Start</h4>
                      <p className="text-gray-300">
                        Answer a few questions about your education and interests
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white text-center py-4 transition-colors"
                >
                  Skip for now and explore freely
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Upload CV */}
          {step === 'upload' && (
            <div className="space-y-6">
              <button
                onClick={() => setStep('choice')}
                className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-2"
              >
                ← Back
              </button>

              <h3 className="text-2xl font-bold text-white mb-4">Upload Your CV</h3>

              <label
                htmlFor="cv-upload-onboard"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-amber-500 hover:bg-slate-700/50 transition-all"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm font-semibold text-gray-300">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-400">PDF, DOC, DOCX, TXT (MAX. 5MB)</p>
                </div>
                <input
                  id="cv-upload-onboard"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                />
              </label>

              {uploadError && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                  <p className="text-red-400 text-sm">{uploadError}</p>
                </div>
              )}

              {file && (
                <button
                  onClick={handleUploadCV}
                  disabled={isUploading}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Analyzing...' : 'Continue'}
                </button>
              )}
            </div>
          )}

          {/* Step 3: Quick Preferences */}
          {step === 'preferences' && (
            <div className="space-y-6">
              <button
                onClick={() => setStep('choice')}
                className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-2"
              >
                ← Back
              </button>

              <h3 className="text-2xl font-bold text-white mb-4">Tell us about yourself</h3>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Major or Field of Study
                </label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder="e.g., Computer Science, Business, Engineering"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Experience Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['entry', 'mid', 'senior'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setExperienceLevel(level)}
                      className={`py-3 rounded-lg font-medium transition-all ${
                        experienceLevel === level
                          ? 'bg-amber-500 text-slate-900'
                          : 'bg-slate-700 text-gray-300 hover:bg-slate-600 border border-slate-600'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Interests (select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableInterests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        interests.includes(interest)
                          ? 'bg-amber-500 text-slate-900'
                          : 'bg-slate-700 text-gray-300 hover:bg-slate-600 border border-slate-600'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSavePreferences}
                disabled={!major || interests.length === 0}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Exploring
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
