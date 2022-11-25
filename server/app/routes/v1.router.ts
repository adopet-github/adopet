import { Router } from "express";
const router = Router();
import adopterRouter from './v1/adopter.router';

router.use('/adopter', adopterRouter);

export default router;