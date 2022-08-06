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
        let data = result.map((mensaje) => new MessageDto(mensaje));
        return { status:200, data } 
    };

    getAllNormalized = async () => {
        const { data }  = await this.getAll();
        const normalizedMsgs = normalizer.getDataNormalized(data);
        return normalizedMsgs;
      };

    save = async (mensaje) => {
      const data = await this.mensajesDao.save(new MessageDto(mensaje));
      return { status:200, data: new MessageDto(data) }       
    };

}

export default MessageService;