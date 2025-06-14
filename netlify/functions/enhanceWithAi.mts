import { GoogleGenerativeAI } from '@google/generative-ai';
const enhanceWithAi = async ({
  apiKey,
  professionalSummary,
  education,
  experience,
  projects,
  skills,
  profileVsJobCriteria,
}) => {
  try {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `You are an expert AI resume writer specializing in creating ATS-optimized, recruiter-friendly CVs for tech professionals with career transitions and non-traditional backgrounds.

**Your Task:** Enhance the provided CV data by optimizing it for:
- ATS (Applicant Tracking System) compatibility
- Tech industry recruiters and hiring managers
- Career changers and bootcamp graduates
- Professional narrative coherence
- Keyword optimization for the specified skills

**Input Data:**
- Professional Summary: ${professionalSummary}
- Education: ${JSON.stringify(education)}
- Experience: ${experience}
- Projects: ${JSON.stringify(projects)}
- Skills: ${skills.join(', ')}
- Job Criteria: ${profileVsJobCriteria}

**Enhancement Guidelines:**
1. **Professional Summary**: Craft a compelling, recruiter-hooking 3-4 sentence summary that bridges past experience with tech aspirations, aligning with job criteria.
2. **Skills**: Extract and return the 4-5 most relevant technical skills and 3-5 key soft skills by analyzing both the ProfileVsJobCriteria field and the transferable experience. Present each skill as a bullet point.
3. **Transferable Experience**: Extract solid achievements from the non-tech experience and reframe them as concise, impactful bullet points emphasizing transferable skills and quantified results where possible. Parse employment dates and separate them into individual startDate and endDate fields (e.g., "2019-2024" becomes startDate: "2019", endDate: "2024")
4. **Education**: Present educational background professionally, emphasizing relevant coursework/achievements.
5. **Projects**: For each project, create a concise summary highlighting key features, functionalities, and business impact.
    Add a “Technologies Used” list.
    Include separate fields for deployed website and GitHub repository links.
6. **ProfileVsJobCriteria**: Analyze how the candidate's profile matches the job criteria and optimize accordingly.

**Important Notes:**
- Only enhance provided content—do not fabricate information.
- Maintain factual accuracy while improving presentation.
- Keep technical skills concise (4-5 items) and soft skills (3-5 items).
- Format transferable experience achievements as bullet points.
- Present both technical and soft skills as bullet points.

**Required Output Format (JSON only):**
{
  "professionalSummary": "Enhanced 3-4 sentence professional summary connecting background to tech career goals and job requirements",
  "skills": {
    "technical": [
      "tech skill1",
      "tech skill2"
    ],
    "soft": [
      "soft skill1",
      "soft skill2"
    ]
  },
"transferableExperience": [
  {
    "company": "Company Name",
    "position": "Job Title/Role", 
    "startDate": "Month Year",
    "endDate": "Month Year",
    "achievements": [
      "Bullet point 1 highlighting transferable skills and relevant achievements",
      "Bullet point 2 with quantified results where possible"
    ]
  }
],
  "education": [
    {
      "institution": "Name of school/bootcamp",
      "program": "Degree/certificate name",
      "startDate": "Month Year",
      "endDate": "Month Year",
      "highlights": "Key projects or relevant coursework"
    }
  ],
  "projects": [
   {
      "name": "Project name",
      "description": "Brief explanation of project and economic, social impact and problems solved",
       "technologiesUsed": [
        "Main frameworks/languages",
        "Key tools/platforms"
      ],
      "deployedLink": "URL if deployed",
      "githubLink": "Repository URL"
    }
  ]
}

Only return valid JSON without any additional formatting or commentary.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
    });

    const responseText = result.response.text();
    const cleanedResponse = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    try {
      return JSON.parse(cleanedResponse);
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
