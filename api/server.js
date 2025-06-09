// Entry point for the API

import express from 'express';
import cors from 'cors';
import cvRoutes from './src/routes/cvRoute.js';
import aiEnhance from './src/routes/aiEnhanceRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// HINT: Add authentication middleware here if needed
// Example: app.use(authMiddleware);

// API Routes
app.use('/generateCv', cvRoutes);
app.use('/aiEnhance', aiEnhance);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
