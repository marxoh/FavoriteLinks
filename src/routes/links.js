//se almacenaran las rutas que va a guardar la pagina
//como eliminar, agregar, leer, actualizar: CRUD de enlaces
//de primera se exporta sin nada para que no de error al require de index.js
const express = require("express");
//se declara una instancia de un objeto Router()
const router = express.Router();

//se llama a la conexion a la bd y se llamara pool
const pool = require("../database");

//express.router.get: para cuando el navegador trate de pedir una peticion get al servidor a la ruta /add
//se va a responder de la siguiente mnaera
router.get("/add", (req, res) => {
  //con req y res se encargan de manejar esta peticion
  //res.send("Form");
  res.render("links/add");
});

//submit del formulario
//tienen el mismo nombre "/add" pero se van a diferenciar por el metodo http post get
router.post("/add", async (req, res) => {
  //console.log(req.body)//muestra como recibimos los datos del formulario
  //para tenerlo mas ordenado
  //destructurando req.body
  const { title, url, description } = req.body;
  //para vincularlo luego al usuario que lo guardo???
  //cualquier objeto creado se puede ver en los hbs como si fura en el mismo contexto???
  const newLink = {
    title,
    url,
    description,
  };
  console.log(newLink);
  //el insert puede pasar un objeto o lista
  await pool.query("INSERT INTO LINKS SET ?", [newLink]);
  //se llamara a flash para mostrar una notificacion al usuario
  //al usar flash desde un middleware esta disponible desde el req
  //wena: nombre de la notificacion
  req.flash('wena', "Wena!!! Guardado correctamente.")
  // res.send("Recibido"); //solo muestra la palabra recibido
  res.redirect("/links");
});

router.get("/", async (req, res) => {
  const links = await pool.query("select * from links");
  //console.log(links);
  // res.send('listas iran aki')
  //se enviara la respuesta renderizando links/list por medio de {links}
  res.render("links/list", { links });
});

router.get("/delete/:id", async (req, res) => {
  //muestra el parametro enviado por la ruta para eliminar
  //req.params.id: este id parece que lo tiene ya manejado desde antes en todas las paginas
  //console.log(req.params.id)
  //desde req.params solo detrusctura el {id}, para manejarlo mejor solamente
  const { id } = req.params;
  await pool.query("DELETE FROM links WHERE ID = ?", [id]);
  //mensajes connect-flash en delete
  req.flash('wena', "Wena!!! Eliminado correctamente.")
  //redireccionara al mismo links porque obliga a consultar nuevamente a la bd
  //y el link borrado ya no deberia estar
  res.redirect("/links");
  //res.send('Eliminado')
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  // const {}
  const links = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
  res.render("links/edit", { link: links[0] });
});

router.post("/edit/:id",async (req,res)=>{
  const {id} = req.params
  const {title,url,description} = req.body
  const newLink = {
    title,
    url,
    description
  }
  await pool.query('UPDATE links SET ? WHERE ID = ?',[newLink,id])
  req.flash('wena', "Wena!!! Cambiado correctamente.")
  res.redirect('/links')
})

module.exports = router;
