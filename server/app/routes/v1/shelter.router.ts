import { Router } from 'express';
import controller from '../../controllers/shelter.controller';
import { AccountTypes, InputTypes } from '../../enums';
import joiMiddleware from '../../middlewares/joi.middleware';
import schema from '../../schemas/shelter.schema';
import globalSchema from '../../schemas/global.schema';
import authMiddleware from '../../middlewares/auth.middeware';
import userExistsMiddleware from '../../middlewares/userexists.middleware';
import isRoleMiddleware from '../../middlewares/isrole.middleware';
import reflexiveMiddleware from '../../middlewares/reflexive.middleware';
import imageLimitMiddleware from '../../middlewares/imagelimit.middleware';
const router = Router();

router.post(
  '/',
  joiMiddleware(schema.create, InputTypes.BODY),
  userExistsMiddleware,
  controller.create
);
router.get(
  '/',
  authMiddleware,
  isRoleMiddleware(AccountTypes.ADMIN),
  controller.retrieveAll
);
router.get(
  '/:id',
  authMiddleware,
  isRoleMiddleware(AccountTypes.ADOPTER),
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  controller.retrieveOne
);
router.put(
  '/:id',
  authMiddleware,
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  reflexiveMiddleware(),
  joiMiddleware(schema.update, InputTypes.BODY),
  controller.update
);
router.delete(
  '/:id',
  authMiddleware,
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  reflexiveMiddleware(),
  controller.delete
);
router.put(
  '/:id/images',
  authMiddleware,
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  reflexiveMiddleware(),
  joiMiddleware(globalSchema.validateImages, InputTypes.BODY),
  imageLimitMiddleware(AccountTypes.SHELTER),
  controller.addManyImages
);

router.get(
  '/:id/matches',
  authMiddleware,
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  reflexiveMiddleware(),
  controller.getMatches
);
router.get(
  '/:id/likes',
  authMiddleware,
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  reflexiveMiddleware(),
  controller.getLikes
);

export default router;
