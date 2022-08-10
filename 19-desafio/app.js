import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'

import connectDB from './db.js'

const app = express()
connectDB()

async function start () {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })

    await apolloServer.start()
    const PORT = process.env.PORT || 8080; 

    apolloServer.applyMiddleware({app})

    app.listen(PORT, ()=> console.log(`Servidor escuchando en el puerto ${PORT}`))

}

start()
