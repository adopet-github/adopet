import { Router } from 'express';
const router = Router();
import adopterRouter from './v1/adopter.router';
import shelterRouter from './v1/shelter.router';
import animalRouter from './v1/animal.router';
import imageRouter from './v1/image.router';
import messageRouter from './v1/message.router';
import authRouter from './v1/auth.router';

router.use('/adopter', adopterRouter);
router.use('/shelter', shelterRouter);
router.use('/animal', animalRouter);
router.use('/image', imageRouter);
router.use('/message', messageRouter);
router.use('/auth', authRouter);

export default router;
