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
      model: 'gemini-2.0-flash',
    });

    const prompt = `Analyze this CV/Resume for a BUE (British University in Egypt) student.

CV Content:
${text}

Provide a response in this EXACT JSON format (no markdown, just pure JSON):
{
  "summary": "A single concise paragraph (3-4 sentences) summarizing their profile, strengths, and career direction",
  "skills": ["skill1", "skill2", "skill3"],
  "careerLevel": "entry/mid/senior",
  "recommendedJobIds": ["eng-1", "eng-4", "bus-1"]
}

The recommendedJobIds should match opportunities from these Egyptian companies:
- Engineering & Tech: Vodafone Egypt (eng-1), IBM (eng-3), Instabug (eng-4), Fawry (eng-5), Etisalat (eng-6)
- Business: KPMG (bus-1), CIB (bus-2), PwC (bus-3)
- Creative: Vezeeta (cre-1), Leo Burnett (cre-2), Tamatem (cre-4)
- Medical: Cleopatra Hospitals (med-1), Vacsera (med-2), GSK (med-4)
- Law: Shalakany (law-1), NBE (law-2), Juhayna (law-4)
- Remote: Andela (rem-1), Paymob (rem-2), Udacity (rem-3)
- Marketing: Jumia (mar-1), Unilever (mar-2), Schneider (mar-3)

Choose 3-5 most relevant job IDs based on their background.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const analysisText = response.text();

    // Parse the JSON response
    let analysisData;
    try {
      // Remove markdown code blocks if present
      const cleanText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysisData = JSON.parse(cleanText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', analysisText);
      // Fallback to raw text
      analysisData = {
        summary: analysisText,
        skills: [],
        careerLevel: 'entry',
        recommendedJobIds: []
      };
    }

    return NextResponse.json({
      analysis: analysisData,
      cvText: text,
      fileName: file.name
    });

  } catch (error: any) {
    console.error('CV Upload API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze CV', details: error.message },
      { status: 500 }
    );
  }
}
