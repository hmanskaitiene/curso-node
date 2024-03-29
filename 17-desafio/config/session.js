import MongoStore from 'connect-mongo'
import session from 'express-session'

let baseSession = session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_CNN,
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
    }),
    key: 'user_sid',
    secret: 'm1Cl4v3!',
    resave:false,
    saveUninitialized:false,
    cookie: {maxAge: 600000},
})

export {
    baseSession
}