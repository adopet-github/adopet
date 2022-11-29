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
  authMiddleware,
  joiMiddleware(schema.create, InputTypes.BODY),
  controller.create
);
router.get('/', authMiddleware, controller.retrieveAll);
router.get(
  '/:id',
  authMiddleware,
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  controller.retrieveOne
);
router.put(
  '/:id',
  authMiddleware,
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  joiMiddleware(schema.update, InputTypes.BODY),
  controller.update
);
router.delete(
  '/:id',
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  controller.delete
);
router.put(
  '/:id/images',
  authMiddleware,
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  joiMiddleware(globalSchema.validateImages, InputTypes.BODY),
  controller.addManyImages
);
router.put(
  '/:animalId/match/:adopterId',
  authMiddleware,
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  controller.matchAdopter
);
router.put(
  '/:animalId/dislike/:adopterId',
  authMiddleware,
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  controller.dislikeAdopter
);

export default router;
