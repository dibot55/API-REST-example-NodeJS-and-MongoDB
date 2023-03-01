// Configuracion de express
import express from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/index.routes";


const app = express();

// Puerto del servidor
app.set("port", process.env.PORT || 3000);


// ------------------------------------- Middlewares -----------------

// Se usa morgan para visualizar las peticiones por terminal
app.use(morgan('dev'));

// Para que express entienda metodos JSON de lo contrario da "undefined"
app.use(express.json());

// Para que reciba datos de un formulario HTML sin problema
app.use(express.urlencoded({extended: false}));

// CORS restriccion de peticiones http a otro servidor
app.use(cors({
  origin: '*'
}));

// ------------------------------------------------------------------

// Raiz
app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos a mi aplicación" });
});

// Se concatena /api con las rutas /api/routes
app.use("/api/tasks", indexRoutes);

export default app;
