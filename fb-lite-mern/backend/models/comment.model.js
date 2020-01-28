const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 6
    },
    parentId : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 6
    },


}, {
    timestamps:true,
})

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;