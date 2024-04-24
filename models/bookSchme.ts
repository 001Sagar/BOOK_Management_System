import mongoose, { Schema } from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    author: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    publish_year: {
        type: Number,
        require: true,
        trim: true
    },
    bookAddBy :{
        type : mongoose.Schema.Types.ObjectId,
        ref :'User'
    }
}, {
    timestamps: true
})

const user = mongoose.model('Books', bookSchema);

export default user;