import Producto from '../models/Product.js';

const productGetAll = async (req, reply) => {
	try {
		const products = await Producto.find();
		return products;
	} catch (error) {
		throw error;
	}
};

const productGetById = async (req, reply) => {
	try {
		const productId = req.params.id;
		const product = await Producto.findById(productId);
		return product;
	} catch (error) {
		throw error;
	}
};

const productAdd = async (req, reply) => {
	try {
		const product = new Producto(req.body);
		return product.save();
	} catch (error) {
		throw error;
	}
};

const productUpdate = async (req, reply) => {
	try {
		const productId = req.params.id;
		const product = req.body;
		const update = await Producto.findByIdAndUpdate(productId, product, {new: true});
		return update;
	} catch (error) {
		throw error;
	}
};

const productDelete = async(req, reply) => {
	try {
		const productId = req.params.id;
		const product = Producto.findByIdAndDelete(productId);
		return product;
	} catch (error) {
		throw error;
	}
};

export default {
	productGetAll,
	productGetById,
	productAdd,
	productUpdate,
	productDelete
}