import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();
if (!process.env.GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY in environment variables');
  process.exit(1); // Stop the server if the key is missing
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const enhanceWithAi = async(req, res) => {
  try {
    const {
            professionalSummary,
            education,
            Experience,
            projects,
            skills
    } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const systemPrompt = `You are an expert AI resume writer specializing in creating ATS-optimized, recruiter-friendly CVs for tech professionals with non-linear career paths.

Enhance the provided CV by:
1. Optimizing language for ATS compatibility
2. Highlighting transferable skills
3. Improving the professional narrative
4. Using clear, impactful formatting
5. Adding industry-specific keywords
6. Tailoring content to tech industry standards

✳️ Please return the enhanced CV in **structured JSON format** like this:

{
  "professionalSummary": "string",
  "skills": ["skill1", "skill2", "skill3"],
  "Experience": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "date": "Start – End",
      "bulletPoints": ["achievement 1", "achievement 2"]
    }
  ],
  "education": [
    {
      "institution": "School Name",
      "degree": "Degree Title",
      "year": "Year"
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Short description of what the project does and tech used"
    }
  ]
}

Only include improved content based on the input. Do not invent unrelated data.`;


    const userInput = JSON.stringify(
      {
            professionalSummary,
            education,
            Experience,
            projects,
            skills
      },
      null,
      2
    );

    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 2048
      }
    });

    const withTimeout = (promise, ms = 15000) =>
      Promise.race([
        promise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Gemini API timed out after ${ms}ms`)), ms)
        )
      ]);

    const result = await withTimeout(
      chat.sendMessage(
        `${systemPrompt}\n\nPlease enhance this CV with a focus on ATS optimization and tech industry standards:\n\n${userInput}`
      ),
      15000
    );

    res.status(200).json({
      success: true,
      enhancedCV: result.response.text()
    });
  } catch (error) {
    console.error('CV Enhancement Error:', error);
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: 'Gemini API quota exceeded. Please try again later or check your usage limits.'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error enhancing CV',
      error: error.message
    });
  }
};

export default enhanceWithAi;
