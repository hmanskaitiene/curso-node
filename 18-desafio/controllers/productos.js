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

const getAll = async (req, res) => {
    const response = await productService.getAll();
    res.status(response.status).json(response.data)
}

const productCreate = async (req, res) => {
    const response = await productService.productCreate(req.body);
    const io = await req.app.get("socket");    
    
    // Por el momento se envian todos los productos. Lo ideal seria mandar solo el producto creado
    const { data } = await productService.getAll();
    io.emit("new-product", data);

    res.status(response.status).json(response.data)
}

const productUpdate = async (req, res) => {
    const id = req.params.id;
    const producto = req.body;
    const response = await productService.productUpdate(id, producto);
    res.status(response.status).json(response.data)
}

const productDelete = async (req, res) => {
    const id = req.params.id;
    const response = await productService.productDelete(id);
    res.status(response.status).json(response.data)
}

export default {
    productosGetTestView,
    productosGetTest,
    getAll,
    productCreate,
    productUpdate,
    productDelete,
}
