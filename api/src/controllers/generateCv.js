import * as yup from 'yup';
import enhanceWithAi from './enhanceWithAi.js';

const cvSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  github: yup
    .string()
    .url('GitHub must be a valid URL')
    .required('GitHub profile is required'),
  linkedin: yup
    .string()
    .url('LinkedIn must be a valid URL')
    .required('LinkedIn profile is required'),
  portfolio: yup
    .string()
    .url('Portfolio must be a valid URL')
    .required('Portfolio is required'),
  professional_summary: yup
    .string()
    .required('Professional summary is required'),
  transferable_experience: yup
    .string()
    .required('Transferable experience is required'),
  projects: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('Project name is required'),
        description: yup
          .string()
          .required('Description is required')
          .test(
            'wordCount',
            'Description must not exceed 150 words',
            (value) => value && value.trim().split(/\s+/).length <= 150
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
        institution: yup.string().required(),
        program: yup.string().required('Program is required'),
        startDate: yup
          .string()
          .required('Start date is required')
          .test(
            'is-valid-date',
            'Start date must be a valid date',
            (value) => !isNaN(Date.parse(value))
          ),
        endDate: yup
          .string()
          .required('End date is required')
          .test(
            'valid-or-current',
            'End date must be a valid date or "current"',
            function (value) {
              return (
                value?.toLowerCase() === 'current' || !isNaN(Date.parse(value))
              ).test(
                'after-start',
                'End date must be after start date',
                function (value) {
                  const { startDate } = this.parent;

                  if (!startDate || !value) return true;

                  if (value.toLowerCase?.() === 'current') return true;

                  const start = new Date(startDate);
                  const end = new Date(value);
                  return end > start;
                }
              );
            }
          ),
      })
    )
    .required('Education is required'),
  yourProfile_vs_jobCriteria: yup
    .string()
    .required('Comparison with job criteria is required'),
});

const generateCv = async (req, res) => {
  try {
    await cvSchema.validate(req.body, { abortEarly: false });
    const {
      fullName,
      email,
      phone,
      github,
      linkedin,
      portfolio,
      professional_summary,
      transferable_experience = [],
      projects = [],
      education = [],
      yourProfile_vs_jobCriteria,
    } = req.body;

    const cvData = {
      fullName,
      contact: {
        email,
        phone,
        linkedin,
        github,
        portfolio,
      },
      professional_summary,
      experience: transferable_experience,
      projects,
      education,
      yourProfile_vs_jobCriteria,
    };

    const aiInput = {
      professionalSummary: professional_summary,
      experience: transferable_experience,
      education,
      projects,
      skills: yourProfile_vs_jobCriteria
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
    };
    console.log('aiInput:', aiInput);

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
