import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    conversation: {type:mongoose.Schema.Types.ObjectId, ref:'conversation'},
    sender: {type:mongoose.Schema.Types.ObjectId, ref:'user'},
    recipient: [{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    text: String,
    media: Array,
},{
    timestamps: true,
})

const Messages = mongoose.model('message', messageSchema);

export default Messages;