import { Router } from 'express';
import generateCv from '../controllers/generateCv.js';

const router = Router();

router.post('/', generateCv);

export default router;
