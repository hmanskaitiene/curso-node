
db = connect( 'mongodb://localhost/ecommerce' );

db.createCollection("productos");
db.createCollection("mensajes");
db.mensajes.insertMany([
    {usermail:"pepe@argento.com.ar",fecha:ISODate(),mensaje:"Hola"},
    {usermail:"carlos@ejemplo.com.ar",fecha:ISODate(),mensaje:"Como estas?"},
    {usermail:"pepe@argento.com.ar",fecha:ISODate(),mensaje:"Hola"},
    {usermail:"carlos@ejemplo.com.ar",fecha:ISODate(),mensaje:"Bien y vos?"},
    {usermail:"pepe@argento.com.ar",fecha:ISODate(),mensaje:"Bien, y tu familia?"},
    {usermail:"carlos@ejemplo.com.ar",fecha:ISODate(),mensaje:"Todo tranquilo por suerte, la tuya?"},
    {usermail:"pepe@argento.com.ar",fecha:ISODate(),mensaje:"Todo en orden"},
    {usermail:"carlos@ejemplo.com.ar",fecha:ISODate(),mensaje:"Bueno, manda saludos"},
    {usermail:"pepe@argento.com.ar",fecha:ISODate(),mensaje:"Chau!"},
    {usermail:"carlos@ejemplo.com.ar",fecha:ISODate(),mensaje:"Nos vemos"},
])

db.productos.insertMany([
    {nombre:"Zapatillas",precio:120,foto:"https://pics.freeicons.io/uploads/icons/png/9690872761656849811-512.png"},
    {nombre:"Botas",precio:580,foto:"https://pics.freeicons.io/uploads/icons/png/9690872761656849811-512.png"},
    {nombre:"Medias",precio:900,foto:"https://pics.freeicons.io/uploads/icons/png/9690872761656849811-512.png"},
    {nombre:"Alpargatas",precio:1280,foto:"https://pics.freeicons.io/uploads/icons/png/9690872761656849811-512.png"},
    {nombre:"Ojotas",precio:1700,foto:"https://pics.freeicons.io/uploads/icons/png/9690872761656849811-512.png"},
    {nombre:"Sandalias",precio:2300,foto:"https://pics.freeicons.io/uploads/icons/png/9690872761656849811-512.png"},
    {nombre:"Remera",precio:2860,foto:"https://pics.freeicons.io/uploads/icons/png/9690872761656849811-512.png"},
    {nombre:"Buzo",precio:3350,foto:"https://pics.freeicons.io/uploads/icons/png/9690872761656849811-512.png"},
    {nombre:"Pantalón",precio:4320,foto:"https://pics.freeicons.io/uploads/icons/png/9690872761656849811-512.png"},
    {nombre:"Cinturón",precio:4990,foto:"https://pics.freeicons.io/uploads/icons/png/9690872761656849811-512.png"},
])

db.mensajes.find();
db.productos.find();

db.productos.estimatedDocumentCount();
db.mensajes.estimatedDocumentCount();

db.productos.insertOne({nombre:"Bermudas",precio:4120,foto:"https://pics.freeicons.io/uploads/icons/png/9690872761656849811-512.png"});

db.productos.find({"precio":{$lt:1000}},{"nombre":1});
db.productos.find({"precio":{$gte:1000,$lte:3000}},{"nombre":1});
db.productos.find({"precio":{$gt:3000}},{"nombre":1});
db.productos.find().skip(2).limit(1).sort({"precio": 1})

db.productos.updateMany({},{$set:{"stock":100}});
db.productos.updateMany({"precio":{$gt:4000}},{$set:{"stock":0}});
db.productos.deleteMany({"precio":{$lt:1000}});

db = connect( 'mongodb://localhost/admin' );

db.createUser(
    {
        user: "pepe",
        pwd:"asd456",
        roles:[
            {role:"read",db:"ecommerce"}
        ]
    }
);
