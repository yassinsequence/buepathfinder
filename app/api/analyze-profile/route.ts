import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { education, experience, interests } = body;

    if (!education || !experience) {
      return NextResponse.json(
        { error: 'Education and experience are required' },
        { status: 400 }
      );
    }

    if (education.length < 30 || experience.length < 20) {
      return NextResponse.json(
        { error: 'Please provide more detailed information about your education and experience' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
    });

    const prompt = `Analyze this student's profile and extract detailed skills, career level, and recommendations.

EDUCATION BACKGROUND:
${education}

EXPERIENCE & PROJECTS:
${experience}

INTERESTS:
${interests?.join(', ') || 'Not specified'}

Based on this narrative, provide a response in this EXACT JSON format (no markdown, just pure JSON):
{
  "summary": "A concise 3-4 sentence professional summary highlighting their background, key strengths, and career direction",
  "skills": ["skill1", "skill2", "skill3", ...],
  "careerLevel": "entry/mid/senior",
  "major": "Their field of study extracted from education",
  "interests": [extracted career interests beyond the selected ones],
  "experience": ["Extracted experience 1", "Extracted experience 2", ...],
  "recommendedJobIds": ["job-id-1", "job-id-2", ...],
  "careerPaths": ["software-tech", "business-finance", ...]
}

IMPORTANT INSTRUCTIONS:
1. Extract 10-20 specific technical AND soft skills from their education and experience narratives
   - Technical skills: specific tools, software, methodologies they mentioned (e.g., "SolidWorks", "Python", "CAD", "AutoCAD", "Financial Modeling")
   - Soft skills: inferred abilities (e.g., "Problem Solving", "Project Management", "Teamwork", "Communication")
   - Academic skills: from courses mentioned (e.g., "Thermodynamics", "Data Structures", "Marketing Strategy")
2. Determine careerLevel based on their experience:
   - entry: student, fresh graduate, or less than 2 years experience
   - mid: 2-5 years experience or multiple internships
   - senior: 5+ years or leadership roles
3. Extract their major/field of study from the education text
4. Identify 5-10 additional career interests based on what they wrote (beyond what they selected)
5. List all experiences, internships, or projects they mentioned
6. For careerPaths, select 2-4 most relevant from: software-tech, industrial-engineering, sustainability, business-finance, media-marketing, creative-design, research-education, legal-compliance, healthcare-clinical, pharma-biotech, rehabilitation
7. For recommendedJobIds, select 5-10 most relevant job IDs based on their skills and interests:

   Engineering Jobs:
   - mech-1: Mechanical Engineer (Siemens) - CAD, SolidWorks, Manufacturing
   - mech-2: Automotive Engineer (BMW Egypt) - Automotive, Engineering
   - mech-3: HVAC Engineer (Orascom) - HVAC, Climate Control
   - civil-1: Civil Engineer (Arab Contractors) - Construction, Infrastructure
   - elec-1: Electrical Engineer (Schneider) - Electrical Systems, Power
   - eng-1: Software Engineer (Microsoft) - Programming, C#, .NET
   - eng-2: Frontend Developer (Vodafone) - React, JavaScript, UI
   - eng-3: Backend Developer (Fawry) - Node.js, APIs, Databases
   - eng-4: Full-Stack Developer (Vezeeta) - Full-stack development
   - eng-5: Data Scientist (Instabug) - Python, ML, Data Analysis
   - eng-6: DevOps Engineer (Robusta) - Docker, CI/CD, Cloud

   Energy & Sustainability:
   - energy-1: Renewable Energy Specialist - Solar, Wind, Sustainability
   - energy-2: Energy Analyst - Energy Systems, Analysis
   - energy-3: Sustainability Consultant - Environment, Climate
   - energy-4: Environmental Engineer - Environmental Engineering

   Business & Finance:
   - bus-1: Management Consultant (McKinsey) - Strategy, Consulting
   - bus-2: Financial Analyst (EFG Hermes) - Finance, Analysis
   - bus-3: Investment Banking (Commercial International Bank) - Banking, Investment
   - bus-4: Business Development (Careem) - Business Strategy, Growth

   Creative & Design:
   - cre-1: UX/UI Designer (Nagwa) - Figma, UX Research, Design
   - cre-2: Graphic Designer - Adobe Creative Suite, Visual Design
   - cre-3: Product Designer - Product Design, User Research
   - cre-4: Brand Designer - Branding, Visual Identity

   Healthcare:
   - med-1: Clinical Pharmacist - Pharmacy, Clinical Practice
   - med-2: Sports Medicine Specialist - Sports Medicine, Rehabilitation
   - med-3: Rehabilitation Specialist - Physical Therapy, Recovery
   - med-4: Medical Researcher - Research, Clinical Trials
   - pharm-1: Pharmaceutical Researcher - Drug Development, Research
   - pharm-2: Regulatory Affairs - Compliance, Regulations
   - dent-1: General Dentist - Dentistry, Patient Care
   - nurs-1: Clinical Nurse - Nursing, Patient Care
   - physio-1: Physiotherapist - Physical Therapy, Rehabilitation

   Legal:
   - law-1: Corporate Lawyer - Law, Contracts
   - law-2: Legal Consultant - Legal Advice, Compliance
   - law-3: Compliance Officer - Regulatory Compliance
   - law-4: Contracts Manager - Contract Law, Negotiation

   Marketing & Media:
   - mar-1: Digital Marketing Manager - SEO, SEM, Social Media
   - mar-2: Content Strategist - Content Creation, Strategy
   - mar-3: Social Media Manager - Social Media, Community

   Remote Opportunities:
   - rem-1: Remote Software Engineer - Programming, Remote Work
   - rem-2: Remote Content Creator - Content, Digital Media
   - rem-3: Remote Data Analyst - Data Analysis, Python

8. Be specific and extract REAL information from their narratives, not generic placeholders
9. Skills should be very specific - if they mention a course, extract the skill (e.g., "thermodynamics course" → "Thermodynamics" skill)
10. Look for action verbs and concrete activities to extract skills (e.g., "designed circuits" → "Circuit Design", "led a team" → "Leadership")`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const analysisText = response.text();

    // Parse the JSON response
    let analysisData;
    try {
      // Remove markdown code blocks if present
      const cleanText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysisData = JSON.parse(cleanText);

      // Validate and enhance fields
      if (!analysisData.skills || !Array.isArray(analysisData.skills)) {
        analysisData.skills = [];
      }

      // Ensure we have a good number of skills
      if (analysisData.skills.length < 5) {
        // Add some inferred skills based on their text
        const inferredSkills = [];
        const combinedText = `${education} ${experience}`.toLowerCase();

        if (combinedText.includes('engineer')) inferredSkills.push('Engineering Principles');
        if (combinedText.includes('design')) inferredSkills.push('Design Thinking');
        if (combinedText.includes('project')) inferredSkills.push('Project Management');
        if (combinedText.includes('team')) inferredSkills.push('Teamwork');
        if (combinedText.includes('research')) inferredSkills.push('Research');

        analysisData.skills = [...analysisData.skills, ...inferredSkills].slice(0, 15);
      }

      if (!analysisData.interests || !Array.isArray(analysisData.interests)) {
        analysisData.interests = interests || [];
      }

      if (!analysisData.careerPaths || !Array.isArray(analysisData.careerPaths)) {
        analysisData.careerPaths = ['software-tech'];
      }

      if (!analysisData.experience || !Array.isArray(analysisData.experience)) {
        analysisData.experience = [];
      }

      if (!analysisData.major) {
        analysisData.major = 'Not specified';
      }

      if (!analysisData.careerLevel) {
        analysisData.careerLevel = 'entry';
      }

      if (!analysisData.summary) {
        analysisData.summary = 'Profile built from student narrative';
      }

      if (!analysisData.recommendedJobIds || !Array.isArray(analysisData.recommendedJobIds)) {
        analysisData.recommendedJobIds = [];
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
    });

  } catch (error: any) {
    console.error('Profile Analysis API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze profile', details: error.message },
      { status: 500 }
    );
  }
}
