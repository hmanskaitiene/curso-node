const { Router } = require('express');
const { productosGetAll,
        productosGetById,
        productosSave,
        productosDelete,
        productosUpdate,
    
} = require('../controllers/productos');
const router = Router();

router.get('/',productosGetAll)
router.get('/:id',productosGetById)
router.post('/',productosSave)
router.delete('/:id',productosDelete)
router.put('/:id',productosUpdate)

module.exports = router;