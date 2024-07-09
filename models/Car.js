
const mongoose = require('mongoose'); 

var carSchema = mongoose.Schema({     //définition de mon modèl (car)
    marque : {type: "string"},
    modele : {type: "string"},
    couleur : {type: "string"},
    description : {type :"string"},
})

module.exports = mongoose.model('Car', carSchema); //exportation pour que le modèl soit utilisé ailleur (ex. app.js, NewBlog, EditBlog, Allposts.. )