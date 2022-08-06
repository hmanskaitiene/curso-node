import config from '../../config/config.js';

export default class ProductoPersistenceFactory {
  static getPersistence = async () => {
    switch (config.app.persistence) {
      case 'ARRAY':
        let { default: ProductosDaoMemoria } = await import('./productosDaoMemoria.js');
        return new ProductosDaoMemoria();
      case 'FILE':
        let { default: ProductosDaoArchivo } = await import('./productosDaoArchivo.js');
        return new ProductosDaoArchivo();
      case 'MONGO':
        let { default: ProductosDaoMongoDB } = await import('./productosDaoMongoDB.js');
        return new ProductosDaoMongoDB();
    }
  };
}
