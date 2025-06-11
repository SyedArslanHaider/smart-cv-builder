import * as yup from 'yup';
import enhanceWithAi from './enhanceWithAi.js';
import { isValidMonthYear, isAfter } from '../utils/date.js';

const cvSchema = yup.object().shape({
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
            (value) => value && value.length > 150
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
            "Start date must be in 'Month YYYY'format",
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

const generateCv = async (req, res) => {
  try {
    await cvSchema.validate(req.body, { abortEarly: false });
    const {
      personalInfo,
      professionalSummary,
      transferableExperience,
      projects = [],
      education = [],
      profileVsJobCriteria,
    } = req.body;

    const { fullName, email, phone, github, linkedin, portfolio } =
      personalInfo;

    const { summary } = professionalSummary;
    const { experience } = transferableExperience;
    const { jobcriteria } = profileVsJobCriteria;

    const cvData = {
      fullName,
      contact: { email, phone, linkedin, github, portfolio },
      professionalSummary: summary,
      experience,
      projects,
      education,
      profileVsJobCriteria: jobcriteria,
    };

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
    };

    const enhancedCV = await enhanceWithAi(aiInput);

    res.status(200).json({ msg: 'CV generated successfully', CV: enhancedCV });
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res
        .status(400)
        .json({ msg: 'Validation error', errors: err.errors });
    }
    res.status(500).json({ msg: 'Server error', errors: err.message });
  }
};
export default generateCv;
