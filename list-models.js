// List available Gemini models
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('AIzaSyAbOZGwY2wf1gtH7jmeXUKKKa2YlubL1xY');

async function listModels() {
  try {
    console.log('Listing available Gemini models...\n');

    // Try common model names
    const modelNames = [
      'gemini-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'models/gemini-pro',
      'models/gemini-1.5-pro',
      'models/gemini-1.5-flash'
    ];

    for (const modelName of modelNames) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Hello');
        console.log(`✓ ${modelName} - WORKS`);
      } catch (error) {
        console.log(`✗ ${modelName} - ${error.message.split('\n')[0]}`);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

listModels();
