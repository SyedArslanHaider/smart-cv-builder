import { Playground } from './components/Playground/Playground';
import PreviewPage from './pages/PreviewPage/PreviewPage';
import SubmitAndRedirect from './components/SubmitAndRedirect';

const IS_PLAYGROUND_ENABLED = import.meta.env.VITE_PLAYGROUND_ENABLED;

export const routes = [
  {
    path: '/', // 👈 Home/root path shows the form and handles submission
    element: <SubmitAndRedirect />,
  },
  {
    path: '/submit', // optional route alias for form, same as above
    element: <SubmitAndRedirect />,
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
