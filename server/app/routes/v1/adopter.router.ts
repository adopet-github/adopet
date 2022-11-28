import { Router } from 'express';
import controller from '../../controllers/adopter.controller';
import authMiddleware from '../../middlewares/auth.middeware';
const router = Router();

router.post('/', controller.create);
router.get('/', authMiddleware, controller.retrieveAll);
router.get('/:id', authMiddleware, controller.retrieveOne);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.delete);
router.put('/:id/images', authMiddleware, controller.addManyImages);
router.put('/:adopterId/like/:animalId', authMiddleware, controller.likeAnimal);
router.put('/:adopterId/dislike/:animalId', authMiddleware, controller.dislikeAnimal);

export default router;
