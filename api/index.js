// Entry point for the API

import express from 'express';
import routes from './src/routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// HINT: Add authentication middleware here if needed
// Example: app.use(authMiddleware);

// API Routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
