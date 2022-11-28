import { Router } from 'express';
import controller from '../../controllers/animal.controller';
const router = Router();

router.post('/', controller.create);
router.get('/', controller.retrieveAll);
router.get('/:id', controller.retrieveOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.put('/:id/images', controller.addManyImages);
router.put('/:animalId/match/:adopterId', controller.matchAdopter);
router.put('/:animalId/dislike/:adopterId', controller.dislikeAdopter);

export default router;
