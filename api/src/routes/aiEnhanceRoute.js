import { Router } from 'express';
import enhanceWithAi from '../controllers/enhanceWithAi.js';
const router = Router();

router.post('/', enhanceWithAi);

export default router;
