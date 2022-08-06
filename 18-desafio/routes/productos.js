import { Router } from 'express';
import productosController from '../controllers/productos.js';

const router = Router();

router.get('/test',productosController.productosGetTest)
router.get('/view',productosController.productosGetTestView)
router.get('/',productosController.getAll)
router.post('/',productosController.create)

export default router;