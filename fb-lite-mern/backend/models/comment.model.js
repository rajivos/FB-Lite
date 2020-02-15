const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body : {
        type: String,
        required: true,
    },
    parentId : {
        type: String,
    },
    memberId : {
        type: String,
    }
}, {
    timestamps:true,
})

const Comment = mongoose.model('Comment', commentSchema);



module.exports = Comment;