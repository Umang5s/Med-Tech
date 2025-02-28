const Message = require('../models/message.model');

module.exports.sendMessage = async (senderId, senderModel, receiverId, receiverModel, content) => {
    if (!senderId || !senderModel || !receiverId || !receiverModel || !content) {
        throw new Error('Sender ID, Sender Model, Receiver ID, Receiver Model, and content are required');
    }

    const message = new Message({
        senderId,
        senderModel,
        receiverId,
        receiverModel,
        content,
        createdAt: new Date()
    });

    await message.save();
    return message;
}

module.exports.getMessages = async (userId1, userModel1, userId2, userModel2) => {
    if (!userId1 || !userModel1 || !userId2 || !userModel2) {
        throw new Error('Both user IDs and their models are required');
    }

    const messages = await Message.find({
        $or: [
            { senderId: userId1, senderModel: userModel1, receiverId: userId2, receiverModel: userModel2 },
            { senderId: userId2, senderModel: userModel2, receiverId: userId1, receiverModel: userModel1 }
        ]
    }).sort({ createdAt: 1 });

    return messages;
}