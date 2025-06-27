import * as yup from 'yup';
import isValidUrl from './validation';

export const urlValidation = yup
  .string()
  .nullable()
  .notRequired()
  .test('is-url-valid', 'Please enter a valid URL.', (value) => {
    if (!value) return true;
    return isValidUrl(value);
  });

export const PersonalInfoSchema = yup.object().shape({
  fullName: yup.string().required('Full Name is required.'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required.'),
  phone: yup.string().required('Phone number is required.'),
  github: urlValidation,
  linkedin: urlValidation,
  portfolio: urlValidation,
});

export const ProjectSchema = yup.object().shape({
  name: yup.string().required('Project name is required'),
  description: yup
    .string()
    .required('Description is required')
    .max(150, 'Max 150 characters'),
  deployedWebsite: urlValidation.required('Deployed site URL is required'),
  githubLink: urlValidation.required('GitHub link is required'),
});

export const EducationSchema = yup.object().shape({
  institution: yup.string().required('Institution is required'),
  program: yup.string().required('Program is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
});

export const ProfileVsJobSchema = yup.object().shape({
  jobcriteria: yup
    .string()
    .required('Please provide the profile vs job criteria.')
    .min(200, 'The Criteria must be at least 200 characters long.'),
});

export const ProfessionalSummarySchema = yup.object().shape({
  summary: yup
    .string()
    .required('Please provide a professional summary.')
    .min(150, 'Summary must be at least 150 characters long.'),
});

export const TransferableExperienceSchema = yup.object().shape({
  experience: yup
    .string()
    .required('Please provide your transferable experience.')
    .min(200, 'Experience must be at least 200 characters long.'),
});
