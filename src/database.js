//conexiones a la bd
//el modulo mysql no soporta las promesas ni async/await
const mysql = require('mysql')
const {database} = require('./keys') //traigo la configuracion de la bd
//vamos a tener que usar util modulo de js
//que convierte codigo de callback a codigo de promesas, para poder soportarlas
const {promisify} = require('util')

//para utilizar la conexion se unsa un pool de mysql
//mysql.createPool: mucho mas cercano a un entorno de produccion
//crea hilos y c/u se va ejecutando a la vez
// al darle la configuracion devuelve una conexion a la bd que llamaremos pool
const pool = mysql.createPool(database)

//se manejan los errores vasicos antes de retornar la conexion
//getConnection devuelve un error o una conexion
pool.getConnection((err,connection)=> {
    // si devuelve un error
    if (err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('La conexion con la base de datos fue cerrada.')
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('La base de datos tiene demasiadas conexiones.')
        }
        if(err.code === 'ECONNREFUSED'){
            //como por malas credenciales
            console.error('La conexion con la base de datos fue rechazada.')
        }
    }
    if(connection) connection.release() //se lanza la conexion
    console.log('La base de datos esta conectada.')
    return
})

pool.query = promisify(pool.query)//se convierte pool.query a pool.query con promesas y async/awayt

module.exports = pool //se exporta la conexion