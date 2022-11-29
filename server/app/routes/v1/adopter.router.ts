import { Router } from 'express';
import controller from '../../controllers/adopter.controller';
import { AccountTypes, InputTypes } from '../../enums';
import authMiddleware from '../../middlewares/auth.middeware';
import imageLimitMiddleware from '../../middlewares/imagelimit.middleware';
import isRoleMiddleware from '../../middlewares/isrole.middleware';
import joiMiddleware from '../../middlewares/joi.middleware';
import reflexiveMiddleware from '../../middlewares/reflexive.middleware';
import userExistsMiddleware from '../../middlewares/userexists.middleware';
import schema from '../../schemas/adopter.schema';
import globalSchema from '../../schemas/global.schema';
const router = Router();

router.post(
  '/',
  joiMiddleware(schema.create, InputTypes.BODY),
  userExistsMiddleware,
  controller.create
);
router.get('/', authMiddleware, isRoleMiddleware(AccountTypes.ADMIN), controller.retrieveAll);
router.get(
  '/:id',
  authMiddleware,
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  controller.retrieveOne
);
router.put(
  '/:id',
  authMiddleware,
  isRoleMiddleware(AccountTypes.ADOPTER),
  reflexiveMiddleware(),
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  joiMiddleware(schema.update, InputTypes.BODY),
  controller.update
);
router.delete(
  '/:id',
  authMiddleware,
  isRoleMiddleware(AccountTypes.ADOPTER),
  reflexiveMiddleware(),
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  controller.delete
);
router.put(
  '/:id/images',
  authMiddleware,
  isRoleMiddleware(AccountTypes.ADOPTER),
  reflexiveMiddleware(),
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  joiMiddleware(globalSchema.validateImages, InputTypes.BODY),
  imageLimitMiddleware(AccountTypes.ADOPTER),
  controller.addManyImages
);
router.put(
  '/:adopterId/like/:animalId',
  authMiddleware,
  isRoleMiddleware(AccountTypes.ADOPTER),
  reflexiveMiddleware('adopterId'),
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  controller.likeAnimal
);
router.put(
  '/:adopterId/dislike/:animalId',
  authMiddleware,
  isRoleMiddleware(AccountTypes.ADOPTER),
  reflexiveMiddleware('adopterId'),
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  controller.dislikeAnimal
);

export default router;
