import { Router } from 'express';
import controller from '../../controllers/animal.controller';
import { InputTypes } from '../../enums';
import authMiddleware from '../../middlewares/auth.middeware';
import joiMiddleware from '../../middlewares/joi.middleware';
import schema from '../../schemas/animal.schema';
import globalSchema from '../../schemas/global.schema';
const router = Router();

router.post(
  '/',
  joiMiddleware(schema.create, InputTypes.BODY),
  authMiddleware,
  controller.create
);
router.get('/', authMiddleware, controller.retrieveAll);
router.get(
  '/:id',
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  authMiddleware,
  controller.retrieveOne
);
router.put(
  '/:id',
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  joiMiddleware(schema.update, InputTypes.BODY),
  authMiddleware,
  controller.update
);
router.delete(
  '/:id',
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  controller.delete
);
router.put(
  '/:id/images',
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  joiMiddleware(globalSchema.validateImages, InputTypes.BODY),
  authMiddleware,
  controller.addManyImages
);
router.put(
  '/:animalId/match/:adopterId',
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  authMiddleware,
  controller.matchAdopter
);
router.put(
  '/:animalId/dislike/:adopterId',
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  authMiddleware,
  controller.dislikeAdopter
);

export default router;
