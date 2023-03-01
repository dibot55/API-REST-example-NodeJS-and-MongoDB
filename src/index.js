// Arranca la aplicación
import "./config"; // Variables de entorno
import app from "./app"; // Express
import "./database"; // MongoDB

// Servidor
app.listen(app.get('port'), () => console.log('Servidor escuchando en el puerto:', app.get('port') ));