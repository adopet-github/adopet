import { Router } from 'express';
import controller from '../../controllers/image.controller';
const router = Router();

router.delete('/:id', controller.delete);

export default router;