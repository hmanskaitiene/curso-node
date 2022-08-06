import axios from 'axios'

const url = 'http://localhost:8080/api/productos';

const data = {
    "nombre": "Producto de ejemplo",
    "precio": "100",
    "foto": "https://cdn.icon-icons.com/icons2/3556/PNG/128/image_photo_photography_camera_icon_225026.png"
}

const updateProduct = {
    "nombre": "Producto de ejemplo modificado",
    "precio": "500",
    "foto": "https://cdn.icon-icons.com/icons2/3556/PNG/128/image_photo_photography_camera_icon_225026.png"
}

// Este el id de producto para pruebas
let productId = 0;

axios.get(url)
.then(result => {
    console.log("El listado de productos :")
    console.log(result.data)
    return axios.post(url, data)
})
.then(result => {
    console.log("\n\n")
    console.log("Se ha creado el siguiente producto:")
    console.log(result.data)
    productId = result.data.id;
    return axios.put(`${url}/${productId}`, updateProduct)
})
.then(result => {
    console.log("\n\n")
    console.log("Se ha modificado el siguiente producto:")
    console.log(result.data)
    return axios.delete(`${url}/${productId}`)
})
.then(result => {
    console.log("\n\n")
    console.log("Se ha eliminado el siguiente producto:")
    console.log(result.data)
})


