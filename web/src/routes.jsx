import { Playground } from './components/Playground/Playground';
<<<<<<< HEAD
<<<<<<< HEAD
import Home from './pages/Home';
=======
<<<<<<< HEAD
=======
import Home from './pages/Home';
>>>>>>> parent of 2a64ff9 (Revert "Add Education component with css styling.")
>>>>>>> parent of f556b7b (Took out the education component to avoid conflicts.)
=======

>>>>>>> main
import PersonalInfoForm from './components/PersonalInfo/PersonalInfoForm.jsx';

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

  ...(IS_PLAYGROUND_ENABLED === 'true'
    ? [
        {
          path: '/playground/component/:componentName',
          element: <Playground />,
        },
      ]
    : []),
];
