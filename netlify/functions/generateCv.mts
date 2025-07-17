import enhanceWithAi from '../functions/enhanceWithAi.mjs';
import cvSchema from '../utils/schemaValidation';

const generateCv = async (event) => {
  try {
    const body = JSON.parse(event.body);

    await cvSchema.validate(body, { abortEarly: false });

    const {
      apiKey,
      personalInfo,
      professionalSummary,
      transferableExperience,
      projects = [],
      education = [],
      profileVsJobCriteria,
    } = body;

    const { fullName, email, phone, github, linkedin, portfolio } =
      personalInfo;
    const { summary } = professionalSummary;
    const { experience } = transferableExperience;
    const { jobcriteria } = profileVsJobCriteria;

    const aiInput = {
      professionalSummary: summary,
      experience,
      education,
      projects,
      skills: jobcriteria
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
      profileVsJobCriteria: jobcriteria,
      apiKey,
    };

    const enhancedCV = await enhanceWithAi(aiInput);

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: 'CV generated successfully',
        CV: enhancedCV,
      }),
    };
  } catch (err) {
    console.error(err);

    if (err.name === 'ValidationError') {
      return {
        statusCode: 400,
        body: JSON.stringify({ msg: 'Validation error', errors: err.errors }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Server error', errors: err.message }),
    };
  }
};

export const handler = async (event) => {
  return await generateCv(event);
};
