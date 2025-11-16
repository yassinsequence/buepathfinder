import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('cv') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'CV file is required' },
        { status: 400 }
      );
    }

    // Convert file to text (you might need a PDF parser for PDFs)
    const text = await file.text();

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const prompt = `Analyze this CV/Resume for a BUE (British University in Egypt) student and provide:

CV Content:
${text}

Please provide:
1. **Skills Identified**: List all technical and soft skills found

2. **Career Level**: Entry/Mid/Senior level assessment

3. **Recommended Jobs in Egypt**: Suggest 5 job opportunities that match this profile from companies like:
   - Vodafone Egypt, Orange Egypt, Etisalat
   - IBM Egypt, Microsoft Egypt, Dell
   - Egyptian startups and tech companies
   - Multinational companies with Egypt offices
   (Mention these can be found on Wuzzuf, Forasna, LinkedIn Egypt)

4. **Skill Gaps**: What skills are missing for top roles in their field in the Egyptian job market

5. **Learning Recommendations**: Specific courses from:
   - Coursera
   - Edraak (Arabic platform)
   - Maharat Google
   - LinkedIn Learning
   - Local Egyptian training centers

Format the response clearly with headings and bullet points. Include realistic salary expectations in EGP.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const analysis = response.text();

    return NextResponse.json({ analysis });

  } catch (error: any) {
    console.error('CV Upload API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze CV', details: error.message },
      { status: 500 }
    );
  }
}
