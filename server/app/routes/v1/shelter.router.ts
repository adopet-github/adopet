import { Router } from 'express';
import controller from '../../controllers/shelter.controller';
import { InputTypes } from '../../enums';
import joiMiddleware from '../../middlewares/joi.middleware';
import schema from '../../schemas/shelter.schema';
import globalSchema from '../../schemas/global.schema';
import authMiddleware from '../../middlewares/auth.middeware';
const router = Router();

router.post(
  '/',
  joiMiddleware(schema.create, InputTypes.BODY),
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
  authMiddleware,
  controller.delete
);
router.put(
  '/:id/images',
  joiMiddleware(globalSchema.validateId, InputTypes.PARAMS),
  joiMiddleware(globalSchema.validateImages, InputTypes.BODY),
  authMiddleware,
  controller.addManyImages
);

export default router;
