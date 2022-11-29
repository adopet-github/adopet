import { Router } from 'express';
import controller from '../../controllers/adopter.controller';
import { InputTypes } from '../../enums';
import authMiddleware from '../../middlewares/auth.middeware';
import joiMiddleware from '../../middlewares/joi.middleware';
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
  authMiddleware,
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
  '/:adopterId/like/:animalId',
  authMiddleware,
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  controller.likeAnimal
);
router.put(
  '/:adopterId/dislike/:animalId',
  authMiddleware,
  joiMiddleware(globalSchema.validateLike, InputTypes.PARAMS),
  controller.dislikeAnimal
);

export default router;
