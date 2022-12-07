import { Router } from 'express';
import controller from '../../controllers/message.controller';
import schema from '../../schemas/message.schema';
import globalSchema from '../../schemas/global.schema';
import joiMiddleware from '../../middlewares/joi.middleware';
import { AccountTypes, InputTypes } from '../../enums';
import authMiddleware from '../../middlewares/auth.middeware';
import chatMemberMiddleware from '../../middlewares/chatmember.middleware';
import isRoleMiddleware from '../../middlewares/isrole.middleware';
const router = Router();

router.post(
  '/adopter/:adopterId/animal/:animalId',
  authMiddleware,
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  chatMemberMiddleware,
  joiMiddleware(schema.create, InputTypes.BODY),
  controller.create
);
router.get(
  '/adopter/:adopterId/animal/:animalId',
  authMiddleware,
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  chatMemberMiddleware,
  controller.retrieveByMatch
);

router.delete(
  '/adopter/:adopterId/animal/:animalId',
  authMiddleware,
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  isRoleMiddleware(AccountTypes.ADMIN),
  controller.deleteAllByMatch
);

export default router;
