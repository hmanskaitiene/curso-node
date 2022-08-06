import { Router } from 'express';
import mensajesController from '../controllers/mensajes.js';

const router = Router();

router.get('/', mensajesController.getAll)
router.post('/', mensajesController.create)

export default router;