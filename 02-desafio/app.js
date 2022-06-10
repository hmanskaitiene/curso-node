const Contenedor = require('./models/contenedor')


const main = async () => {
    console.clear();

    const contenedor = new Contenedor();

    //Funcion que crea el archivo de productos en caso de no existir
    await contenedor.initFile();

    //Producto de ejemplo
    const producto_ejemplo = {
        price: 100,
        thumbnail: 'https://cdn.imagen.com/imagen.jpg',
        title : 'Producto ejemplo XX',
    }

    //Se crean 5 productos de prueba
    /*    
    for (let i = 1; i < 6; i++) {
        console.log(`Se ha creado el producto ${await contenedor.save(producto_ejemplo)}`);
    }
    */

    //Listado de productos
    //console.log(await contenedor.getAll());
   
    //Busca por ID
    //console.log(await contenedor.getById(1));
   
    //Elimina por ID
    //await contenedor.deleteById(1);
   
    //Elimina todos los productos
    //contenedor.deleteAll()
}

main();
