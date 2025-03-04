import mongoose from 'mongoose';

const conversationSchema = mongoose.Schema({
    recipients: [{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    text: String,
    media: Array,
},{
    timestamps: true,
})

const Conversations = mongoose.model('conversation', conversationSchema);

export default Conversations;