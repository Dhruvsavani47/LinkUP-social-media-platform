import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username:{
        type: String,
        trim: true,
        unique: true,
        maxLength: 25,
        required: true
    },
    fullname:{
        type: String,
        trim: true,
        required: true,
        maxLength: 25,
    },
    email:{
        type: String,
        trim: true,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        default: '',
    },
    gender:{
        type: String,
        default: 'male',
    },
    website:{
        type: String,
        default: '',
    },
    phone:{
        type: String,
        default: '',
    },
    avatar:{
        type: String,
        default: '',
    },
    story:{
        type: String,
        default: '',
        maxLength: 200,
    },
    friends: [{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    following: [{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    saved: [{type:mongoose.Schema.Types.ObjectId, ref:'user'}]
    
},{
    timestamps: true,
})

const Users = mongoose.model('user', userSchema);

export default Users;