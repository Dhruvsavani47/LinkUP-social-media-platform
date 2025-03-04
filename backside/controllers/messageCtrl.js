import Conversations from "../models/conversationModel.js";
import Messages from "../models/messageModel.js";

export const createMessage = async (req, res) => {
    try {
        const {recipient, text, media} = req.body;

        if(!recipient || (!text?.trim() && media.length === 0)){
            return;
        }

        const newConversation = await Conversations.findOneAndUpdate({
            $or: [
                {recipients: [req.user._id, recipient]},
                {recipients: [recipient, req.user._id]}
            ]
        },{
            recipients: [req.user._id, recipient],
            text, media
        },{
            new: true, upsert: true
        })

        const newMessage = await new Messages({
            conversation: newConversation._id,
            sender: req.user._id,
            recipient,
            text, media
        })

        await newMessage.save();
        res.json({newConversation});
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getConversations = async (req, res) => {
    try {
        const conversation = await Conversations.find({
            recipients: req.user._id,
        }).sort("updatedAt").populate("recipients", "avatar username fullname");

        res.json({
            conversation, 
            result: conversation.length
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getMessages = async (req, res) => {
    try {
        const message = await Messages.find({
            $or: [
                {sender: req.user._id, recipient: req.params.id},
                {sender: req.params.id, recipient: req.user._id},
            ]
        }).sort("createdAt").populate("recipient", "avatar username fullname");

        res.json({
            message, 
            result: message.length
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const deleteMessages = async (req, res) => {
    try {
        await Messages.findOneAndDelete({
            _id: req.params.id,
            sender: req.user._id
        })

        res.json({ msg: "Message deleted" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}