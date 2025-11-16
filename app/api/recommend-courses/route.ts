import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { skillName } = await request.json();

    if (!skillName) {
      return NextResponse.json(
        { error: 'Skill name is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
    });

    const prompt = `Find the BEST learning resources for the skill: "${skillName}"

Provide a response in this EXACT JSON format (no markdown, just pure JSON):
{
  "courses": [
    {
      "title": "Course Title",
      "provider": "Coursera/Udacity/LinkedIn Learning/etc",
      "url": "https://actual-real-url.com",
      "duration": "4 weeks",
      "level": "Beginner/Intermediate/Advanced",
      "free": true/false,
      "description": "Brief description of what you'll learn"
    }
  ]
}

Important guidelines:
- Provide 4-6 high-quality, REAL courses (not made up)
- Include mix of free and paid options
- Include courses from: Coursera, Udacity, LinkedIn Learning, Edraak (Arabic), Maharat Google, YouTube channels
- Prefer courses available in Egypt or online globally
- Include both Arabic and English options where available
- All URLs must be real and working

For the skill "${skillName}", recommend relevant courses now.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const coursesText = response.text();

    // Parse the JSON response
    let coursesData;
    try {
      // Remove markdown code blocks if present
      const cleanText = coursesText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      coursesData = JSON.parse(cleanText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', coursesText);
      // Fallback
      coursesData = {
        courses: []
      };
    }

    return NextResponse.json(coursesData);

  } catch (error: any) {
    console.error('Recommend Courses API error:', error);
    return NextResponse.json(
      { error: 'Failed to get course recommendations', details: error.message },
      { status: 500 }
    );
  }
}
