require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars')
const {engine} = handlebars;
const path = require('path');
const passport = require('passport');
const cluster = require('cluster');
const core = require('os');

const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser')

const argv = require('./config/yargs');
const { dbConnection } = require('./config/db.js');
const { baseSession } = require('./config/session.js');
const { initializePassport } = require('./config/passport.config.js');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(baseSession)
initializePassport();
app.use(passport.initialize())
app.use(passport.session())
app.use('/api/productos-test', require('./routes/productos.js'));
app.use('/',  require('./routes/auth.js'));
app.use('/',  require('./routes/info.js'));
app.use('/api',  require('./routes/randoms.js'));
const { socketController } = require('./sockets/controller');
io.on('connection', socketController);
app.use(express.static(path.join(__dirname ,'public')));

app.engine(
  "hbs",
  engine({
      extname: ".hbs",
      defaultLayout: "layout.hbs",
  })
);

app.set("views", "./views");
app.set("view engine", "hbs");



(async () => {
    await dbConnection();
})();



const startServer =() => {
    server.listen(puerto, () => {
        console.log(`Escuchando port: ${server.address().port} en proceso ID:(${process.pid})`); 
    });

    server.on('error', (err) => console.log(err));
}

const puerto = argv.port ? argv.port : argv._.length > 0 ? argv._[0] : 8080
const modo = argv.modo || 'fork';


if (modo !== 'fork'){
    if (cluster.isPrimary) {
        console.log(`Proceso principal ID:(${process.pid})`)
        for(let i = 0; i <  core.cpus().length; i++) {
            cluster.fork();
        }
    
        cluster.on('exit', (worker) => {
            cluster.fork();
        });
    
    } else {
        startServer();
    }
} else {
    startServer();
}

