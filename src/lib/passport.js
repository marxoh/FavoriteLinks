//metodos de autenticacion
//passport: para implementar estos metodos
//permite autenticar con local y redes sociales
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; //se llama a la estrategia
// const pool = require('../database')
//trae helpers para cifrar
// const helpers = require('../lib/helpers')

//se nombra y crea la autenticacion localSignup
passport.use("localSignup", new LocalStrategy({
    //lo que voy a recibir desde el post de autentication.js por medio del req.body
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
},async (req, username, password, done) => {
    console.log(req.body);//objeto con los datos
//   const {fullname} = req.body //estupido
//   const newUser = {
//     username,
//     password,
//     fullname
//   }
// console.log(newUser)
//cifrado
//   newUser.password = await helpers.encriptPassword(password)
//guardado en la bd
//   const result = await pool.query('INSERT INTO users SET ?', [newUser])
//   console.log('result: ' + result)
}));

// passport.serializeUser((user,done)=>{

// })