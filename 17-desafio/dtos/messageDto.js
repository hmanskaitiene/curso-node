class MessageDto {
    constructor(message) {
      this.id = message.id;
      this.text = message.text;
      this.fecha = message.fecha;
      this.author = {
        "id": message.author.id,
        "nombre": message.author.nombre,
        "apellido": message.author.apellido,
        "edad": message.author.edad,
        "alias": message.author.nombre,
        "avatar": message.author.avatar
      }
    }
  }

export default MessageDto;
