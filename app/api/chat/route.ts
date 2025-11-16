import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      tools: [{
        googleSearch: {}
      }]
    });

    const prompt = `You are a career advisor for BUE (British University in Egypt) students.

User question: ${message}

Provide helpful career advice, job recommendations, skill gap analysis, or learning path suggestions.
If the question is about jobs or careers, use Google Search to find current, real job opportunities from:
- LinkedIn
- Wuzzuf (Egypt job board)
- Forasna (Egypt/MENA job board)
- Indeed
- Local Egyptian companies

Include specific job titles, companies, salary ranges when available, and required skills.
Be concise, practical, and supportive.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ response: text });

  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response', details: error.message },
      { status: 500 }
    );
  }
}
