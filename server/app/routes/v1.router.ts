import { Router } from "express";
const router = Router();
import adopterRouter from './v1/adopter.router';
import shelterRouter from './v1/shelter.router';

router.use('/adopter', adopterRouter);
router.use('/shelter', shelterRouter);

export default router;