const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: "student"
    }

})
const userModel = mongoose.model('user', userschema)
module.exports = userModel
