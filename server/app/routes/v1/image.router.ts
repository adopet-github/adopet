import { Router } from 'express';
import controller from '../../controllers/image.controller';
import { InputTypes } from '../../enums';
import authMiddleware from '../../middlewares/auth.middeware';
import joiMiddleware from '../../middlewares/joi.middleware';
import globalSchema from '../../schemas/global.schema';
const router = Router();

router.delete(
  '/:id',
  authMiddleware,
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  controller.delete
);

export default router;
