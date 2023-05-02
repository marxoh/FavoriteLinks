//encargado de utilizar el metodo de autenticacion
//se almacenara las rutas para la autenticacion
//como signin, signup, login, logout, etc...
//de primera se exporta sin nada para que no de error al require de index.js
const express = require("express");
const router = express.Router();

//se importara la biblioteca passport
const passport = require('passport')

//para renderizar el formulario
router.get("/signup", (req, res) => {
  res.render("auth/signup"); 
});

// //para recibir los datos de ese formulario y manejarlos
// router.post("/signup", (req, res) => {
//   //aqui se va a utilizar la autenticacion, y se debe llamar con el nombre que se llamó al crearla
//   //para que passport sepa lo que tiene que hacer cuando lo llamamos
//   passport.authenticate('local.singup',{
//     successRedirect: '/profile',
//     failureRedirect: '/signup', //va a volver a ver el formulario tipico
//     failureFlash: true
//   })
//   res.send("recibiterterestingst");
// });

//forma reducida del metodo comentado, sin la funcion
router.post('/signup',passport.authenticate('local.signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup', //va a volver a ver el formulario tipico
    failureFlash: true
  }))


router.get('./profile',(req,res)=>{
    res.send('perfil')
})

module.exports = router;
