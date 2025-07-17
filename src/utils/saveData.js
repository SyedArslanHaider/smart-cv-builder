export const STORAGE_KEY = 'cvFormData';

export const getFormData = () => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!data) return getDefaultFormData();

    return {
      apiKey: typeof data.apiKey === 'string' ? data.apiKey : '',
      personalInfo:
        data.personalInfo &&
        typeof data.personalInfo === 'object' &&
        !Array.isArray(data.personalInfo)
          ? {
              fullName: data.personalInfo.fullName || '',
              email: data.personalInfo.email || '',
              phone: data.personalInfo.phone || '',
              github: data.personalInfo.github || '',
              linkedin: data.personalInfo.linkedin || '',
              portfolio: data.personalInfo.portfolio || '',
            }
          : getDefaultFormData().personalInfo,
      professionalSummary:
        data.professionalSummary &&
        typeof data.professionalSummary === 'object' &&
        !Array.isArray(data.professionalSummary)
          ? { summary: data.professionalSummary.summary || '' }
          : getDefaultFormData().professionalSummary,
      transferableExperience:
        data.transferableExperience &&
        typeof data.transferableExperience === 'object' &&
        !Array.isArray(data.transferableExperience)
          ? { experience: data.transferableExperience.experience || '' }
          : getDefaultFormData().transferableExperience,
      projects: Array.isArray(data.projects)
        ? data.projects.map((proj) => ({
            name: proj.name || '',
            description: proj.description || '',
            deployedWebsite: proj.deployedWebsite || '',
            githubLink: proj.githubLink || '',
          }))
        : getDefaultFormData().projects,
      education: Array.isArray(data.education)
        ? data.education.map((edu) => ({
            institution: edu.institution || '',
            program: edu.program || '',
            startDate: edu.startDate || '',
            endDate: edu.endDate || '',
          }))
        : getDefaultFormData().education,
      profileVsJobCriteria:
        data.profileVsJobCriteria &&
        typeof data.profileVsJobCriteria === 'object' &&
        !Array.isArray(data.profileVsJobCriteria)
          ? { jobcriteria: data.profileVsJobCriteria.jobcriteria || '' }
          : getDefaultFormData().profileVsJobCriteria,
    };
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
    return getDefaultFormData();
  }
};

const getDefaultFormData = () => ({
  apiKey: '',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    portfolio: '',
  },
  professionalSummary: {
    summary: '',
  },
  transferableExperience: {
    experience: '',
  },
  projects: [
    {
      name: '',
      description: '',
      deployedWebsite: '',
      githubLink: '',
    },
  ],
  education: [
    {
      institution: '',
      program: '',
      startDate: '',
      endDate: '',
    },
  ],
  profileVsJobCriteria: {
    jobcriteria: '',
  },
});

export const saveFormData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
