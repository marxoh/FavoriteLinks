const passport = require("passport");
//se escoge la estrategia local de autenticacion, no por google ni facebook u otro
const LocalStrategy = require("passport-local").Strategy;
//traer la conexion para guardar el newUser
const pool = require("../database");
const helpers = require('../lib/helpers')

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    }, //callback: lo que se ejecuta despues definir los parametros del strategy
    async (req, username, password, done) => {
      //console.log(req.body)
      const { fullname } = req.body;
      const newUser = {
        //username : username //esto en javascript se puede resumir solo con username y nada mas como sigue:
        username,
        password,
        fullname,
      };
      newUser.password = await helpers.encryptPassword(password)
      const result = await pool.query("INSERT INTO users SET ?", [newUser]);
      console.log(result)
    }
  )
);

// passport.serializeUser((usr,done)=>{

// })
