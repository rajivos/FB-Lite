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
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    visibility: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
    },
    screenName: {
        type: String
    },

    friendRequests: {
        type: Array
    },
    friends: {
        type: Array
    },
    friendRequested: {
        type:Array
    }
    
}, {
    timestamps:true,
})

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;