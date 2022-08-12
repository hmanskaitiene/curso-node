import { mongoose } from 'mongoose'

const productoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number
}, { versionKey: false })

export default mongoose.model('Producto', productoSchema)
