import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, cvData } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
    });

    // Build conversation history
    const conversationHistory = messages.map((msg: any) =>
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n');

    const prompt = `You are a professional CV builder assistant helping a user create an ATS-friendly CV. You're having a natural conversation to gather their information step by step.

CURRENT CV DATA:
${JSON.stringify(cvData, null, 2)}

CONVERSATION SO FAR:
${conversationHistory}

INSTRUCTIONS:
1. Guide the user through building their CV section by section in this order:
   - Personal Information (name, email, phone, location)
   - Professional Summary (2-3 sentences)
   - Education (institutions, degrees, years)
   - Work Experience (companies, positions, duration, achievements)
   - Skills (technical and soft skills)

2. After each user response, acknowledge their input and ask for the next piece of information
3. Use friendly, encouraging language
4. Give tips for ATS optimization (use keywords, action verbs, quantify achievements)
5. When a section is complete, summarize it and move to the next
6. When ALL sections are complete, respond with a special completion message

CURRENT TASK: Based on the conversation, determine what information to ask for next. If the CV is complete (all sections filled), say "COMPLETE:" followed by a congratulatory message.

Respond with ONLY your next message to the user. Keep it concise and friendly.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiMessage = response.text();

    // Check if CV is complete
    const isComplete = aiMessage.includes('COMPLETE:');

    // Update CV data based on user's last message
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    const updatedCvData = { ...cvData };

    // Simple extraction logic (you can make this more sophisticated)
    if (lastUserMessage.includes('@') && !cvData.personalInfo.email) {
      updatedCvData.personalInfo.email = lastUserMessage.trim();
    }

    return NextResponse.json({
      message: isComplete ? aiMessage.replace('COMPLETE:', '').trim() : aiMessage,
      cvData: updatedCvData,
      completed: isComplete,
      downloadUrl: isComplete ? '/api/generate-cv' : undefined,
    });

  } catch (error: any) {
    console.error('CV Builder Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat', details: error.message },
      { status: 500 }
    );
  }
}
