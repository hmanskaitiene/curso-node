import ProductService from '../services/productos.js';
import MessageService from '../services/mensajes.js';

const productService = new ProductService();
const messageService = new MessageService();

const socketInit = async (socket) => {
    socket.emit('productos',await productService.getAll());
    socket.emit('mensajes', await messageService.getAllNormalized());
}

export default socketInit;
