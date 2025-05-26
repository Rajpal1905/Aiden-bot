const { generateChatCompletion, sendChatsToUser, deleteChats } = require("../controllers/chatController");
const { authMiddleware } = require("../middleware/auth");

const chatRouter = require("express").Router()
chatRouter.post('/user-chat',authMiddleware,generateChatCompletion)
chatRouter.get('/all-chat',authMiddleware,sendChatsToUser)
chatRouter.get('/delete-chat',authMiddleware,deleteChats)

module.exports = chatRouter;