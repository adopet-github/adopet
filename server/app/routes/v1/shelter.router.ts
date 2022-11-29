import { Router } from 'express';
import controller from '../../controllers/shelter.controller';
import { InputTypes } from '../../enums';
import joiMiddleware from '../../middlewares/joi.middleware';
import schema from '../../schemas/shelter.schema';
import globalSchema from '../../schemas/global.schema';
import authMiddleware from '../../middlewares/auth.middeware';
import userExistsMiddleware from '../../middlewares/userexists.middleware';
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

export default router;
