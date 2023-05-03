//estaran las rutas solo de logueo
const express = require("express");
const router = express.Router();
const passport = require("passport");

//la funcion para el formulario signup.hbs
//get es para renderizar el formulario de signup.hbs
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

//por que asi no funciona?
// //post es para recibir los datos de signup.hbs
// router.post("/signup", (req, res) => {
//   //console.log('authentication post req.body: ',req.body)
//   //se llama a la autenticacion localSignup
//   //passport necesita saber que hacer si todo falla x1obj
//    passport.authenticate('localSignup',{
//      successRedirect: '/profile',
//      failureRedirect: '/signup',
//      failureFlash: true
//    })
//   //res.send("recibido");
// });

router.post("/signup", passport.authenticate("localSignup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

router.get("/signin", (req, res) => {
  res.render("auth/signin");
});

//se podria hacer como router.post("/signup", passport.authenticate("localSignup", {
//justamente de la manera que falla
//solo que se va a querer validar despues asique se hara asi por ahora
router.post("/signin", (req,res, next) => {
  passport.authenticate('LocalSignin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req,res,next)
})

router.get("/profile", (req, res) => {
  res.send("your profile");
});

module.exports = router;
