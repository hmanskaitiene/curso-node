import { ContenedorArchivo } from '../../containers/index.js';

class MensajesDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('mensajes.json');
    }
}

export default MensajesDaoArchivo;