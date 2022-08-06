import { ContenedorMongoDB } from '../../containers/index.js';
import Producto from '../../models/Producto.js';

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Producto);
    }
}

export default ProductosDaoMongoDB;