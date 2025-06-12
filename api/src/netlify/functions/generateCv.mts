import * as yup from 'yup';
import enhanceWithAi from '../../controllers/enhanceWithAi.js';
import { isValidMonthYear, isAfter } from '../../utils/date.js';
import validateApiKey from '../../utils/validations.js';

const cvSchema = yup.object().shape({
  apiKey: yup
    .string()
    .required('API key is required')
    .test('is-valid-api-key', 'Invalid API key format', (value) => {
      if (!value) return false;
      return validateApiKey(value);
    }),
  personalInfo: yup.object().shape({
    fullName: yup.string().required('Full name is required'),
    email: yup.string().email().required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    github: yup.string().url().required('GitHub profile is required'),
    linkedin: yup.string().url().required('LinkedIn profile is required'),
    portfolio: yup.string().url().required('Portfolio is required'),
  }),
  professionalSummary: yup.object().shape({
    summary: yup.string().required('Professional summary is required'),
  }),
  transferableExperience: yup.object().shape({
    experience: yup.string().required('experience is required'),
  }),
  projects: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('Project name is required'),
        description: yup
          .string()
          .required('Description is required')
          .test(
            'charCount',
            'Description must be more than 150 characters',
            (value) => {
              if (!value) return false;
              return value.length > 150;
            }
          ),
        deployedWebsite: yup
          .string()
          .url('Deployed site must be a valid URL')
          .required('Deployed website is required'),
        githubLink: yup
          .string()
          .url('GitHub link must be a valid URL')
          .matches(
            /^https:\/\/github\.com\/.+/,
            'Must be a GitHub repository URL'
          )
          .required('GitHub link is required'),
      })
    )
    .required('Projects are required'),
  education: yup
    .array()
    .of(
      yup.object().shape({
        institution: yup.string().required('Institution is required'),
        program: yup.string().required('Program is required'),
        startDate: yup
          .string()
          .required('Start date is required')
          .test(
            'valid-start-format',
            "Start date must be in 'Month YYYY' format",
            isValidMonthYear
          ),
        endDate: yup
          .string()
          .required('End date is required')
          .test(
            'valid-or-current',
            'End date must be a valid date or "current"',
            function (value) {
              return (
                value?.toLowerCase() === 'current' || isValidMonthYear(value)
              );
            }
          )
          .test(
            'after-start',
            'End date must be after start date',
            function (value) {
              const { startDate } = this.parent;
              if (!startDate || !value) return true;
              if (value.toLowerCase() === 'current') return true;

              return isAfter(startDate, value);
            }
          ),
      })
    )
    .required('Education is required'),
  profileVsJobCriteria: yup.object().shape({
    jobcriteria: yup
      .string()
      .required('Comparison with job criteria is required'),
  }),
});

export const handler = async (event, context) => {
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
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (err) {
    console.error(err);
    const statusCode = err.name === 'ValidationError' ? 400 : 500;
    return {
      statusCode,
      body: JSON.stringify({
        msg:
          err.name === 'ValidationError' ? 'Validation error' : 'Server error',
        errors: err.errors || err.message,
      }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};
