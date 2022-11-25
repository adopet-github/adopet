import { Router } from "express";
import controller from "../controllers/test.controller";
const router = Router();

router.get('/create', controller.create);
router.get('/all', controller.retrieveAll);

export default router;