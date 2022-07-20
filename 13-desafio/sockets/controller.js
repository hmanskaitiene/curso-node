const ContenedorMariaDB = require('../containers/contenedorMariaDB.js');
const ContenedorMongoDB = require('../containers/contenedorMongoDB.js');
const Normalizador = require('../models/Normalizador.js');
const normalizer = new Normalizador();


//Se instancian los contenedores que atenderan los mensajes y productos
const productos = new ContenedorMariaDB();
const mensajero = new ContenedorMongoDB();

const socketController = async (socket) => {
    console.log('Nueva conexión');

    socket.emit('productos',await productos.getAll());

    socket.on('new-product', async producto => {
        await productos.save(producto);
        io.sockets.emit('productos', await productos.getAll());
    })

    const mensajes = await mensajero.getAll();
    const data = normalizer.getDataNormalized(mensajes)

    socket.emit('mensajes', data);

    socket.on('new-message', async mensaje => {
        try {
            await mensajero.save(mensaje)    
        } catch (error) {
            console.log(error);
        }

        const mensajes = await mensajero.getAll();
        const data = normalizer.getDataNormalized(mensajes)

        socket.emit('mensajes', data);
    })

}


module.exports = {
    socketController
}