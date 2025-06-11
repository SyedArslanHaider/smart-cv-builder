# AI CV Generator (Full Stack App)

This is a full-stack resume/CV builder app that lets users create AI-enhanced resumes by filling out a multi-step form. The app integrates with the **Gemini API (Google AI)** to generate polished CV content tailored to job criteria.

---

## Project Structure

src/
├── components/
│ ├── Button/
│ ├── CharacterCount/
│ ├── Education/
│ ├── ErrorState/
│ ├── Header/
│ ├── IconSlide/
│ ├── LeftPane/
│ ├── LoadingState/
│ ├── MultiFormPage/
│ ├── PersonalInfo/
│ ├── Playground/
│ ├── ProfessionalSummary/
│ ├── ProfileVsJob/
│ ├── Project/
│ └── TransferableExperience/
├── hooks/
│ └── useSubmitPersonalInfo.js
├── utils/
│ └── (frontend helper utils - no validation)
├── pages/
api/
├── controllers/
│ ├── generateCv.js
│ └── enhanceWithAi.js
├── routes/
│ ├── aiEnhanceRoute.js
│ └── cvRoute.js
├── utils/
│ └── validations.js ← Contains only API key validation logic
├── server.js
└── .env

---

## Features

### Frontend (React)

- Gemini API key authentication
- Multi-step form with auto-save to `localStorage`
- Real-time controlled inputs for:
  - Personal Info
  - Professional Summary
  - Transferable Experience
  - Education
  - Projects
  - Profile vs Job Matching
- AI-enhanced CV generation
- Sidebar with progress tracking

### Backend (Node.js + Express)

- Validates form input using `yup`
- Validates Google Gemini API key format
- Handles Gemini AI requests for CV enhancement
- Returns structured CV data for frontend display/download

---

## How It Works (User Flow)

- The user enters a Gemini API key to unlock the CV form
- The key is validated and saved to `localStorage`
- User fills out a multi-step form guided by a LeftPane and IconSlider
- Progress is **auto-saved** to avoid data loss
- On form submission, data is validated and sent to the backend
- Gemini AI processes the CV data and returns an enhanced version
- Enhanced CV is displayed/downloaded

---

## Example API Key Validation (Backend)

```js
const validateApiKey = (key) => {
  const trimmedKey = key.trim();
  return /^AIza[0-9A-Za-z-_]{35}$/.test(trimmedKey);
};
```

## AI-Powered CV Enhancement Module

### **Overview**

This module uses **Google's Gemini AI** to analyze and improve the user's resume. It prioritizes:

- ATS (Applicant Tracking System) compatibility
- Recruiter readability
- Custom alignment with job descriptions

### **Key Features**

- Professional summary optimization
- Skills extraction and prioritization
- Transferable experience reframing
- Education and project enhancement
- Job criteria alignment analysis

---

## Module Components

### 1. Environment Configuration

```js
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY in environment variables');
  process.exit(1);
}
```

### 2.AI Client Initialization

```js
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
```

### 3.Core Function

```js
const enhanceWithAi = async ({
  professionalSummary,
  education,
  experience,
  projects,
  skills,
  profileVsJobCriteria,
}) => {
  // Implementation...
};
```

### 4.Prompt Engineering

**Includes:**

- AI role: Expert resume writer
- Data structure expectations
- Section-specific enhancement rules
- Output format (JSON)

### 5. Response Cleaning

```js
const responseText = result.response.text();
const cleanedResponse = responseText
  .replace(/`json\n?/g, '')
  .replace(/`\n?/g, '')
  .trim();
```

### 6. Error Handling

- Logs Gemini API errors
- Handles bad or missing responses
- Validates response format (JSON)

### **Usage Example**

```js
const enhancedCV = await enhanceWithAi({
professionalSummary: "Current summary...",
education: [...],
experience: [...],
projects: [...],
skills: [...],
profileVsJobCriteria: {...},
});
```

### Dependencies

- @google/generative-ai – Gemini API SDK
- dotenv – Environment variable management
- express – Web server framework
- yup – Data validation
- cors, body-parser – Middleware
- React,CSS – Frontend styling and UI

### **Full Stack Setup**

**Folder Structure**

├── web/ ← React frontend
├── api/ ← Node.js backend

### Prerequisites

- Node.js v16+
- npm or yarn
- Google Gemini API Key [get one here](https://console.cloud.google.com/apis/credentials)
  Visit Google Cloud Console to create a new API key for Gemini.

### Frontend Setup (React)

- 1.Navigate to the web folder:
  **cd web**
- 2.Install dependencies:
  **npm install**
- 3.Start the frontend server:
  **npm run dev**

### Backend Setup (Node.js + Express)

- 1.Navigate to the api folder:
  **cd api**
- 2.Install dependencies:
  **npm install**
- 3.Create .env file:
  **GEMINI_API_KEY=your_google_gemini_api_key_here**
- 4.Start the backend:
  **npm run dev**

### Testing App

- Start the backend server:
  **cd api**
  **npm run dev**
- Start the frontend server:
  **cd client**
  **npm start**
- Open the app at http://localhost:3000
- Enter your Gemini API key to unlock the form
