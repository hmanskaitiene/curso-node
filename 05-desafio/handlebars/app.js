const express = require('express')
const { engine } = require('express-handlebars')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Engine
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");

const productos = [];
app.post('/productos', (req, res) => {
    const producto = req.body
    productos.push(producto);
    res.redirect('/')
})

app.get('/productos', (req, res) => {
    res.render("productos", {
        productos,
        productosExists: productos.length
    });
});

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
