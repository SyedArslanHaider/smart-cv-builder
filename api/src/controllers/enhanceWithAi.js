import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();
if (!process.env.GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY in environment variables');
  process.exit(1); // Stop the server if the key is missing
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const enhanceWithAi = async ({
  professionalSummary,
  education,
  experience,
  projects,
  skills,
  profileVsJobCriteria,
}) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
 const systemPrompt = `You are an expert AI resume writer specializing in creating ATS-optimized, recruiter-friendly CVs for tech professionals with career transitions and non-traditional backgrounds.

**Your Task:** Enhance the provided CV data by optimizing it for:
- ATS (Applicant Tracking System) compatibility
- Tech industry recruiters and hiring managers
- Career changers and bootcamp graduates
- Professional narrative coherence
- Keyword optimization for the specified skills

**Enhancement Guidelines:**
1. **Professional Summary**: Craft a compelling 3-4 sentence summary that bridges past experience with tech aspirations, aligning with job criteria
2. **Skills**: Organize and prioritize technical skills based on job criteria importance
3. **Transferable Experience**: Reframe non-tech experience to highlight transferable skills that match job requirements
4. **Education**: Present educational background professionally, emphasizing relevant coursework/achievements
5. **Projects**: Enhance project descriptions with technical depth and business impact, highlighting technologies that match job criteria
6. **Job Alignment**: Analyze how the candidate's profile matches the job criteria and optimize accordingly
7. **Language**: Use action verbs, quantify achievements where possible, include keywords from job criteria

**Important Notes:**
- The 'experience' field contains transferable/previous work experience as a string
- The 'education' field is an array of educational backgrounds
- The 'projects' field contains technical projects with descriptions
- The 'profileVsJobCriteria' field contains specific job requirements to align the CV with
- Use job criteria to prioritize skills, keywords, and achievements
- Only enhance provided content - do not fabricate information
- Maintain factual accuracy while improving presentation

**Required Output Format (JSON only):**
{
  "professionalSummary": "Enhanced 3-4 sentence professional summary connecting background to tech career goals and job requirements",
  "skills": ["skill1", "skill2", "skill3", "..."],
  "transferableExperience": "Enhanced paragraph highlighting transferable skills and relevant achievements that align with job criteria",
  "education": [
    {
      "institution": "Institution name",
      "program": "Program/degree name", 
      "duration": "Time period or completion year",
      "highlights": "Key achievements or relevant coursework (if applicable)"
    }
  ],
  "projects": [
    {
      "name": "Project name",
      "description": "Enhanced description focusing on technologies used, problem solved, and impact/results that relate to job requirements",
    }
  ],
  "jobAlignmentAnalysis": "Brief analysis of how the candidate's profile aligns with the job criteria and key strengths to highlight"
}

Respond with only the JSON object - no additional text or formatting.`;

      const userInput = JSON.stringify(
      {
        professionalSummary,
        transferableExperience: experience, // Clarify this is transferable experience
        education,
        projects,
        targetSkills: skills, // Clarify these are target skills to optimize for
        jobCriteria: profileVsJobCriteria, // Job requirements to align CV with
      },
      null,
      2
    );

    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });

    const withTimeout = (promise, ms = 15000) =>
      Promise.race([
        promise,
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error(`Gemini API timed out after ${ms}ms`)),
            ms
          )
        ),
      ]);

    const result = await withTimeout(
      chat.sendMessage(
        `${systemPrompt}\n\nPlease enhance this CV with a focus on ATS optimization and tech industry standards:\n\n${userInput}`
      ),
      15000
    );

   const responseText = result.response.text();
    
    // Clean up the response to ensure it's valid JSON
    const cleanedResponse = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    // Validate JSON response
    try {
      JSON.parse(cleanedResponse);
      return cleanedResponse;
    } catch (parseError) {
      console.error('Invalid JSON response from Gemini:', cleanedResponse);
      throw new Error('AI returned invalid JSON format');
    }
    
  } catch (error) {
    console.error('CV Enhancement Error:', error);
    throw error;
  }
};

export default enhanceWithAi;
