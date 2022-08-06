import { ContenedorMongoDB } from '../../containers/index.js';
import Mensaje from '../../models/Mensaje.js';

class MensajeDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Mensaje);
    }
}

export default MensajeDaoMongoDB;