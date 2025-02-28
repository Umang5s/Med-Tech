const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Route to send a message
router.post('/send', authMiddleware.authUser, messageController.sendMessage);

// Route to get messages between a user and a doctor
router.get('/conversation/:doctorId', authMiddleware.authUser, messageController.getConversation);

module.exports = router;