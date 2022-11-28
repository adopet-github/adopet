import { Router } from 'express';
import controller from '../../controllers/auth.controller';
import authMiddleware from '../../middlewares/auth.middeware';
const router = Router();

router.post('/login', controller.login);
router.get('/profile', authMiddleware, controller.profile);
router.post('/logout', authMiddleware, controller.logout);

export default router;