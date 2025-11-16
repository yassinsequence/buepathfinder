// Test if API key is valid by making direct HTTP request
const https = require('https');

const apiKey = 'AIzaSyAbOZGwY2wf1gtH7jmeXUKKKa2YlubL1xY';

async function testAPIKey() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1/models?key=${apiKey}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('\nResponse:');
        try {
          const parsed = JSON.parse(data);
          if (parsed.models) {
            console.log('\n✓ API Key is VALID!\n');
            console.log('Available models:');
            parsed.models.forEach(model => {
              console.log(`- ${model.name} (${model.displayName})`);
            });
          } else {
            console.log(JSON.stringify(parsed, null, 2));
          }
        } catch (e) {
          console.log(data);
        }
        resolve();
      });
    });

    req.on('error', (error) => {
      console.error('✗ Request Error:', error.message);
      reject(error);
    });

    req.end();
  });
}

testAPIKey();
