const generateCv = (req, res) => {
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

  if (
    !fullName ||
    !email ||
    !phone ||
    !github ||
    !portfolio ||
    !linkedin ||
    !professional_summary ||
    !transferable_experience ||
    !projects ||
    !education ||
    !yourProfile_vs_jobCriteria
  ) {
    return res.status(400).json({ msg: 'All fields are required' });
  }
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
  res.status(200).json({ msg: 'CV generated successfully', CV: cvData });
};

export default generateCv;
