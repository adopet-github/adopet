import { Router } from 'express';
import controller from '../../controllers/auth.controller';
import { InputTypes } from '../../enums';
import authMiddleware from '../../middlewares/auth.middeware';
import joiMiddleware from '../../middlewares/joi.middleware';
import userExistsMiddleware from '../../middlewares/userexists.middleware';
import schema from '../../schemas/auth.schema';
const router = Router();

router.post(
  '/login',
  joiMiddleware(schema.login, InputTypes.BODY),
  controller.login
);
router.get('/profile', authMiddleware, controller.profile);
router.post('/logout', authMiddleware, controller.logout);
router.post(
  '/verify',
  joiMiddleware(schema.verify, InputTypes.BODY),
  userExistsMiddleware,
  controller.verify
),
  router.post('/google', controller.google);

export default router;
