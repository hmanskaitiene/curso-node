import { Router } from 'express';
import { info } from '../controllers/info.js';
import compression from 'compression';

const router = Router();

//Aplicada compresion sólo a esta ruta
router.get('/info',compression({
    level:5
}), info)

export default router;