'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Loader2, Bot, User, FileText, MessageCircle, Briefcase, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type ChatMode = 'general' | 'cover-letter' | 'interview-prep' | 'career-advice';

export default function ChatPage() {
  const [mode, setMode] = useState<ChatMode>('general');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your BUE PathFinder AI career advisor. Choose a mode below or ask me anything about careers, jobs, and professional development!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const modes = [
    {
      id: 'general' as ChatMode,
      name: 'General Career Advice',
      icon: MessageCircle,
      color: 'blue',
      description: 'Ask anything about careers and jobs'
    },
    {
      id: 'career-advice' as ChatMode,
      name: 'Career Guidance',
      icon: Briefcase,
      color: 'green',
      description: 'Get personalized career path recommendations'
    },
    {
      id: 'cover-letter' as ChatMode,
      name: 'Cover Letter Writer',
      icon: FileText,
      color: 'purple',
      description: 'Create tailored cover letters'
    },
    {
      id: 'interview-prep' as ChatMode,
      name: 'Interview Prep',
      icon: Sparkles,
      color: 'amber',
      description: 'Practice interviews and get tips'
    }
  ];

  const getModeColor = (m: ChatMode): 'blue' | 'green' | 'purple' | 'amber' => {
    const modeConfig = modes.find(mo => mo.id === m);
    return (modeConfig?.color as 'blue' | 'green' | 'purple' | 'amber') || 'blue';
  };

  const handleModeChange = (newMode: ChatMode) => {
    setMode(newMode);

    let modeMessage = '';
    switch (newMode) {
      case 'cover-letter':
        modeMessage = 'Great! I\'ll help you create a compelling cover letter. Please tell me:\n\n1. What position are you applying for?\n2. At which company?\n3. What are your key qualifications or experiences?\n4. Why are you interested in this role?';
        break;
      case 'interview-prep':
        modeMessage = 'Perfect! Let\'s prepare you for your interview. Tell me:\n\n1. What position/company are you interviewing for?\n2. What type of interview is it? (Technical, behavioral, case study, etc.)\n3. Any specific concerns or topics you want to practice?';
        break;
      case 'career-advice':
        modeMessage = 'I\'m here to help guide your career path! Please share:\n\n1. Your current background (major, year, experience)\n2. Your interests and goals\n3. Any specific career questions or dilemmas you have';
        break;
      default:
        modeMessage = 'I\'m ready to help with any career-related questions you have!';
    }

    setMessages([
      {
        role: 'assistant',
        content: modeMessage
      }
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          mode: mode,
          history: messages
        }),
      });

      const data = await response.json();

      if (data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        throw new Error('No response from AI');
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      hover: 'hover:bg-blue-600',
      border: 'border-blue-500',
      text: 'text-blue-400',
      activeBg: 'bg-blue-500/10'
    },
    green: {
      bg: 'bg-green-500',
      hover: 'hover:bg-green-600',
      border: 'border-green-500',
      text: 'text-green-400',
      activeBg: 'bg-green-500/10'
    },
    purple: {
      bg: 'bg-purple-500',
      hover: 'hover:bg-purple-600',
      border: 'border-purple-500',
      text: 'text-purple-400',
      activeBg: 'bg-purple-500/10'
    },
    amber: {
      bg: 'bg-amber-500',
      hover: 'hover:bg-amber-600',
      border: 'border-amber-500',
      text: 'text-amber-400',
      activeBg: 'bg-amber-500/10'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/explore"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Link>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Bot className="w-6 h-6 text-amber-500" />
                AI Career Advisor
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Modes */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 sticky top-8">
              <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">
                Chat Modes
              </h3>
              <div className="space-y-2">
                {modes.map((m) => {
                  const Icon = m.icon;
                  const colors = colorClasses[m.color as keyof typeof colorClasses];
                  const isActive = mode === m.id;

                  return (
                    <button
                      key={m.id}
                      onClick={() => handleModeChange(m.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all ${
                        isActive
                          ? `${colors.activeBg} border ${colors.border}`
                          : 'bg-slate-900/50 border border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`w-4 h-4 ${isActive ? colors.text : 'text-gray-400'}`} />
                        <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-300'}`}>
                          {m.name}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {m.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Quick Tips */}
              <div className="mt-6 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                <p className="text-xs text-gray-400 mb-2 font-semibold">Quick Tips:</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Be specific about your goals</li>
                  <li>• Share your background</li>
                  <li>• Ask follow-up questions</li>
                  <li>• Request examples</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl shadow-2xl flex flex-col h-[calc(100vh-200px)]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className={`w-8 h-8 ${colorClasses[getModeColor(mode)].bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? `${colorClasses[getModeColor(mode)].bg} text-white`
                          : 'bg-slate-700 text-gray-100'
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>

                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className={`w-8 h-8 ${colorClasses[getModeColor(mode)].bg} rounded-full flex items-center justify-center`}>
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-slate-700 rounded-2xl px-4 py-3">
                      <Loader2 className={`w-5 h-5 ${colorClasses[getModeColor(mode)].text} animate-spin`} />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      mode === 'cover-letter' ? 'Describe the position and your qualifications...' :
                      mode === 'interview-prep' ? 'What position are you interviewing for?' :
                      mode === 'career-advice' ? 'What career guidance do you need?' :
                      'Ask about careers, skills, or programs...'
                    }
                    className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-full border border-slate-600 focus:outline-none focus:border-amber-500"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className={`px-6 py-3 ${colorClasses[getModeColor(mode)].bg} ${colorClasses[getModeColor(mode)].hover} text-white rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
