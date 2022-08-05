import config from '../../config/config.js';

export default class MessagePersistenceFactory {
  static getPersistence = async () => {
    switch (config.app.persistence) {
      case 'ARRAY':
        let { default: MensajesDaoMemoria } = await import('./mensajesDaoMemoria.js');
        return new MensajesDaoMemoria();
      case 'FILE':
        let { default: MensajesDaoArchivo } = await import('./mensajesDaoArchivo.js');
        return new MensajesDaoArchivo();
      case 'MONGO':
        let { default: MensajesDaoMongoDB } = await import('./mensajesDaoMongoDB.js');
        return new MensajesDaoMongoDB();
  
    }
  };
}
