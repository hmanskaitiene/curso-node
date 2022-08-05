import mongoose from 'mongoose'

const MensajeSchema = mongoose.Schema({
    author: {
        id: { type: String },
        nombre: { type: String },
        apellido: { type: String },
        edad: { type: Number },
        alias: { type: String },
        avatar: { type: String },
      },
      text: {type: String},
      fecha: {type: String}
});

export default mongoose.model('Mensaje', MensajeSchema);

