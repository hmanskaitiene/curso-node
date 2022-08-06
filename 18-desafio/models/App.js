import cluster from 'cluster';
import cookieParser from 'cookie-parser';
import core from 'os';
import express from 'express';
import handlebars from 'express-handlebars';
import http from "http";
const { engine } = handlebars;
import path from'path';
import { fileURLToPath } from 'url';
import passport from 'passport';
import { Server } from 'socket.io'; 

import socketInit from '../utils/sockets.js';
import routerProductos from "../routes/productos.js";
import routerMensajes from "../routes/mensajes.js";
import routerInfo from "../routes/info.js";
import routerAuth from "../routes/auth.js";
import routerRandom from "../routes/randoms.js";

import argv from'../config/yargs.js';
import { dbConnection } from '../config/db.js';
import { baseSession } from '../config/session.js';
import loggerMiddleware from'../middlewares/logger.js'
import { initializePassport } from '../config/passport.config.js';
import logger from '../utils/logger.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class App {

    constructor() {
        this.app  = express();
        this.server = http.Server(this.app);
        this.io = new Server(this.server);
        //this.port = argv.port ? argv.port : argv._.length > 0 ? argv._[0] : 8080
        this.port = process.env.PORT ? process.env.PORT : argv.port ? argv.port : 8080
        this.modo = argv.modo || 'fork';
        this.administrador = false;
        this.logger = logger;

        this.paths = {
            productos: '/api/productos',
            mensajes: '/api/mensajes',
            auth:      '/',
            info:      '/',
            random:    '/api',
        }

        this.conectarDB();
        this.middlewares();
        this.routes();
        this.sockets();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        this.app.use(loggerMiddleware);
        this.app.use( express.json() );
        this.app.use( express.static('public') );
        this.app.use(cookieParser());
        this.app.use(baseSession);
        initializePassport();
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.app.engine(
            "hbs",
            engine({
                extname: ".hbs",
                defaultLayout: "layout.hbs",
            })
          );

        this.app.set('socket',this.io);
        this.app.set("views", "./views");
        this.app.set("view engine", "hbs");
        this.app.set("logger", this.logger);
  
    }

    routes() {
        this.app.use( this.paths.auth, routerAuth );
        this.app.use( this.paths.productos, routerProductos);
        this.app.use( this.paths.mensajes, routerMensajes);
        this.app.use( this.paths.info, routerInfo );
        this.app.use( this.paths.random, routerRandom );

        this.app.use("*", (req, res) => {
            const error_message = `Ruta ${req.originalUrl} método ${req.method} no implementada`;
            this.logger.warn(error_message)
            res.status(404).json({"message": error_message})
        });

    }

    sockets() {
        this.io.on('connection', socketInit );
    }

    start() {
        if (this.modo !== 'fork'){
            if (cluster.isPrimary) {
                this.logger.info(`Proceso principal ID:(${process.pid})`)
                for(let i = 0; i <  core.cpus().length; i++) {
                    cluster.fork();
                }
            
                cluster.on('exit', (worker) => {
                    cluster.fork();
                });
            
            } else {
                this.listen();
            }
        } else {
            this.listen();
        }
    }


    listen() {
        this.server.listen( this.port, () => {
            this.logger.info(`Servidor corriendo en puerto ${this.port}`)
        });
    }

}

export default App;
