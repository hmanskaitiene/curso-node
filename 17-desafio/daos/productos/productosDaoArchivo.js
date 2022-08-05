import { ContenedorArchivo } from '../../containers/index.js';

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('productos.json');
    }
}

export default ProductosDaoArchivo;