import { Router } from 'express';
import controller from '../../controllers/image.controller';
import { AccountTypes, InputTypes } from '../../enums';
import authMiddleware from '../../middlewares/auth.middeware';
import isRoleMiddleware from '../../middlewares/isrole.middleware';
import joiMiddleware from '../../middlewares/joi.middleware';
import globalSchema from '../../schemas/global.schema';
const router = Router();

router.get(
  '/',
  authMiddleware,
  isRoleMiddleware(AccountTypes.ADMIN),
  controller.retrieveAll
);
router.delete(
  '/:id',
  authMiddleware,
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  controller.delete
);

export default router;
