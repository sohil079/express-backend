
const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    nom : {type: "string"},
    prenom : {type: "string"},
    email : {type: "string"},
})

module.exports = mongoose.model('Contact', contactSchema);