// Conexión a MongoDB
import mongoose from "mongoose";
import config from "./config";

mongoose.set('strictQuery', false);

// Cadena de conexión

(async () => {

  try {

    const db = await mongoose.connect(config.mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Base de datos conectada en: ', db.connection.name);

  } catch (error) {
    console.error(error);
  }
  

})();
