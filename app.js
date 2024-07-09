
// Appel de la dépendence express
var express = require('express');  //1//   //de préférence mettre le nom de la variable le même nom de la dépendence

var app = express();                     // (app) Permet d'utiliser la dépendence autant on veut/ on met la dépndence express dans la varéable app

var Contact = require ("./models/Contact"); // on importe le model contact qui se trouve dans le fichier models/contact.js

var Blog = require ("./models/Blog");      //Import du model Blog 2em Etape

var Car = require ("./models/Car"); //Import du modèl Car

var bodyParser = require("body-parser");  // 2   // librairie à installer / récupere ce que l'utilisateur à rentré dans le formulaire et soit exploitable
app.use(bodyParser.urlencoded({extended: false}));   //on utilise la dépendence body-parser avec l'action extended: false pour que le serveur puisse traiter les infos qui sont encodé en format urlencoded

//Appel de la dependence dotenv
require('dotenv').config();
var mongoose = require('mongoose');   // 3   // permet d'utiliser les fonctionnalité mongobd

const url = process.env.DATABASE_url
// const url = "mongodb+srv://erkmoiz:erksohil0078@cluster0.x1hoexh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" // on crée une const url et on colle le lien de connexion à la base de données entre ""
mongoose.connect(url) 
.then(console.log("mongodb connected !"))  // 
.catch(error => console.log(error));  // on affiche error si la connection à la base de données échoue.

app.set('view engine', 'ejs');
 

const methodOverride = require('method-override');
app.use(methodOverride('_method'));                        // methodeOverride de mettre à jour du formulaire

// Appel de la dependence bcrypt
const bcrypt = require('bcrypt');
app.post("/nouveaucontact", function(req, res){
    const Data = new Contact({            // céation un model (contact), et de le mettre ou stocker dans le const data
        nom: req.body.nom,           //
        prenom: req.body.prenom,     // Model  et Formulaire
        email: req.body.email,       //
        message: req.body.message    //

    })
    Data.save()                               // donnée précedente est sauvgarder avec fonction (.save)
    .then(()=> {                             // .then quand c' réuissie
        console.log ("Contact saved !"); 
        // res.end();
        res.redirect('/');                   // faire une redirection
    })
    .catch(error => console.log(error));
});

//----------------------------------------------------
app.post("/nouveaucontact", function(req, res){
    const Data = new Contact({          
        nom: req.body.nom,           
        prenom: req.body.prenom,     
        email: req.body.email,       
        message: req.body.message 

    })
    Data.save()                               
    .then(()=> {                             
        console.log ("Contact saved !"); 
        // res.end();
        res.redirect('/');                  
    })
    .catch(error => console.log(error));
});

// app.get('/', function (req, res) {
//     Contact.find()                      // récuperer la totalité des données(on a décidé de les mettre dans le terminal ou sinon on peux les mettre dans les pages web
//     .then(data=>{                      // Opération réuissie    .then est une fonction  fléche signifie qu'est ce qu'on va faire avec ces données
//         console.log(data);            // => instruction  affichage dans le console log
//         res.end();                   // => instruction  une fois terminé on ferme la réponse  ---- plus de 2 instructions on met les accolades
// })
//     .catch(error => console.log(error)); // tt va mal  .catch est une fonction

// });


// READ
app.get('/', function (req, res){
    Contact.find()
    .then(data => {                               // data c'est la valeur du retour
    res.render('Home', {data:data});             //
    })
    .catch(error => console.log(error));
});


// CREAT
app.get('/formulairecontact', function (req, res){
    res.render('NewContact');
});


// Afficher page update
app.get('/contact/:identifiant', function(req, res){
    Contact.findOne({
        _id : req.params.identifiant
    })
    .then(data =>{
        res.render('EditContact', {data:data});
    })
    .catch(error => console.log(error));
})

// UPDATE

app.put('/updatecontact/:id', function(req, res){
    const Data = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        message: req.body.message
    }
    // Matching : mise à jour si correspondance entre  id présent dans la base (_id) et présent dans l'url (params.id)
    Contact.updateOne({                         
        _id : req.params.id},{$set: Data})  // _id vient de la base de donnée, et set data la ou l'info envoyé au serveur
    .then(result => {
        console.log(result);
        console.log("contact updated !");
        res.redirect('/');
})
    .catch(error => console.log(error));

})

// DELETE

app.delete('/deletecontact/:id', function(req, res){
    Contact.findOneAndDelete({                // model contact
        _id : req.params.id
    })
    .then(()=>{
        console.log("contact delete");
        res.redirect('/');
    })
    .catch(error => console.log(error));
});




//  var path = require('path');     //Permet de lire le fichier index.html


// app.get('/', function(req, res){
//     res.send("<html><body><h1>Express c'est génial</h1></body></html");
// });

//  app.get('/formulaire', function(req, res){
//     res.sendFile(path.resolve("contactez-nous.html"));
//   });

// app.get('/students', function(req, res){    //on crée une route sur l'url et on dit que le serveur doit répondre à la requete du client
//     res.send("<html><body><h1>page student</h1></body></html");
// });

// app.post('/submit-name',function(req, res){
//     console.log("votre nom est" + req.body.nom + " " + req.body.prenom);
    
//     res.send("votre nom est" + req.body.nom + " " + req.body.prenom);

// })
// app.post('/contactez-nous', function(req, res){
//     res.send("bonjour" + req.body.nom + " " + req.body.prenom + "merci de nous avoir contactez.<br> Nous reviendrons vers vous" + req.body.email);

