const { getTestProducts } = require('../services/productos.js');

const productosGetTest = (req, res) => {
    const productosTest = getTestProducts();
    res.status(200).json(productosTest);
}

const productosGetTestView = async (req, res) => {
    const productosTest = getTestProducts();
    res.render('tabla',{ productosTest })
}

module.exports = {
    productosGetTestView,
    productosGetTest,
}
