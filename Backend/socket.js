const socketIo = require('socket.io');
const messageService = require('./services/message.service');
const userModel = require('./models/user.model');
const doctorModel = require('./models/doctor.model');

module.exports = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('join', async ({ userId, userType }) => {
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'doctor') {
                await doctorModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
            socket.join(userId);
        });

        socket.on('sendMessage', async ({ senderId, senderModel, receiverId, receiverModel, content }) => {
            const message = await messageService.sendMessage(senderId, senderModel, receiverId, receiverModel, content);
            io.to(receiverId).emit('receiveMessage', message);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};