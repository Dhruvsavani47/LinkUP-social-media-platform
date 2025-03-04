import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    content:{
        type: String,
    },
    images:{
        type: Array,
        default: [],
    },
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:'comment'}],
    user:{type:mongoose.Schema.Types.ObjectId, ref:'user'}
},{
    timestamps: true,
})

const Posts = mongoose.model('post', postSchema);

export default Posts;