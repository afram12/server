const mongoose = require("mongoose");

const courseschema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    duration: String,
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
});
const courseModel = mongoose.model('course', courseschema);
module.exports = courseModel;