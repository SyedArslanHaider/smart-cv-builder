import { Playground } from './components/Playground/Playground';
import Home from './pages/Home';
import PreviewPage from './pages/PreviewPage/PreviewPage';
import { Navigate } from 'react-router-dom';

const IS_PLAYGROUND_ENABLED = import.meta.env.VITE_PLAYGROUND_ENABLED;

export const routes = [
  {
    path: '/',
    element: <Navigate to="/form" replace />, // ✅ root route redirect
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
