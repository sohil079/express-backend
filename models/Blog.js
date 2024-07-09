
const mongoose = require('mongoose'); // importation de la librairie mongobd, et ça peut être autre chose

var blogSchema = mongoose.Schema({     // définir mon modèl
    sujet  : {type: "string"},
    auteur : {type: "string"},
    description : {type: "string"},
    message : {type :"string"},
})

module.exports = mongoose.model('Blog', blogSchema); // exportation pour que le modèl soit utilisé ailleur (ex. app.js, NewBlog, EditBlog, Allposts.. )