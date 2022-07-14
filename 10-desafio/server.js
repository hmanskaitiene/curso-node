require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars')
const {engine} = handlebars;
const path = require('path');

const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const { authLogin,authLoginPost,authLogout,dashboard } = require('./controllers/auth');
const {sessionChecker} = require('./middlewares/session-checker');

const ContenedorMariaDB = require('./model/contenedorMariaDB');
const ContenedorMongoDB = require('./model/contenedorMongoDB');
const Normalizador = require('./model/normalizador');
const normalizer = new Normalizador();


app.use(
    session({
      //Seteo de cookie en Mongo
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_CNN,
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      }),

      key: 'user_sid',
      secret: 'm1Cl4v3!',
      resave: false,
      saveUninitialized: true,
      cookie: {maxAge: 600000},
    })
  )

  
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname ,'public')));
app.use(cookieParser())
app.use('/api/productos-test', require('./routes/productos'));

app.engine(
  "hbs",
  engine({
      extname: ".hbs",
      defaultLayout: "layout.hbs",
  })
);

app.set("views", "./views");
app.set("view engine", "hbs");

//Se instancian los contenedores que atenderan los mensajes y productos
const productos = new ContenedorMariaDB();
const mensajero = new ContenedorMongoDB();

const { dbConnection } = require('./config/db');

(async () => {
    await dbConnection();
})();


app.get('/', sessionChecker, (req, res) => {
  res.redirect("/login");
})
app.get('/login',sessionChecker,authLogin)
app.get('/logout',authLogout)
app.get('/dashboard',dashboard)
app.post('/login',authLoginPost);


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


