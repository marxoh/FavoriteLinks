const passport = require("passport");
//se escoge la estrategia local de autenticacion, no por google ni facebook u otro
const LocalStrategy = require("passport-local").Strategy;
//traer la conexion para guardar el newUser
const pool = require("../database");
const helpers = require('../lib/helpers')

passport.use("local.signup", new LocalStrategy({
  //que los rescata de la vista signup.hbs
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true,
}, //callback: lo que se ejecuta despues definir los parametros del strategy
async (req, username, password, done) => {
  console.log("req.body desde el local.signup: " + req.body)
  //el req tiene todas las variables que vienen del 
  // const { fullname } = req.body;
  // const newUser = {
  //   //username : username //esto en javascript se puede resumir solo con username y nada mas como sigue:
  //   username,
  //   password,
  //   fullname,
  // };
  // console.log('paso por local.signup')
  // newUser.password = await helpers.encryptPassword(password)
  // const result = await pool.query("INSERT INTO users SET ?", [newUser]);
  // // console.log(result)
  // //este result tambien trae varias propiedades, entre esas el insertId (hay que ver que trae siempre)
  // newUser.id = result.insertId
  // //done retorna null: porque no hay ningun error
  // //done retorna el user solo para guardarlo en la sesion + el id agregado 
  // return done(null, newUser)
}));

//para guardarlo en sesion se necesitan estos metodos
passport.serializeUser((user,done)=>{
    done(null, user.id)
})

passport.deserializeUser(async(id, done)=>{
//se busca en la bd si el usuario existe para eliminarlo de la sesion
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id])
  done(null,rows[0])
})