// })


/**
 *       Partie Blog
 *       // Router pour afficher mon formulaire
 */
app.get('/ajoutblog', function (req, res){    // Méthode http (app.get, app.post, app.put, app.delet.)
                                             // app.get =>Lire qq chose
    res.render('NewBlog');                  // construire la vue à partir d'un résultat ()
    })


            // Route pour enregistrer/sauvgarder un Blog
app.post("/nouveaublog", function(req, res){  
    const data = new Blog({          
        sujet: req.body.sujet,           
        auteur: req.body.auteur,     
        description: req.body.description,       
        message: req.body.message 
})

data.save()
.then(()=>{
    console.log('Blog saved succeffly !');
    res.redirect('/Allposts');
})
.catch(error =>console.log(error));

});
//---------------Affichage de tout les blogs
app.get('/allposts', function(req, res){
    Blog.find()
    .then(data =>{
        res.render('Allposts', {data:data});
        console.log("récuperation donnée réussi !");
    })
    .catch(error =>console.log(error));
});

// Edit
// Afficher une donnée sur la vue EditBlog en fonction de l'id mis en url
app.get('/blog/:id', function(req, res){
    Blog.findOne({_id:req.params.id})
    .then(data =>{
        res.render('EditBlog', {data:data});

    })
    .catch(error => console.log(error));
});

//Update
app.put('/updateblog/:id', function(req, res){
    const Data = {
        sujet:req.body.sujet,
        auteur:req.body.auteur,
        description:req.body.description,
        message:req.body.message,
    }
    Blog.updateOne({_id : req.params.id}, {$set : Data})
    .then(result=>{
        console.log("Blog modifié avec succés");
        res.redirect('/allposts');
})
    .catch(error => console.log(error));

});

//delete
app.delete('/deleteblog/:id', function(req, res){
    console.log("Delete called!!!!!!")
    Blog.findOneAndDelete({_id: req.params.id})
    .then(()=>{
        console.log("Blog supprimé avec succés");
        res.redirect('/allposts');
    })
    .catch(error=>console.log(error));
});



/* *********************************************************************************************
*                 PARTIE Car
*/////////////////////////////////////////////////////////////////////////////////////////////// 
   // Méthode http (app.get, app.post, app.put, app.delet.)
   // app.get =>Lire qq chose

app.get('/addcar', function (req, res){          //Lien pour afficher le formulaire de création
                                              
    res.render('NewCar');                       // construire la vue à partir d'un résultat ()
})

     // Route pour enregistrer/sauvgarder one car
app.post("/newcar", function(req, res){  
    const data = new Car({          
        marque: req.body.marque,           
        modele: req.body.modele,     
        couleur: req.body.couleur,       
        description: req.body.description
    })


data.save()
.then(()=>{
    console.log('Car saved succeffly !');
    res.redirect('/Allcars');
})

 .catch(error =>console.log(error));

});
// Route pour afficher la totalité des voitures
app.get('/allcars', function(req, res){
    Car.find()
    .then(data =>{
        res.render('Allcars', {data:data});
        console.log("récuperation donnée réussi !");
    })
    .catch(error =>console.log(error));
});
//Route pour afficher une voiture en fonction de son id
app.get('/car/:id', function(req, res){
    Car.findOne({_id:req.params.id})
    .then(data =>{
        res.render('EditCar', {data:data});

    })
    .catch(error => console.log(error));
});

app.put('/updatecar/:id', function(req, res){
    const Data = {
        marque:req.body.marque,
        modele:req.body.modele,
        couleur:req.body.couleur,
        description:req.body.description,
    }
    Car.updateOne({_id : req.params.id}, {$set : Data})
    .then(result=>{
        console.log("Car modifié avec succés");
        res.redirect('/Allcars');
})
    .catch(error => console.log(error));

});

app.delete('/deletecar/:id', function(req, res){
    console.log("Delete called!!!!!!")
    Car.findOneAndDelete({_id: req.params.id})
    .then(()=>{
        console.log("Blog supprimé avec succés");
        res.redirect('/allcars');
    })
    .catch(error=>console.log(error));
});

/*****************************************************************************************************
 *   Modèle User
 *////////////////////////////////////////////////////////////////////////////////////////////////////

var User = require('./models/User');

app.get('/inscription', function(req, res){
    res.render('Inscription');

});

app.post('/api/newuser', function(req, res){
    var Data = new User({
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,10),
        admin : false
    })
    Data.save()
    .then(()=>{
        console.log("User enregistré !");
        res.redirect('/login');
    })
    .catch(error=> console.log(error));
});

// Route pour l'affichage de la page login
app.get('/login', function(req, res){
    res.render('Login');

});

app.post('/api/connexion', function(req, res){
    User.findOne({
        email: req.body.email})
        .then(user =>{
            if(!user){
                return res.status(404).send('User not found : invalid email');
            }
            console.log(user);
        
            if(!bcrypt.compareSync(req.body.password, user.password)){
                return res.status(404).send('Invalid password');
            }

            if(user.admin == true){
                res.render("admin");

            }
            else{
            res.render('Profil' , {data: user});
            }
        })
        .catch(error => console.log(error));
});

app.get('/admin', function(req, res){
    User.find()
    .then(data =>{
        res.render('Admin', {data: data});
    })
});

// define routes her
var server = app.listen(5000, function(){             //on lance le serveur sur le port 5000
    console.log('server listening on port 5000');    //mettre un message dans le console quand le serveur lancé

});


