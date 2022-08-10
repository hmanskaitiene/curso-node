## Desafío:  Reformar para usar GraphQL 
#### Como ejecutar el programa en su computadora:

1 - Instalar las dependecias.
```
npm install
```
2 - Definir las variables de entorno en el .env de acuerdo al .env.sample

3 - Ejecutar para iniciar el servidor:
```
npm start
```
4 - En un navegador web ingresar en la siguiente url:
```
localhost:8080/graphql
```

5 - Ejecutar los siguientes comandos para realizar las operaciones:

Creación de producto:
```
mutation create($nombre: String, $descripcion: String, $precio: Float) {
    create(nombre: $nombre, descripcion: $descripcion, precio: $precio) {
      id
      nombre
      descripcion
      precio
    }
}

{
  "nombre":"Producto de prueba",
  "descripcion":"Descripcion de prueba",
  "precio":1234
}
```

Obtener producto/s:
```
query getAll {
  getAll {
    id
    nombre
    descripcion
  }
}

query getById($getId: ID) {
    getById(id: $getId) {
        id
        nombre
        descripcion
    }
}

{ "getId":"ID_DEL_PRODUCTO_A_BUSCAR"}
```

Actualizar producto/s:
```
mutation update($updId: ID,  $nombre: String,$descripcion: String, $precio: Float) {
  update(id: $updId, nombre: $nombre, descripcion: $descripcion, precio: $precio) {
    id
    nombre
    descripcion
    precio
  }
}

{
  "updId":"ID_DEL_PRODUCTO_A_MODIFICAR",
  "nombre":"Produ modificado",
  "descripcion":"Descripcion modificada",
  "precio":1234
}
```


Eliminar producto/s:
```
mutation delete($delId: ID!) {
  delete(id: $delId) {
    id
    nombre
    descripcion
    precio
  }
}

{ "delId":"ID_DEL_PRODUCTO_A_ELIMINAR"}
```