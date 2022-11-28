import { Router } from 'express';
import controller from '../../controllers/message.controller';
import schema from '../../schemas/message.schema';
import globalSchema from '../../schemas/global.schema';
import joiMiddleware from '../../middlewares/joi.middleware';
import { InputTypes } from '../../enums';
import authMiddleware from '../../middlewares/auth.middeware';
const router = Router();

router.post(
  '/adopter/:adopterId/animal/:animalId',
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  joiMiddleware(schema.create, InputTypes.BODY),
  authMiddleware,
  controller.create
);
router.get(
  '/adopter/:adopterId/animal/:animalId',
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  authMiddleware,
  controller.retrieveByMatch
);

export default router;
