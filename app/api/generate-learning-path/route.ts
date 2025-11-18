import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { userSkills, targetRole, requiredSkills, userLevel } = await request.json();

    if (!targetRole || !requiredSkills) {
      return NextResponse.json(
        { error: 'Target role and required skills are required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
    });

    const prompt = `You are a career development expert creating a personalized learning path for a BUE student.

**User Profile:**
- Current Skills: ${userSkills?.length > 0 ? userSkills.join(', ') : 'No skills listed yet'}
- Career Level: ${userLevel || 'entry'}
- Target Role: ${targetRole}

**Required Skills for Target Role:**
${requiredSkills.join(', ')}

**Task:** Create a comprehensive, actionable learning path that will help this student acquire the skills needed for their target role.

Provide a response in this EXACT JSON format (no markdown, just pure JSON):
{
  "skillGapAnalysis": {
    "matchPercentage": 75,
    "skillsYouHave": ["skill1", "skill2"],
    "skillsToLearn": [
      {
        "name": "Skill Name",
        "priority": "high/medium/low",
        "estimatedTime": "2-4 weeks",
        "reason": "Why this skill is important for the role"
      }
    ]
  },
  "learningPath": {
    "totalDuration": "3-6 months",
    "phases": [
      {
        "phase": 1,
        "title": "Phase Title (e.g., Foundations)",
        "duration": "4-6 weeks",
        "skills": ["skill1", "skill2"],
        "description": "What you'll accomplish in this phase",
        "courses": [
          {
            "title": "Course Title",
            "provider": "Coursera/Udacity/LinkedIn Learning/Edraak/YouTube/etc",
            "url": "https://real-url.com",
            "duration": "4 weeks",
            "free": true/false,
            "skillsCovered": ["skill1", "skill2"]
          }
        ]
      }
    ]
  },
  "milestones": [
    {
      "week": 4,
      "goal": "Complete foundational courses",
      "deliverable": "Build a simple project demonstrating skill X"
    }
  ],
  "careerReadiness": {
    "currentLevel": "Beginner/Intermediate/Advanced",
    "afterCompletion": "Intermediate/Advanced/Job-Ready",
    "estimatedTimeToJobReady": "3-6 months"
  },
  "actionableNextSteps": [
    "Step 1: Start with [specific course/action]",
    "Step 2: Practice by [specific practice suggestion]",
    "Step 3: Build [specific project idea]"
  ]
}

**Important Guidelines:**
1. Analyze skill gaps realistically - compare user's current skills with required skills
2. Prioritize skills based on importance for the target role
3. Create 2-4 learning phases with logical progression (foundations → intermediate → advanced → specialization)
4. Recommend REAL courses from: Coursera, Udacity, LinkedIn Learning, Edraak (for Arabic), Maharat Google, FutureLearn, YouTube channels
5. Include mix of free and paid resources (prefer free when quality is similar)
6. Give practical project ideas for hands-on learning
7. Be realistic about time commitments (account for part-time study)
8. Focus on Egyptian/MENA job market context
9. Include both Arabic and English resources where appropriate

Generate the personalized learning path now.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const pathText = response.text();

    // Parse the JSON response
    let pathData;
    try {
      // Remove markdown code blocks if present
      const cleanText = pathText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      pathData = JSON.parse(cleanText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', pathText);
      // Return a fallback structure
      return NextResponse.json(
        {
          error: 'Failed to generate learning path',
          details: 'Could not parse AI response'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(pathData);

  } catch (error: any) {
    console.error('Learning Path API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate learning path', details: error.message },
      { status: 500 }
    );
  }
}
