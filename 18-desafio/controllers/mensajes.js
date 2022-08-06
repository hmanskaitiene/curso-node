import MessageService from '../services/mensajes.js';
const messageService = new MessageService();

const getAll = async (req, res) => {
    const response = await messageService.getAll();
    res.status(response.status).json(response.data)
}

const create = async (req, res) => {
    const response = await messageService.save(req.body);

    const io = await req.app.get("socket");    

    // Por el momento se envian todos los mensajes. Lo ideal seria mandar solo el mensaje creado
    const mensajes = await messageService.getAllNormalized();
    io.emit("new-message", mensajes);

    res.status(response.status).json(response.data)
}

export default {
    getAll,
    create,
}
