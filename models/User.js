
const mongoose = require('mongoose'); 

var userSchema = mongoose.Schema({     
    username : { type: String , required : true},
    email : { type: String , required : true, unique : true},
    password : { type: String , required : true},
    admin : { type : Boolean}
})

module.exports = mongoose.model('User', userSchema); //exportation pour que le modèl soit utilisé ailleur (ex. app.js, NewBlog, EditBlog, Allposts.. )