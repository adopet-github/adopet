import { Router } from 'express';
import controller from '../../controllers/message.controller';
const router = Router();

router.post('/adopter/:adopterId/animal/:animalId', controller.create);
router.get('/adopter/:adopterId/animal/:animalId', controller.retrieveByMatch);

export default router;
