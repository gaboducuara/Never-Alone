import { Router } from 'express';
import controller from "./controller.js"

const router = Router();

router.post('/create', controller.create);
router.get('/getAll', controller.getAll);
router.get('/getOne', controller.getOne );


export default router;


