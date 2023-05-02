//se llama helpers porque puede contener varios tipos de funciones que se necesiten
//va a serializar la contraseña del nuevo usuario antes de guardarla

const bcrypt = require('bcryptjs')

// const helpers = require("./handlebars")?????????????????????????????????? se puso solo?????????????

//se declara este objeto que puede tener multiples metodos
//que se pueden utilizar denuevo en la app
const helper = {}

//se crea un metodo del objeto helpers llamado como encryptPassword
helper.encryptPassword = async (password) => {
    //se guarda el hash generado y encriptado 10 veces, lleva tiempo y 10 es lo mas normal
    //es una cadena de caracteres que no es ninguna contraseña aun
    //es para generar el cifrado
    const salt = await bcrypt.genSalt(10)
    //tomamos ese patron para poder generar nuestro cifrado
    const hash = await bcrypt.hash(password, salt)
    return hash
}

helper.compaPassword = async (password, savedPassword) => {
    try {
        await bcrypt.compare(password, savedPassword) 
    } catch(e) {
        console.log(e)
    }
}

module.exports = helper
