//estaran las rutas solo de logueo
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

//la funcion para el formulario signup.hbs
//get es para renderizar el formulario de signup.hbs
//isNotLoggedIn: evita que muestre signup cuando ya esta logueado
//pero podria simplemente no mostrar ese enlace simplemente
//seria mas elegante que tener que mostrarla y estarla reenviando
//pero si alguien se sabe la ruta y la escribe no podra burlar el sistema
//asique es mejor poner esta restriccion y ademas no mostrarla en ese caso
router.get("/signup",isNotLoggedIn, (req, res) => {
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

router.post(
  "/signup", isNotLoggedIn,
  passport.authenticate("localSignup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

router.get("/signin",isNotLoggedIn, (req, res) => {
  res.render("auth/signin");
});

//se podria hacer como router.post("/signup", passport.authenticate("localSignup", {
//justamente de la manera que falla
//solo que se va a querer validar despues asique se hara asi por ahora
router.post("/signin",isNotLoggedIn, (req, res, next) => {
  passport.authenticate("LocalSignin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true,
  })(req, res, next);
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});

router.get("/logout",isLoggedIn, (req, res) => {
  //req.logout()
  //res.redirect('/signin')

  req.session.destroy((err) => {
    if (err) {
      res.send("error: ", err);
    } else {
      res.redirect("/signin");
    }
  });
});

module.exports = router;
