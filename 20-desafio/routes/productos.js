import productController from '../controllers/productos.js';

const routes = [
	{
		method: 'GET',
		url: '/api/productos',
		handler: productController.productGetAll
	},
	{
		method: 'GET',
		url: '/api/productos/:id',
		handler: productController.productGetById
	},
	{
		method: 'POST',
		url: '/api/productos',
		handler: productController.productAdd
	},
	{
		method: 'PUT',
		url: '/api/productos/:id',
		handler: productController.productUpdate
	},
	{
		method: 'DELETE',
		url: '/api/productos/:id',
		handler: productController.productDelete
	}

];

export default routes;