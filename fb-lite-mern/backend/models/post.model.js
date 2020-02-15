const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;

const postSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    authorid: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    authorname: {
        type: String,
        required: true,
    },
    comments: {
        type: Array
    }
}, {
    timestamps:true,
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;