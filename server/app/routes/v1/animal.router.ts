import { Router } from 'express';
import controller from '../../controllers/animal.controller';
import { AccountTypes, InputTypes } from '../../enums';
import authMiddleware from '../../middlewares/auth.middeware';
import imageLimitMiddleware from '../../middlewares/imagelimit.middleware';
import isRoleMiddleware from '../../middlewares/isrole.middleware';
import joiMiddleware from '../../middlewares/joi.middleware';
import selfShelterMiddleware from '../../middlewares/selfshelter.middleware';
import schema from '../../schemas/animal.schema';
import globalSchema from '../../schemas/global.schema';
const router = Router();

router.post(
  '/',
  authMiddleware,
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(schema.create, InputTypes.BODY),
  selfShelterMiddleware('shelterId', InputTypes.BODY),
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
  selfShelterMiddleware(),
  joiMiddleware(schema.update, InputTypes.BODY),
  controller.update
);
router.delete(
  '/:id',
  authMiddleware,
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  selfShelterMiddleware(),
  controller.delete
);
router.put(
  '/:id/images',
  authMiddleware,
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  selfShelterMiddleware(),
  joiMiddleware(globalSchema.validateImages, InputTypes.BODY),
  imageLimitMiddleware('animal'),
  controller.addManyImages
);
router.put(
  '/:animalId/match/:adopterId',
  authMiddleware,
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  selfShelterMiddleware('animalId'),
  controller.matchAdopter
);
router.put(
  '/:animalId/dislike/:adopterId',
  authMiddleware,
  isRoleMiddleware(AccountTypes.SHELTER),
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  selfShelterMiddleware('animalId'),
  controller.dislikeAdopter
);

export default router;
