import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    tag: Object,
    reply: mongoose.Schema.Types.ObjectId,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    postId: mongoose.Schema.Types.ObjectId,
    postUserId: mongoose.Schema.Types.ObjectId,
},{
    timestamps: true,
})

const Comments = mongoose.model('comment', commentSchema);

export default Comments;