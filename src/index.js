const express = require("express"); //framework de node.js de backend
const morgan = require("morgan"); //permite crear logs o msjs http de lo que las app cte piden al srv
const exphbs = require("express-handlebars"); //motor de plantillas
const path = require("path"); //modulo de node.js que muestra las rutas, para configurar layoutsDir

// INITIALIZATIONS
//se ejecuta express, app es mi aplicacion ahora porque se hara todo con app
const app = express();

// SETTINGS
//con express asi se definen las variables
//express.set: se define port y si existe un puerto en el sistema tomalo o sino el 4000
app.set("port", process.env.PORT || 4000);
//se le agrega a express la ruta de la carpeta views por medio de un set
//el express por si solo no sabe donde se encuentra su misma ruta originalmente por eso llama a __dirname
app.set("views", path.join(__dirname, "views")); //usando path de node.js que concatena __dirname + 'views'
//solo configuracion del motor de plantillas exphbs de express
//app.engine: se define un motor en express que pide el nombre del motor y una funcion
//en este caso la funcion es exphbs que define un objeto de configuracion de las plantillas
app.engine(
  ".hbs",
  exphbs.engine({
    //es el nombre de la plantilla principal
    defaultLayout: "main", //el nombre de la plantilla principal, en views debe estar en layouts
    //para darle la ruta se necesitara el modulo de node.js "path"
    layoutsDir: path.join(app.get("views"), "layouts"), //concatena views + 'layouts', y especificar main.hbs
    partialsDir: path.join(app.get("views"), "partials"), //idem, el express por si solo no sabe dnd esta
    extname: ".hbs", //especificar la extencion de los archivos de handlebars
    //funciones adicionales para trabajar con handlevars
    helpers: require("./lib/handlebars"), //el require si sabe donde se encuentra originalmente
  })
);
//para utilizarlo se pide el nombre del motor, es como declararlo
app.set("view engine", ".hbs");

// MIDDLEWARES //funciones que se ejecutan cada vez que una app cte envia una peticion al serv
//express.use: define los modulos que se van a utilizar
app.use(morgan("dev")); //morgan muestra por consola las peticiones que van llegando
//con npm run dev que ejecutara nodemon src/ desde package.json en scripts
//express.urlencoded: para poder aceptar desde el formulario los datos que me envien los usuarios
//{extended:false}: se van a aceptar solamente datos sencillos, no extendidos como por ej. imagenes
app.use(express.urlencoded({ extended: false }));
//si se quiere quiere extender la app a una app cliente y se quiere trabajar con json en vez de con bd
app.use(express.json()); //pero no se va a utilizar aqui por ahora

// GLOBAL VARIABLES //que variables van a ser accedidas desde la app
//toma la info ingresada, la respuesta del servidor y toma una accion para continuar con el resto del codigo
//se va a ir rellenando a medida que se necesite acceder a variables desde cualquier parte
app.use((req, res, next) => {
  next();
});

// ROUTES //url que tendra el servidor, se utilizan todas las rutas definidas en routes
//express.use() que utilice todo lo que proviene de "routes/index.js"
app.use(require("./routes"));
//rutas para poder autenticar al usuario
app.use(require("./routes/authentication"));
//ruta para almacenar los enlaces que debe almacenar la pagina
//a todas las rutas que se vayan creando les va a preceder un prefijo llamado links
//para mayor facilidad de trabajar solo con las rutas links con ese prefijo
app.use("/links", require("./routes/links"));

// PUBLIC //carpeta publica, que el navegador pueda acceder como css, js, http, imagenes, fuentes, etc.
//se especifica que sera estatica la ruta de public
app.use(express.static(path.join(__dirname, "public")));

// STARTING THE SERVER
//express.listen: se mantiene escuchando un puerto
//express.get: rescata un valor que se habia declarado previamente u otro existente desde el principio
app.listen(app.get("port"), () => {
  console.log("El servidor se encuentra en el puerto: ", app.get("port"));
});
