//metodos de autenticacion
//passport: para implementar estos metodos
//permite autenticar con local y redes sociales
const passport = require("passport");
//se llama a la estrategia
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
//trae helpers para cifrar
const helpers = require("../lib/helpers");

//se nombra y crea la autenticacion localSignup
passport.use("localSignup",new LocalStrategy(
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
    newUser.id = result.insertId
    //console.log(newUser.id)
    //done no se quiere reportar ningun error, ver mas despues
    //se retorna newUser para que se almacene en una sesion
    return done(null, newUser)
}));

//se guarda el id del usuario
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

//done es para continuar despues con el resto del codigo
//se toma ese id para volver a obtener los datos
passport.deserializeUser(async(id,done)=>{
    const row = await pool.query('SELECT * FROM users WHERE id = ?',[id])
    done(null,row[0])
})
