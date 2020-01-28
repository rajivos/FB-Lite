const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    email: {
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