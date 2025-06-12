import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 * Playground component to dynamically load and render a component based on the URL parameter.
 * @returns {JSX.Element} The rendered component or an error message.
 */
export const Playground = () => {
  const { componentName } = useParams();
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      if (!componentName) {
        setError('No component name provided');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const formattedName = componentName
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join('');

        const module = await import(`../${formattedName}/${formattedName}.jsx`);

        if (!module.default) {
          throw new Error(
            `Component "${formattedName}" does not have a default export`
          );
        }

        setComponent(() => module.default);
      } catch (err) {
        console.error('Failed to load component:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadComponent();
  }, [componentName]);

  if (loading) {
    return <div>Loading {componentName} component...</div>;
  }

  if (error) {
    return (
      <div>
        <h3>Error loading component</h3>
        <p>{error}</p>
        <p>URL: {componentName}</p>
      </div>
    );
  }

  if (!Component) {
    return <div>Component "{componentName}" not found.</div>;
  }

  return <Component />;
};
