import { Router } from 'express';
import controller from '../../controllers/adopter.controller';
const router = Router();

router.post('/', controller.create);
router.get('/', controller.retrieveAll);
router.get('/:id', controller.retrieveOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.put('/:id/images', controller.addManyImages);
router.put('/:adopterId/like/:animalId', controller.likeAnimal);
router.put('/:adopterId/dislike/:animalId', controller.dislikeAnimal);

export default router;
