//metodos de autenticacion
//passport: para implementar estos metodos
//permite autenticar con local y redes sociales
const passport = require("passport");
//se llama a la estrategia
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
//trae helpers para cifrar
const helpers = require("../lib/helpers");

passport.use("LocalSignin",new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
},async(req,username,password,done) => {
    console.log(req.body)
    // console.log(username)
    // console.log(password)
    const rows = await pool.query('SELECT * from users WHERE username = ?',[username])
    if(rows.length>0){
        const user = rows[0]
        const validPassword = await helpers.matchPassword(password,user.password)
        if (validPassword){
            done(null,user,req.flash('wena','Welcome ' + user.username))
        } else {
            done(null,false,req.flash('message','incorrect password'))
        }
    } else {
        return done(null, false, req.flash('message','el nombre no existe'))
    }
}));

//se nombra y crea la autenticacion localSignup
passport.use(
  "localSignup",
  new LocalStrategy(
    {
      //lo que voy a recibir desde el post de autentication.js por medio del req.body
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      //console.log("asd: ", req.body); //objeto con los datos
      const { fullname } = req.body; //estupido?
      const newUser = { username, password, fullname };
      //console.log("newUser: ",newUser)
      //cifrado
      newUser.password = await helpers.encriptPassword(password);
      //console.log(newUser.password)
      //guardado en la bd
      const result = await pool.query("INSERT INTO users SET ?", [newUser]);
      //console.log('result: ', result)
      //se puede extraer el id del resultado de la consulta anterior
      //asi se puede tambien definir un elemento inexistente solo llamandolo jaja
      //newUser.id = 10
      newUser.id = result.insertId;
      //console.log(newUser.id)
      //done no se quiere reportar ningun error, ver mas despues
      //se retorna newUser para que se almacene en una sesion
      return done(null, newUser);
    }
  )
);

//se guarda el id del usuario almacenado en memoria de la sesion de la app
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//done es para continuar despues con el resto del codigo
//se toma ese id para volver a obtener los datos
passport.deserializeUser(async (id, done) => {
  const row = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  done(null, row[0]);
});
