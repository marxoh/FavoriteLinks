const express = require("express"); //para definir las rutas de la pagina
const router = express.Router(); //con el objeto router

//solo se define una ruta inicial, donde no hay request pero si un responce en el que envia un hello world
router.get("/", (req, res) => {
  // res.send("Hello World");
  res.render("index")
});

module.exports = router; //es lo que se va a exportar
