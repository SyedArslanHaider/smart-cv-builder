// Centralized route definitions

import { Router } from 'express';
import exampleRoutes from './example.routes.js';

const router = Router();

// Register route modules
router.use('/example', exampleRoutes);

export default router;
