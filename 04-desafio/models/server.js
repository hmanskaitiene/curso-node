const express = require('express')

class Server {

    constructor(){
        this.app = express()
        this.port = 8080;
        this.productosPath = '/api/productos';

        this.middlewares();

        this.routes();
    }
    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extendedparser : true }));
    }

    routes(){
        this.app.use(this.productosPath, require('../routes/productos'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Server corriendo en el puerto: ${this.port}`);
        });
    }
}

module.exports = Server;