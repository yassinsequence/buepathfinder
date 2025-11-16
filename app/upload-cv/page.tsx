'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, FileText, Loader2, CheckCircle } from 'lucide-react';

export default function UploadCVPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [analysis, setAnalysis] = useState<string>('');

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
        setAnalysis(data.analysis);
        setUploadStatus('success');
      } else {
        throw new Error('No analysis returned');
      }
    } catch (error) {
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-gray-700">
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
              <Upload className="w-6 h-6 text-orange-400" />
              Upload Your CV
            </h1>
          </div>
        </div>
      </header>

      {/* Upload Container */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Let AI Analyze Your CV
            </h2>
            <p className="text-gray-300 text-lg">
              Upload your CV and get personalized career recommendations, skill gap analysis, and learning path suggestions
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-8">
            <label
              htmlFor="cv-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-orange-500 hover:bg-gray-700/50 transition-all"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-16 h-16 text-gray-400 mb-4" />
                <p className="mb-2 text-lg font-semibold text-gray-300">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-sm text-gray-400">
                  PDF, DOC, DOCX (MAX. 5MB)
                </p>
              </div>
              <input
                id="cv-upload"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
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
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-bold hover:from-orange-600 hover:to-red-700 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="bg-green-500/20 border border-green-500 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-green-400">CV Analyzed Successfully!</h3>
              </div>
              <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                {analysis}
              </div>
            </div>
          )}

          {/* Error Message */}
          {uploadStatus === 'error' && (
            <div className="bg-red-500/20 border border-red-500 rounded-xl p-6">
              <p className="text-red-400">
                Failed to analyze CV. Please try again.
              </p>
            </div>
          )}

          {/* Features List */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-gray-700 p-4 rounded-xl">
              <h4 className="font-semibold text-white mb-2">Skill Extraction</h4>
              <p className="text-gray-300 text-sm">
                AI identifies all your skills and experience
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-xl">
              <h4 className="font-semibold text-white mb-2">Career Matching</h4>
              <p className="text-gray-300 text-sm">
                Find jobs that match your profile
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-xl">
              <h4 className="font-semibold text-white mb-2">Gap Analysis</h4>
              <p className="text-gray-300 text-sm">
                Discover skills you need to learn
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
