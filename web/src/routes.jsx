import { Playground } from './components/Playground/Playground';

import PersonalInfoForm from './components/PersonalInfo/PersonalInfoForm.jsx';
import PreviewPage from './pages/PreviewPage/PreviewPage.jsx';
const IS_PLAYGROUND_ENABLED = import.meta.env.VITE_PLAYGROUND_ENABLED;

/**
 * Routes for the application.
 */
export const routes = [
  // Define your routes here

  {
    path: '/',
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
