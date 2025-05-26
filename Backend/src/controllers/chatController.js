
const { configureOpenAi } = require("../config/openai-config");
const User = require("../models/User");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey : process.env.GENAI_API });

exports.generateChatCompletion = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, msg: "Message is required" });
        }

        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }


        const chatResponse = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: message,
        });
     

        const newChat = {
            message : message,
            chatresponse: chatResponse.text,
        }


        user.chats.push(newChat);
        await user.save();

        return res.status(200).json({
            success: true,
            chats: newChat.chatresponse,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Server error",
            error: error.message,
        });
    }
};

exports.sendChatsToUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        console.log(  "user : ",user )

        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        return res.status(200).json({
            success: true,
            chats: user.chats,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Server error",
            error: error.message,
        });
    }
};

exports.deleteChats = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        user.chats = [];
        await user.save();

        return res.status(200).json({ success: true, msg: "Chat history deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Server error",
            error: error.message,
        });
    }
};
