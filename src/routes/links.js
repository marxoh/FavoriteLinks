//se almacenaran las rutas que va a guardar la pagina
//como eliminar, agregar, leer, actualizar: CRUD de enlaces
//de primera se exporta sin nada para que no de error al require de index.js
const express = require("express");
const router = express.Router();

//se llama a la conexion a la bd y se llamara pool
const pool = require("../database");

//express.router.get: para cuando el navegador trate de pedir una peticion get al servidor a la ruta /add
//se va a responder de la siguiente mnaera
router.get("/add", (req, res) => { //con req y res se encargan de manejar esta peticion
  //res.send("Form");
  res.render("links/add");
});

//submit del formulario
//tienen el mismo nombre "/add" pero se van a diferenciar por el metodo http post get
router.post('/add',(req,res)=>{
    // res.send('Recibido')//solo muestra la palabra recibido originalmete
    //console.log(req.body)//muestra como recibimos los datos del formulario
    //para tenerlo mas ordenado
    const {title,url,description} = req.body
    //para vincularlo luego al usuario que lo guardo?
    const newLink = {
        title,
        url,
        description
    }
})

module.exports = router;