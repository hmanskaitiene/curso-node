const { response } = require('express');
const Contenedor  = require('../models/contenedor');

const contenedor = new Contenedor();

const productosGetAll = async (req, res) => {
    const productos = await contenedor.getAll();
    res.status(200).json(productos);
}

const productosGetById = async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await contenedor.getById(id);
    res.status(200).json(producto);
}

const productosSave = async (req, res) => {
    const producto = req.body;
    const id = await contenedor.save(producto)
    res.status(200).json({id});
}

const productosDelete = async (req, res) => {
    const id = parseInt(req.params.id);
    await contenedor.deleteById(id)
    res.status(200).json({mensaje: `Se ha eliminado el producto ${id}`});
}

const productosUpdate = async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = req.body;
    await contenedor.updateById(id, producto);
    res.status(200).json({mensaje: `Se ha actualizado el producto ${id}`});
}

module.exports = {
    productosGetAll,
    productosGetById,
    productosSave,
    productosDelete,
    productosUpdate,
}
