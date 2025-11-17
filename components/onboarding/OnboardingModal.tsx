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
  const [step, setStep] = useState<'choice' | 'upload' | 'build-profile-1' | 'build-profile-2' | 'build-profile-3' | 'create-cv-chat'>('choice');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Build Profile form (merged with preferences)
  const [educationStory, setEducationStory] = useState('');
  const [experienceStory, setExperienceStory] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [isAnalyzingProfile, setIsAnalyzingProfile] = useState(false);

  // CV Builder Chatbot
  const [cvChatMessages, setCvChatMessages] = useState<Array<{role: 'assistant' | 'user', content: string}>>([]);
  const [cvChatInput, setCvChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [cvData, setCvData] = useState({
    personalInfo: { name: '', email: '', phone: '', location: '' },
    summary: '',
    education: [] as Array<{institution: string, degree: string, year: string}>,
    experience: [] as Array<{company: string, position: string, duration: string, description: string}>,
    skills: [] as string[],
  });

  const availableInterests = [
    'Software Development', 'Data Science', 'Mechanical Engineering', 'Civil Engineering',
    'Renewable Energy', 'Business Strategy', 'Finance & Banking', 'Digital Marketing',
    'Graphic Design', 'UX/UI Design', 'Healthcare', 'Pharmacy', 'Dentistry',
    'Legal & Compliance', 'Research', 'Teaching', 'Sustainability'
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
          interests: data.analysis.interests || [],
          major: data.analysis.major || '',
          experience: data.analysis.experience || [],
          careerPaths: data.analysis.careerPaths || [],
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

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleAnalyzeProfile = async () => {
    setIsAnalyzingProfile(true);
    setUploadError('');

    try {
      const response = await fetch('/api/analyze-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          education: educationStory,
          experience: experienceStory,
          interests: interests,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setUploadError(data.error);
        return;
      }

      if (data.analysis) {
        saveUserProfile({
          cvText: `Education: ${educationStory}\n\nExperience: ${experienceStory}\n\nInterests: ${interests.join(', ')}`,
          cvFileName: 'Built Profile',
          cvUploadedAt: new Date().toISOString(),
          skills: data.analysis.skills || [],
          careerLevel: data.analysis.careerLevel || 'entry',
          aiSummary: data.analysis.summary || '',
          recommendedJobIds: data.analysis.recommendedJobIds || [],
          interests: interests,
          major: data.analysis.major || '',
          experience: data.analysis.experience || [],
          careerPaths: data.analysis.careerPaths || [],
        });

        onClose();
        window.location.reload();
      } else {
        setUploadError('No analysis data received from server');
      }
    } catch (error: any) {
      console.error('Profile analysis error:', error);
      setUploadError(error.message || 'Failed to analyze profile. Please try again.');
    } finally {
      setIsAnalyzingProfile(false);
    }
  };

  const handleCvChatSubmit = async () => {
    if (!cvChatInput.trim()) return;

    const userMessage = cvChatInput;
    setCvChatInput('');
    setCvChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/cv-builder-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...cvChatMessages, { role: 'user', content: userMessage }],
          cvData,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setCvChatMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        }]);
        return;
      }

      setCvChatMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message
      }]);

      if (data.cvData) {
        setCvData(data.cvData);
      }

      if (data.completed) {
        // CV is complete, download it
        setTimeout(() => {
          window.open(data.downloadUrl, '_blank');
        }, 1000);
      }
    } catch (error) {
      console.error('CV chat error:', error);
      setCvChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsChatLoading(false);
    }
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
                        Already have a CV? Upload it for instant AI-powered analysis and personalized career recommendations
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setStep('build-profile-1')}
                  className="group bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 border-2 border-amber-500/30 hover:border-amber-500 rounded-xl p-6 transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/20 rounded-lg">
                      <Sparkles className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        Get Started
                        <span className="text-xs px-2 py-1 bg-amber-500 text-slate-900 rounded-full">Recommended</span>
                      </h4>
                      <p className="text-gray-300">
                        Share your education, experience, and interests - our AI will build your profile and find the perfect career paths
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setStep('create-cv-chat');
                    setCvChatMessages([{
                      role: 'assistant',
                      content: "Hi! I'm your CV builder assistant. I'll help you create an ATS-friendly CV that gets noticed by recruiters. Let's start with your personal information. What's your full name?"
                    }]);
                  }}
                  className="group bg-slate-700 hover:bg-slate-600 border-2 border-slate-600 hover:border-amber-500 rounded-xl p-6 transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/20 rounded-lg">
                      <FileText className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">Create Your CV</h4>
                      <p className="text-gray-300">
                        Don't have a CV? Chat with our AI to build a professional, ATS-friendly CV from scratch
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


          {/* Build Profile - Step 1: Education */}
          {step === 'build-profile-1' && (
            <div className="space-y-6">
              <button
                onClick={() => setStep('choice')}
                className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-2"
              >
                ← Back
              </button>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">Step 1 of 3</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Tell us about your education</h3>
                <p className="text-gray-300 text-sm">Share your academic journey, what you're studying, and what excites you about your field</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Education Story
                </label>
                <textarea
                  value={educationStory}
                  onChange={(e) => setEducationStory(e.target.value)}
                  placeholder="Example: I'm a third-year Mechanical Engineering student at BUE. I've always been fascinated by how things work, and I love working on design projects. I've taken courses in thermodynamics, CAD design, and manufacturing processes. My senior project focuses on renewable energy systems..."
                  rows={8}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500 resize-none"
                />
                <p className="text-gray-400 text-xs mt-2">
                  {educationStory.length} characters • Minimum 100 characters recommended
                </p>
              </div>

              <button
                onClick={() => setStep('build-profile-2')}
                disabled={educationStory.length < 50}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Experience
              </button>
            </div>
          )}

          {/* Build Profile - Step 2: Experience */}
          {step === 'build-profile-2' && (
            <div className="space-y-6">
              <button
                onClick={() => setStep('build-profile-1')}
                className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-2"
              >
                ← Back
              </button>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">Step 2 of 3</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Share your experience</h3>
                <p className="text-gray-300 text-sm">Tell us about internships, projects, volunteer work, or any relevant experience</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Experience Story
                </label>
                <textarea
                  value={experienceStory}
                  onChange={(e) => setExperienceStory(e.target.value)}
                  placeholder="Example: Last summer, I interned at Siemens Egypt where I worked on automation systems. I helped design and test control circuits for industrial machinery. I also built a small solar-powered device for my university's innovation competition. I'm comfortable with SolidWorks and AutoCAD from my coursework..."
                  rows={8}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500 resize-none"
                />
                <p className="text-gray-400 text-xs mt-2">
                  {experienceStory.length} characters • If you don't have work experience, share projects or coursework
                </p>
              </div>

              <button
                onClick={() => setStep('build-profile-3')}
                disabled={experienceStory.length < 30}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Interests
              </button>
            </div>
          )}

          {/* Build Profile - Step 3: Interests */}
          {step === 'build-profile-3' && (
            <div className="space-y-6">
              <button
                onClick={() => setStep('build-profile-2')}
                className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-2"
              >
                ← Back
              </button>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">Step 3 of 3</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">What interests you?</h3>
                <p className="text-gray-300 text-sm">Select all career areas that interest you</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Your Career Interests (select at least 2)
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

              {uploadError && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                  <p className="text-red-400 text-sm">{uploadError}</p>
                </div>
              )}

              <button
                onClick={handleAnalyzeProfile}
                disabled={interests.length < 2 || isAnalyzingProfile}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzingProfile ? 'Analyzing Your Profile...' : 'Build My Profile'}
              </button>
            </div>
          )}

          {/* CV Builder Chatbot */}
          {step === 'create-cv-chat' && (
            <div className="space-y-4">
              <button
                onClick={() => setStep('choice')}
                className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-2"
              >
                ← Back
              </button>

              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-2">Create Your ATS-Friendly CV</h3>
                <p className="text-gray-300 text-sm">Chat with our AI assistant to build a professional CV that gets past Applicant Tracking Systems</p>
              </div>

              {/* Chat Messages */}
              <div className="bg-slate-900 rounded-lg p-4 h-[400px] overflow-y-auto space-y-4">
                {cvChatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === 'user'
                          ? 'bg-amber-500 text-slate-900'
                          : 'bg-slate-700 text-white'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700 text-white rounded-lg p-3">
                      <p className="text-sm">Typing...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={cvChatInput}
                  onChange={(e) => setCvChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCvChatSubmit()}
                  placeholder="Type your response..."
                  className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  disabled={isChatLoading}
                />
                <button
                  onClick={handleCvChatSubmit}
                  disabled={isChatLoading || !cvChatInput.trim()}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>

              <div className="text-xs text-gray-400 text-center">
                Tip: Be specific about your achievements and use action verbs. Our AI will format everything for ATS optimization.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
