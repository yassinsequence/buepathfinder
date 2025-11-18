import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mammoth from 'mammoth';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Available models that actually work:
// - models/gemini-pro (text only)
// - models/gemini-pro-vision (multimodal - images)
// For PDFs, we'll use vision model or 2.0 flash

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // Use gemini-pro-vision which supports multimodal (images/docs)
    const model = genAI.getGenerativeModel({
      model: "gemini-pro-vision"
    });

    const result = await model.generateContent([
      "Extract all text from this PDF CV/Resume. Return only the text content, preserving structure.",
      {
        inlineData: {
          mimeType: "application/pdf",
          data: buffer.toString('base64')
        }
      }
    ]);

    return result.response.text();
  } catch (error: any) {
    console.error('PDF extraction error:', error);
    throw new Error(`Failed to extract PDF: ${error.message}`);
  }
}

async function extractTextFromFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (file.name.endsWith('.pdf')) {
    return await extractTextFromPDF(buffer);
  } else if (file.name.endsWith('.docx')) {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch (error: any) {
      console.error('DOCX parsing error:', error);
      throw new Error(`DOCX parsing failed: ${error.message}`);
    }
  } else if (file.name.endsWith('.doc')) {
    // .doc files are harder to parse, try as text
    return buffer.toString('utf-8');
  } else {
    // Assume plain text
    return buffer.toString('utf-8');
  }
}

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

    // Extract text from file
    let text: string;
    try {
      text = await extractTextFromFile(file);
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Could not read CV file', details: error.message },
        { status: 400 }
      );
    }

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: 'CV appears to be empty or too short. Please upload a valid CV.' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
    });

    const prompt = `Analyze this CV/Resume thoroughly and extract detailed information.

CV Content:
${text}

Provide a response in this EXACT JSON format (no markdown, just pure JSON):
{
  "summary": "A concise 3-4 sentence professional summary highlighting their background, key strengths, and career direction",
  "skills": ["skill1", "skill2", "skill3", ...],
  "careerLevel": "entry/mid/senior",
  "major": "Their field of study or current major",
  "interests": ["interest1", "interest2", ...],
  "experience": ["Company/Role 1", "Company/Role 2", ...],
  "recommendedJobIds": ["job-id-1", "job-id-2", ...],
  "careerPaths": ["software-tech", "business-finance", ...]
}

IMPORTANT INSTRUCTIONS:
1. Extract 8-15 specific technical and soft skills from their CV
2. Include their academic major/field of study
3. List 5-8 career interests/domains based on their experience and education
4. List all work experiences or internships
5. For careerPaths, select 2-4 most relevant from: software-tech, industrial-engineering, sustainability, business-finance, media-marketing, creative-design, research-education, legal-compliance, healthcare-clinical, pharma-biotech, rehabilitation
6. For recommendedJobIds, select 4-8 most relevant from:
   - Engineering: mech-1, mech-2, civil-1, elec-1, eng-1, eng-2, eng-3, eng-4, eng-5, eng-6
   - Energy: energy-1, energy-2, energy-3
   - Business: bus-1, bus-2, bus-3, bus-4
   - Creative: cre-1, cre-2, cre-3, cre-4
   - Medical: med-1, med-2, pharm-1, pharm-2, dent-1, nurs-1, physio-1
   - Law: law-1, law-2, law-3, law-4
   - Marketing: mar-1, mar-2, mar-3

Be specific and extract real information from the CV, not generic placeholders.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const analysisText = response.text();

    // Parse the JSON response
    let analysisData;
    try {
      // Remove markdown code blocks if present
      const cleanText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysisData = JSON.parse(cleanText);

      // Validate required fields
      if (!analysisData.skills || !Array.isArray(analysisData.skills)) {
        analysisData.skills = [];
      }
      if (!analysisData.interests || !Array.isArray(analysisData.interests)) {
        analysisData.interests = analysisData.skills.slice(0, 5);
      }
      if (!analysisData.careerPaths || !Array.isArray(analysisData.careerPaths)) {
        analysisData.careerPaths = ['software-tech'];
      }

    } catch (parseError) {
      console.error('Failed to parse AI response:', analysisText);
      return NextResponse.json(
        { error: 'AI analysis failed to produce valid results. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      analysis: analysisData,
      cvText: text.substring(0, 5000), // First 5000 chars only
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
