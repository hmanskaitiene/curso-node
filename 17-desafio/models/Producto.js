import mongoose from 'mongoose'

const ProductoSchema = mongoose.Schema({
    nombre: { type: String },
    precio: { type: Number },
    foto: { type: String }
});

export default mongoose.model('Producto', ProductoSchema);

