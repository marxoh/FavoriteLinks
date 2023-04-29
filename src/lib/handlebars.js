//algunas funciones que se van a necesitar tambien para trabajar con handlebars
//por ejemplo si se necesita procesar alguna fecha no se puede hacer por hanblebars sino aparte
//timeago.js: para mostrar la fecha mas legible
const {format} = require('timeago.js')

//en los helpers se pueden definir objetos que seran visibles desde cualquier archivo.hbs 
const helpers = {}

//helpers.timeago: un atributo de funcion publica hbs
helpers.timeago = (timestamp) => {
    return format(timestamp)
}

module.exports = helpers