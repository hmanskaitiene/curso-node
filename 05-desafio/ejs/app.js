const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Engine
app.set('view engine', 'ejs');
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
