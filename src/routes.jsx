import { Playground } from './components/Playground/Playground';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import MultiFormPage from './components/MultiFormPage/MultiFormPage.jsx';
import PreviewPage from './components/PreviewPage/PreviewPage.jsx';
const IS_PLAYGROUND_ENABLED = import.meta.env.VITE_PLAYGROUND_ENABLED;

/**
 * Routes for the application.
 */
export const routes = [
  // Define your routes here

  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/form', // Add a new route for the MultiFormPage
    element: <MultiFormPage />,
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
