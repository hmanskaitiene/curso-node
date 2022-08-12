import fastify from 'fastify'
const app = fastify({ logger: true });

import routes  from './routes/productos.js';
import connectDB from './db.js';

connectDB()

routes.forEach((route) => {
	app.route(route);
});

const PORT = process.env.PORT || 8080; 

const start = async () => {
	try {
		await app.listen(PORT);
		app.log.info(`Servidor escuchando en el puerto ${PORT}`);
	} catch (error) {
		app.log.error('Error inciando fastify server');
	}
};
start();
