import mongoose from 'mongoose';

const notifySchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    recipients: [mongoose.Schema.Types.ObjectId],
    url: String,
    content: String,
    image: String,
    text: String,
    isRead: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
})

const Notifies = mongoose.model('notify', notifySchema);

export default Notifies;