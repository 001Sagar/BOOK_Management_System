import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    phn: {
        type: Number,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    }
}, {
    timestamps: true
})

const user = mongoose.model('User', userSchema);

export default user;