import MessageDto from '../dtos/messageDto.js'
import MessagePersistenceFactory from '../daos/mensajes/mensajePersistenceFactory.js';   
import Normalizador from '../utils/normalizador.js';

const normalizer = new Normalizador();


class MessageService {
    constructor() {
      this.mensajesDao;
      this.init();
    }

    init = async () => {
      this.mensajesDao = await MessagePersistenceFactory.getPersistence();
    };

    getAll = async () => {
        let result = await this.mensajesDao.getAll();
        let resultsDTO = result.map((mensaje) => new MessageDto(mensaje));
        return resultsDTO;
    };

    getAllNormalized = async () => {
        const mensajes = await this.getAll();
        const data = normalizer.getDataNormalized(mensajes);
        return data;
      };

    save = async (mensaje) => {
      return await this.mensajesDao.save(new MessageDto(mensaje));
    };

}

export default MessageService;