import ProductService from '../services/productos.js';
import MessageService from '../services/mensajes.js';

const productService = new ProductService();
const messageService = new MessageService();

const socketController = async (socket) => {
    socket.emit('productos',await productService.getAll());

    socket.on('new-product', async producto => {
        await productService.save(producto);
        socket.emit('productos', await productService.getAll());
    })

    socket.emit('mensajes', await messageService.getAllNormalized());

    socket.on('new-message', async mensaje => {
        await messageService.save(mensaje)    
        const data = await messageService.getAllNormalized();
        socket.emit('mensajes', data);
    })
}

export default socketController;
