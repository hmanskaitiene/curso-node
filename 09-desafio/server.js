require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');

const ContenedorMariaDB = require('./model/contenedorMariaDB');
const ContenedorMongoDB = require('./model/contenedorMongoDB');
const Normalizador = require('./model/normalizador');
const normalizer = new Normalizador();

const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.engine('handlebars', engine());

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/api/productos-test', require('./routes/productos'));

//Se instancian los contenedores que atenderan los mensajes y productos
const productos = new ContenedorMariaDB();
const mensajero = new ContenedorMongoDB();

const { dbConnection } = require('./config/db');

(async () => {
    await dbConnection();
})();

io.on('connection', async socket => {
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
});

server.listen(process.env.PORT, () => {
    console.log(`Escuchando port: ${server.address().port}`); 
});

server.on('error', (err) => console.log(err));