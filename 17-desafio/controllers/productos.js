import ProductService from '../services/productos.js';
const productService = new ProductService();

const productosGetTest = (req, res) => {
    const productosTest = productService.getTestProducts();
    res.status(200).json(productosTest);
}

const productosGetTestView = async (req, res) => {
    const productosTest = productService.getTestProducts();
    res.render('tabla',{ productosTest })
}

export {
    productosGetTestView,
    productosGetTest,
}
