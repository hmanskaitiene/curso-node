## Desafío: Testeamos nuestra API REST
#### Como ejecutar el programa en su computadora:

1 - Instalar las dependecias.
```
npm install
```
2 - Definir las variables de entorno en el .env de acuerdo al .env.sample

3 - Para realizar las pruebas desde el cliente ejecutar:
```
npm run client-test
```
El resultado deberia ser algo parecido a esto:
```
> 18-desafio@1.0.0 client-test
> node ./client/clientAxios.js

El listado de productos :
[
  {
    id: 1,
    nombre: 'Producto 1',
    precio: '100',
    foto: 'https://cdn.icon-icons.com/icons2/3556/PNG/128/image_photo_photography_camera_icon_225026.png'
  },
  {
    id: 2,
    nombre: 'Producto 2',
    precio: '200',
    foto: 'https://cdn.icon-icons.com/icons2/3556/PNG/128/image_photo_photography_camera_icon_225026.png'
  }
]



Se ha creado el siguiente producto:
{
  id: 3,
  nombre: 'Producto de ejemplo',
  precio: '100',
  foto: 'https://cdn.icon-icons.com/icons2/3556/PNG/128/image_photo_photography_camera_icon_225026.png'
}



Se ha modificado el siguiente producto:
{
  id: 3,
  nombre: 'Producto de ejemplo modificado',
  precio: '500',
  foto: 'https://cdn.icon-icons.com/icons2/3556/PNG/128/image_photo_photography_camera_icon_225026.png'
}



Se ha eliminado el siguiente producto:
{
  id: 3,
  nombre: 'Producto de ejemplo modificado',
  precio: '500',
  foto: 'https://cdn.icon-icons.com/icons2/3556/PNG/128/image_photo_photography_camera_icon_225026.png'
}
```

4 - Para ejecutar las pruebas con mocha debe ejecutar:
```
npm run test
```

El resultado esperado es:

```

> 18-desafio@1.0.0 test
> mocha ./test/productos.test.js



  Estado del request al solicitar productos
    √ Debería devolver un estado 200 al pedir productos

  Obtener productos
    √ Debería obtener el listado de productos y esperar un array

  Insertar producto
    √ Debería poder insertar un producto obtener un objeto
    √ Debería tener la cantidad de productos correcta despues de haber insertado el producto

  Modificación de producto
    √ Debería poder modificar un producto y ver el dato modificado

  Eliminación de producto
    √ Debería poder eliminar un producto
    √ Debería tener la cantidad de productos correcta despues de haber eliminado el producto


  7 passing (78ms)
```
