// Example service

import { exampleRepository } from '../repositories/example.repository.js';

// Services contain the business logic of the application
// They call repositories for data access
export const exampleService = () => {
  // Call the repository to get data
  const data = exampleRepository();

  // Perform any business logic if needed
  return { ...data, additionalKey: 'additional value' };
};
