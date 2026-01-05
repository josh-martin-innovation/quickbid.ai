const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for your Chrome extension
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit for resume uploads

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

    // Call Kindo AI API
    const response = await fetch('https://llm.kindo.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.KINDO_API_KEY}`
      },
      body: JSON.stringify({
        model: 'azure/gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert freelance proposal writer. Your MOST IMPORTANT TASK is to match the proposal to the SPECIFIC JOB REQUIREMENTS.

CRITICAL RULES (FOLLOW STRICTLY):
1. ONLY talk about skills/experience that DIRECTLY match what the job is asking for
2. If the job asks for "data entry" - talk about data entry, NOT high-level strategy
3. If the job asks for "document organization" - talk about that, NOT AI development
4. Match the JOB LEVEL: Entry-level job = don't claim 12 years experience in complex AI
5. Keep proposals 150-250 words, professional tone
6. DO NOT oversell or mention unrelated expertise

PROPOSAL STRUCTURE:
1. Hook: Show you understand their SPECIFIC need (use their exact words)
2. Relevant experience: 2-3 points that DIRECTLY match the job requirements
3. Approach: How you'll solve THEIR specific problem
4. Closing: Confident but appropriate for the job level

TONE MATCHING:
- $50-500 job = Efficient, straightforward, no fancy titles
- $500-2000 job = Professional, moderate expertise
- $2000+ job = Strategic, senior-level expertise`
          },
          {
            role: 'user',
            content: `JOB POSTING (Read this carefully and match your response to it):

${jobDescription}

---

${userResume ? `MY BACKGROUND (Only use parts that are RELEVANT to the job above):\n${userResume}\n\n---\n\n` : ''}

TASK: Write a proposal for the job above. Focus ONLY on skills/experience that match what they're asking for. If my background is more senior than the job requires, tone it down to match the job level. Do NOT mention titles, skills, or experience that aren't relevant to this specific job.`
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

// NEW: Parse resume with AI
app.post('/api/parse-resume', async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText || resumeText.length < 100) {
      return res.status(400).json({ error: 'Resume text is required and must be at least 100 characters' });
    }

    if (!process.env.KINDO_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    console.log('Parsing resume with AI...');
    console.log('Resume text length:', resumeText.length);

    // Call Kindo AI to parse resume
    const response = await fetch('https://llm.kindo.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.KINDO_API_KEY}`
      },
      body: JSON.stringify({
        model: 'azure/gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a resume parser. Extract structured information from resumes and return it in JSON format.

Extract these fields:
- fullName: Person's full name
- email: Email address (if found)
- portfolio: Website/portfolio URL (if found)
- title: Professional title/headline (e.g., "Senior Software Engineer")
- experience: Years of experience (e.g., "8+ years")
- skills: Comma-separated list of key skills
- summary: Professional summary (200-500 characters)
- achievements: Notable projects/achievements (bullet points)
- certifications: Degrees, certifications, education

Return ONLY valid JSON, no other text. If a field is not found, use empty string.`
          },
          {
            role: 'user',
            content: `Parse this resume and return structured JSON:\n\n${resumeText}`
          }
        ],
        temperature: 0.3,
        max_tokens: 800,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Kindo API Error:', errorData);
      return res.status(response.status).json({ 
        error: 'Failed to parse resume', 
        details: errorData 
      });
    }

    const data = await response.json();
    const parsedData = JSON.parse(data.choices[0].message.content);

    console.log('✅ Resume parsed successfully');

    res.json({ 
      profile: parsedData,
      success: true 
    });

  } catch (error) {
    console.error('Resume parsing error:', error);
    res.status(500).json({ 
      error: 'Failed to parse resume', 
      message: error.message 
    });
  }
});

// NEW: Extract LinkedIn profile
app.post('/api/parse-linkedin', async (req, res) => {
  try {
    const { linkedinUrl } = req.body;

    if (!linkedinUrl || !linkedinUrl.includes('linkedin.com')) {
      return res.status(400).json({ error: 'Valid LinkedIn URL is required' });
    }

    if (!process.env.KINDO_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    console.log('Extracting LinkedIn profile from:', linkedinUrl);

    // First, try to fetch the LinkedIn page
    let linkedinHtml;
    try {
      const pageResponse = await fetch(linkedinUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      linkedinHtml = await pageResponse.text();
    } catch (fetchError) {
      console.error('Failed to fetch LinkedIn page:', fetchError);
      return res.status(400).json({ 
        error: 'Could not access LinkedIn profile. Make sure the profile is public or try manual entry instead.' 
      });
    }

    // Use AI to extract information from the HTML
    const response = await fetch('https://llm.kindo.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.KINDO_API_KEY}`
      },
      body: JSON.stringify({
        model: 'azure/gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a LinkedIn profile parser. Extract structured information from LinkedIn profile HTML and return it in JSON format.

Extract these fields:
- fullName: Person's full name
- email: Email if visible (often not public)
- portfolio: Personal website URL if listed
- title: Current job title/headline
- experience: Calculate total years from work history
- skills: Top skills listed (comma-separated)
- summary: About/summary section (200-500 characters)
- achievements: Key accomplishments from experience section
- certifications: Education and certifications

Return ONLY valid JSON. If a field is not found, use empty string.`
          },
          {
            role: 'user',
            content: `Extract profile data from this LinkedIn page HTML (first 10000 chars):\n\n${linkedinHtml.substring(0, 10000)}`
          }
        ],
        temperature: 0.3,
        max_tokens: 800,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Kindo API Error:', errorData);
      return res.status(response.status).json({ 
        error: 'Failed to extract LinkedIn data', 
        details: errorData 
      });
    }

    const data = await response.json();
    const parsedData = JSON.parse(data.choices[0].message.content);

    console.log('✅ LinkedIn profile extracted successfully');

    res.json({ 
      profile: parsedData,
      success: true 
    });

  } catch (error) {
    console.error('LinkedIn extraction error:', error);
    res.status(500).json({ 
      error: 'Failed to extract LinkedIn profile', 
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 QuickBid AI Backend running on port ${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/generate-proposal`);
  console.log('🔗 Using Kindo LLM API: https://llm.kindo.ai');
  console.log('🤖 Model: azure/gpt-4o');
  console.log('');
  console.log('📄 Resume parsing: http://localhost:${PORT}/api/parse-resume');
  console.log('🔗 LinkedIn import: http://localhost:${PORT}/api/parse-linkedin');
  
  // Verify API key is loaded
  if (process.env.KINDO_API_KEY) {
    console.log('✅ KINDO_API_KEY loaded successfully');
    console.log('   Key starts with:', process.env.KINDO_API_KEY.substring(0, 10) + '...');
  } else {
    console.log('❌ WARNING: KINDO_API_KEY is not set!');
  }
});
