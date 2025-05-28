import { Playground } from './components/Playground/Playground';
import Home from './pages/Home';
import PersonalInfoForm from './components/PersonalInfo/PersonalInfoForm.jsx';
import { Education } from './components/Education/Education.jsx';

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
    path: '/education',
    element: <Education />,
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
