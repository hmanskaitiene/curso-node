const { Router } = require('express');
const { productosGetAll,
        productosGetById,
        productosSave,
        productosSaveHtml,
        productosDelete,
        productosUpdate,
    
} = require('../controllers/productos');
const router = Router();

router.get('/',productosGetAll)
router.get('/:id',productosGetById)
router.post('/',productosSave)
router.post('/html',productosSaveHtml)
router.delete('/:id',productosDelete)
router.put('/:id',productosUpdate)

module.exports = router;