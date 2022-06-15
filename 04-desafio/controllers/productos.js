const Contenedor  = require('../models/contenedor');

const contenedor = new Contenedor();

const productosGetAll = async (req, res) => {
    const productos = await contenedor.getAll();
    res.status(200).json(productos);
}

const productosGetById = async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await contenedor.getById(id);
    if (producto !== null) {
        res.status(200).json(producto);
    } else {
        res.status(400).json({error:'producto no encontrado'});
    }
}

const productosSave = async (req, res) => {
    const producto = req.body;
    const id = await contenedor.save(producto)
    res.status(201).json({id});
}

const productosSaveHtml = async (req, res) => {
    const producto = req.body;
    const id = await contenedor.save(producto)
    res.redirect('/');
}

const productosDelete = async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await contenedor.getById(id);
    if (producto !== null) {
        await contenedor.deleteById(id)
        res.status(200).json({mensaje: `Se ha eliminado el producto ${id}`});
    } else {
        res.status(400).json({error:'producto no encontrado'});
    }
}

const productosUpdate = async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await contenedor.getById(id);
    
    if (producto !== null) {
        await contenedor.updateById(id, req.body);
        res.status(200).json({mensaje: `Se ha actualizado el producto ${id}`});
    } else {
        res.status(400).json({error:'producto no encontrado'});
    }
}

module.exports = {
    productosGetAll,
    productosGetById,
    productosSave,
    productosSaveHtml,
    productosDelete,
    productosUpdate,
}
