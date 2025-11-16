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
      model: 'gemini-2.0-flash',
    });

    const prompt = `You are a career advisor for BUE (British University in Egypt) students.

User question: ${message}

Provide helpful career advice, job recommendations, skill gap analysis, or learning path suggestions.

When discussing jobs or careers:
- Mention real companies hiring in Egypt (like Vodafone Egypt, Orange Egypt, IBM Egypt, Microsoft Egypt, etc.)
- Reference popular Egyptian job platforms: Wuzzuf, Forasna, LinkedIn Egypt
- Include realistic salary ranges for Egypt (in EGP or USD)
- Suggest relevant skills needed for the Egyptian job market
- Mention local universities and training centers

Be concise, practical, and supportive. Focus on actionable advice for BUE students.`;

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
