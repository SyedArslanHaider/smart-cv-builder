import { Playground } from './components/Playground/Playground';
import Home from './pages/Home';

const IS_PLAYGROUND_ENABLED = import.meta.env.VITE_PLAYGROUND_ENABLED;

/**
 * Routes for the application.
 */
export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  // Define your routes here
  ...(IS_PLAYGROUND_ENABLED === 'true'
    ? [
        {
          path: '/playground/component/:componentName',
          element: <Playground />,
        },
      ]
    : []),
];
