'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, FileText, Loader2, CheckCircle } from 'lucide-react';
import { saveUserProfile } from '@/lib/storage/userProfile';

export default function UploadCVPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [summary, setSummary] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      const formData = new FormData();
      formData.append('cv', file);

      const response = await fetch('/api/upload-cv', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.analysis) {
        // Save to localStorage - save ALL fields from AI analysis
        saveUserProfile({
          cvText: data.cvText,
          cvFileName: data.fileName,
          cvUploadedAt: new Date().toISOString(),
          skills: data.analysis.skills || [],
          careerLevel: data.analysis.careerLevel || 'entry',
          aiSummary: data.analysis.summary || '',
          recommendedJobIds: data.analysis.recommendedJobIds || [],
          interests: data.analysis.interests || [],
          major: data.analysis.major || '',
          experience: data.analysis.experience || [],
          careerPaths: data.analysis.careerPaths || [],
        });

        setSummary(data.analysis.summary || data.analysis);
        setUploadStatus('success');
      } else {
        throw new Error('No analysis returned');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Upload className="w-6 h-6 text-amber-500" />
              Upload Your CV
            </h1>
          </div>
        </div>
      </header>

      {/* Upload Container */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Get AI-Powered Career Insights
            </h2>
            <p className="text-gray-300 text-lg">
              Upload your CV to receive personalized recommendations and save it to your dashboard
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-8">
            <label
              htmlFor="cv-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-amber-500 hover:bg-slate-700/50 transition-all"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-16 h-16 text-gray-400 mb-4" />
                <p className="mb-2 text-lg font-semibold text-gray-300">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-sm text-gray-400">
                  PDF, DOC, DOCX, TXT (MAX. 5MB)
                </p>
              </div>
              <input
                id="cv-upload"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Upload Button */}
          {file && (
            <div className="flex justify-center mb-8">
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="flex items-center gap-3 px-8 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-400 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Analyze CV with AI
                  </>
                )}
              </button>
            </div>
          )}

          {/* Success Message */}
          {uploadStatus === 'success' && (
            <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-green-400">CV Analyzed Successfully!</h3>
              </div>
              <p className="text-gray-200 leading-relaxed mb-4">
                {summary}
              </p>
              <button
                onClick={goToDashboard}
                className="px-6 py-3 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
              >
                View in Dashboard →
              </button>
            </div>
          )}

          {/* Error Message */}
          {uploadStatus === 'error' && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6">
              <p className="text-red-400">
                Failed to analyze CV. Please try again.
              </p>
            </div>
          )}

          {/* Features List */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-700/50 border border-slate-600 p-4 rounded-xl">
              <h4 className="font-semibold text-white mb-2">Profile Analysis</h4>
              <p className="text-gray-300 text-sm">
                AI analyzes your skills and experience level
              </p>
            </div>
            <div className="bg-slate-700/50 border border-slate-600 p-4 rounded-xl">
              <h4 className="font-semibold text-white mb-2">Personalized Matches</h4>
              <p className="text-gray-300 text-sm">
                Get tailored Egyptian job recommendations
              </p>
            </div>
            <div className="bg-slate-700/50 border border-slate-600 p-4 rounded-xl">
              <h4 className="font-semibold text-white mb-2">Dashboard Access</h4>
              <p className="text-gray-300 text-sm">
                Your CV is saved for future reference
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
