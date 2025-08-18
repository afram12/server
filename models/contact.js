const mongoose = require("mongoose");

const contactschema = new mongoose.Schema({
    name: {
        type: String
    }


})
const contactModel = mongoose.model('contact', contactschema)
module.exports = contactModel
