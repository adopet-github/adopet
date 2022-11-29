import { Router } from 'express';
import controller from '../../controllers/animal.controller';
import { AccountTypes, InputTypes } from '../../enums';
import authMiddleware from '../../middlewares/auth.middeware';
import isRoleMiddleware from '../../middlewares/isrole.middleware';
import joiMiddleware from '../../middlewares/joi.middleware';
import schema from '../../schemas/animal.schema';
import globalSchema from '../../schemas/global.schema';
const router = Router();

router.post(
  '/',
  authMiddleware,
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(schema.create, InputTypes.BODY),
  controller.create
);
router.get('/', authMiddleware, isRoleMiddleware(AccountTypes.ADOPTER), controller.retrieveAll);
router.get(
  '/:id',
  authMiddleware,
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  controller.retrieveOne
);
router.put(
  '/:id',
  authMiddleware,
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  joiMiddleware(schema.update, InputTypes.BODY),
  controller.update
);
router.delete(
  '/:id',
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  controller.delete
);
router.put(
  '/:id/images',
  authMiddleware,
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  joiMiddleware(globalSchema.validateImages, InputTypes.BODY),
  controller.addManyImages
);
router.put(
  '/:animalId/match/:adopterId',
  authMiddleware,
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  controller.matchAdopter
);
router.put(
  '/:animalId/dislike/:adopterId',
  authMiddleware,
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  controller.dislikeAdopter
);

export default router;
