import { Playground } from './components/Playground/Playground';
import SubmitButton from './components/SubmitButton/SubmitButton.jsx';
import LoadingPage from './components/LoadingPage/LoadingPage.jsx'




import Home from './pages/Home';

const IS_PLAYGROUND_ENABLED = import.meta.env.VITE_PLAYGROUND_ENABLED;

/**
 * Routes for the application.
 */
export const routes = [
  // {
  //   path: '/',
  //   element: <SubmitButton />,
  // },
  {
    path: '/',
    element: <LoadingPage />,
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
