// Example route definitions

import { Router } from 'express';
import { getExample } from '../controllers/example.controller.js';

const router = Router();

// Define routes
// HINT: Add route-specific authorization checks here if needed
// Example: router.get('/', authMiddleware, getExample);
router.get('/', getExample);

export default router;
