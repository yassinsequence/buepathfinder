// Test Gemini API directly
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('AIzaSyAbOZGwY2wf1gtH7jmeXUKKKa2YlubL1xY');

async function testChat() {
  try {
    console.log('Testing Chat API...');
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const prompt = `You are a career advisor for BUE (British University in Egypt) students.

User question: What jobs are available for software engineers in Egypt?

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

    console.log('\n✓ Chat API Success!');
    console.log('Response:', text.substring(0, 200) + '...');
  } catch (error) {
    console.error('\n✗ Chat API Error:');
    console.error('Error message:', error.message);
    console.error('Full error:', error);
  }
}

async function testCVAnalysis() {
  try {
    console.log('\n\nTesting CV Analysis API...');
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const sampleCV = `John Doe
Software Engineer
Skills: JavaScript, React, Node.js, Python
Experience: 2 years at startup
Education: Computer Science, BUE`;

    const prompt = `Analyze this CV/Resume for a BUE (British University in Egypt) student and provide:

CV Content:
${sampleCV}

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

    console.log('\n✓ CV Analysis API Success!');
    console.log('Analysis:', analysis.substring(0, 200) + '...');
  } catch (error) {
    console.error('\n✗ CV Analysis API Error:');
    console.error('Error message:', error.message);
    console.error('Full error:', error);
  }
}

// Run tests
(async () => {
  await testChat();
  await testCVAnalysis();
})();
