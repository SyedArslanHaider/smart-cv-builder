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
    .array()
    .of(
      yup.object().shape({
        company: yup.string().required(),
        position: yup.string().required(),
        date: yup.string().required(),
        bulletPoints: yup.array().of(yup.string()).required(),
      })
    )
    .required('Transferable experience is required'),
  projects: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
        description: yup.string().required(),
      })
    )
    .required('Projects are required'),
  education: yup
    .array()
    .of(
      yup.object().shape({
        institution: yup.string().required(),
        degree: yup.string().required(),
        year: yup.string().required(),
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
    if (err.name === 'ValidationError') {
      return res
        .status(400)
        .json({ msg: 'Validation error', errors: err.errors });
    }
    res.status(500).json({ msg: 'Server error', errors: err.message });
  }
};
export default generateCv;
