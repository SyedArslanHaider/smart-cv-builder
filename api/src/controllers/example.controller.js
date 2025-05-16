// Example controller

import { exampleService } from '../services/example.service.js';

// Controller functions handle HTTP requests and responses
// They should delegate business logic to services
export const getExample = (req, res) => {
  // HINT: Add user-specific authorization logic here if needed
  // Example: if (!req.user || !req.user.hasPermission('view_example')) {
  //   return res.status(403).json({ error: 'Forbidden' });
  // }

  // Call the service to get data
  const data = exampleService();

  // Send the response back to the client
  res.json({ message: 'Example response', data });
};
