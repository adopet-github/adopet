import { Router } from "express";
import controller from "../../controllers/adopter.controller";
const router = Router();

router.post('', controller.create);
router.get('', controller.retrieveAll);

export default router;