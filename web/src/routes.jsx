import { Playground } from './components/Playground/Playground';
import Home from './pages/Home';
import PersonalInfoForm from './components/PersonalInfo/PersonalInfoForm';
import SubmitAndRedirect from './components/SubmitAndRedirect';
import PreviewPage from './pages/PreviewPage/PreviewPage';

const IS_PLAYGROUND_ENABLED = import.meta.env.VITE_PLAYGROUND_ENABLED;

export const routes = [
  {
    path: '/',
    element: <SubmitAndRedirect />, // Handles form + redirect
  },
  {
    path: '/form', 
    element: <PersonalInfoForm />,
  },
  {
    path: '/preview',
    element: <PreviewPage />,
  },
  ...(IS_PLAYGROUND_ENABLED === 'true'
    ? [
        {
          path: '/playground/component/:componentName',
          element: <Playground />,
        },
      ]
    : []),
];
