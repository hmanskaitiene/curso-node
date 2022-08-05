import { Router } from 'express';
import { productosGetTest,productosGetTestView
} from '../controllers/productos.js';

const router = Router();

router.get('/',productosGetTest)
router.get('/view',productosGetTestView)

export default router;