import dotenv from 'dotenv';
dotenv.config();

import { knexConnection,knexConnectionOptions } from "./config/db.js";
import Knex from "Knex";


(async() =>{
    try {
        console.log(`Checkeando la estructura para el engine: ${process.env.PERSISTENCE}`);

        if (process.env.ENGINE == 'MARIADB'){
            // Solo se utiliza esta conexion sin la base seleccionada para la creación
            const create_connection = Knex({
                client:knexConnectionOptions.client,
                connection:{
                    host: knexConnectionOptions.connection.host,
                    user:knexConnectionOptions.connection.user,
                    password:knexConnectionOptions.connection.password
                }
            });
            await create_connection.raw('CREATE DATABASE IF NOT EXISTS ??', knexConnectionOptions.connection.database);
            await create_connection.destroy();
        }

        const exists_mensajes = await knexConnection.schema.hasTable('mensajes')
        if (!exists_mensajes) {
            console.log('Se crea la tabla mensajes')
            await knexConnection.schema.createTable('mensajes', table => {
                table.increments('id').primary().notNull(),
                table.string('usermail',250).notNull(),
                table.string('mensaje',300).notNull(),
                table.string('fecha',100)
            })
        }

        const exists_productos = await knexConnection.schema.hasTable('productos')
        if (!exists_productos) {
            console.log('Se crea la tabla productos')
            await knexConnection.schema.createTable('productos', table => {
                table.increments('id').primary().notNull(),
                table.string('nombre',100).notNull(),
                table.float('precio').notNull(),
                table.string('foto',200)
            })
        }


        await knexConnection.destroy();
    } catch (error) {
        console.log(error)
    }

})();
