const { strict } = require("assert");
const mongoose = require("mongoose");

const teacherschema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }




})
const teacherModel = mongoose.model('teacher', teacherschema)
module.exports = teacherModel