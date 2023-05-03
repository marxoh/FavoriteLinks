//muchos metodos
const bcrypt = require('bcryptjs')

const helpers = {}

//metodo creado para cifrados al hacer signup
helpers.encriptPassword = async(password) => {
    //para generar un hash de 10 veces
    const salt = await bcrypt.genSalt(10)
    //contraseña cifrada
    const hash = await bcrypt.hash(password,salt)
    return hash
}

//metodo creado para loguearse
helpers.matchPassword = async (password, savePassword) => {
    try{
        return await bcrypt.compare(password,savePassword)
    } catch(e) {
        console.error(e)
    }
}

//queda asincrono algunas funciones
//por lo tanto cuando se llama se debe llamar asincronamente
module.exports = helpers