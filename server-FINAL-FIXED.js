const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for your Chrome extension
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'QuickBid AI Backend is running!' });
});

// Main endpoint to generate proposals
app.post('/api/generate-proposal', async (req, res) => {
  try {
    const { jobDescription, userResume } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ error: 'Job description is required' });
    }

    // Check if API key is set
    if (!process.env.KINDO_API_KEY) {
      console.error('KINDO_API_KEY is not set in environment variables');
      return res.status(500).json({ error: 'API key not configured' });
    }

    console.log('Generating proposal...');
    console.log('Job description length:', jobDescription.length);
    if (userResume) {
      console.log('User resume length:', userResume.length);
    }

    // Call Kindo AI API with correct model name
    const response = await fetch('https://llm.kindo.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.KINDO_API_KEY}`
      },
      body: JSON.stringify({
        model: 'azure/gpt-4o',  // Correct model for Kindo LLM API
        messages: [
          {
            role: 'system',
            content: `You are an expert freelance proposal writer. Your job is to analyze job descriptions and create compelling, personalized proposals that are HIGHLY RELEVANT to the specific job requirements.

CRITICAL INSTRUCTIONS:
1. READ THE JOB DESCRIPTION CAREFULLY - Your proposal must match what the job is asking for
2. Only mention skills and experience that are DIRECTLY RELEVANT to this specific job
3. DO NOT talk about unrelated skills or experience
4. If the user's background doesn't match the job perfectly, focus on transferable skills
5. Keep proposals professional and concise (150-250 words)

Your proposal should include:
1. A hook that shows you understand their SPECIFIC need
2. 2-3 RELEVANT qualifications or past experiences that match the job requirements
3. A brief approach to solving THEIR specific problem (not a generic approach)
4. A confident closing

IMPORTANT: Match your tone and expertise to the job level (entry/intermediate/expert).`
          },
          {
            role: 'user',
            content: `ANALYZE THIS JOB CAREFULLY:

Job Description:
${jobDescription}

${userResume ? `My Background:\n${userResume}\n\n` : ''}

TASK: Write a personalized freelance proposal for THIS SPECIFIC JOB. Make sure every sentence is relevant to what they're asking for. Do not include skills or experience that don't match this job.`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Kindo API Error:', errorData);
      return res.status(response.status).json({ 
        error: 'Failed to generate proposal', 
        details: errorData 
      });
    }

    const data = await response.json();
    const proposal = data.choices[0].message.content;

    console.log('✅ Proposal generated successfully');
    console.log('Proposal length:', proposal.length, 'characters');

    res.json({ 
      proposal,
      success: true 
    });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 QuickBid AI Backend running on port ${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/generate-proposal`);
  console.log('🔗 Using Kindo LLM API: https://llm.kindo.ai');
  console.log('🤖 Model: azure/gpt-4o');
  
  // Verify API key is loaded
  if (process.env.KINDO_API_KEY) {
    console.log('✅ KINDO_API_KEY loaded successfully');
    console.log('   Key starts with:', process.env.KINDO_API_KEY.substring(0, 10) + '...');
  } else {
    console.log('❌ WARNING: KINDO_API_KEY is not set!');
  }
});
