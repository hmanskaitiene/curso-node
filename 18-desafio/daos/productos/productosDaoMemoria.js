import { ContenedorMemoria } from '../../containers/index.js';

class ProductosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super([]);
    }
}

export default ProductosDaoMemoria;