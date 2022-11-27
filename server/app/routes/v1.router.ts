import { Router } from 'express';
const router = Router();
import adopterRouter from './v1/adopter.router';
import shelterRouter from './v1/shelter.router';
import animalRouter from './v1/animal.router';
import imageRouter from './v1/image.router';

router.use('/adopter', adopterRouter);
router.use('/shelter', shelterRouter);
router.use('/animal', animalRouter);
router.use('/image', imageRouter);

export default router;
