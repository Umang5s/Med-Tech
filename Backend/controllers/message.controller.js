const messageService = require('../services/message.service');

module.exports.sendMessage = async (req, res, next) => {
    try {
        const { receiverId, receiverModel, content } = req.body;
        const senderId = req.user._id;
        const senderModel = req.userModel; // Assuming you set this in your auth middleware
        const message = await messageService.sendMessage(senderId, senderModel, receiverId, receiverModel, content);
        res.status(201).json(message);
    } catch (error) {
        next(error);
    }
};

module.exports.getConversation = async (req, res, next) => {
    try {
        const userId1 = req.user._id;
        const userModel1 = req.userModel; // Assuming you set this in your auth middleware
        const userId2 = req.params.userId;
        const userModel2 = req.params.userModel;
        const messages = await messageService.getMessages(userId1, userModel1, userId2, userModel2);
        res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
};