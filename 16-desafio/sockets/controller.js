const { socketService } = require('../services/sockets.js')

const socketController = async (socket) => {
    socketService(socket)
}

module.exports = {
    socketController
}