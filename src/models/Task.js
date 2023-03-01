// Estructura de las consultas a MongoDB
import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"; // Paginacion Automatica 

// Schema campos a guardar
// model son las tablas a guardar

// Estructura de los datos
const taskSchema = new Schema ({
  title :{
    type: String,
    trim: true, // Quita los espacios iniciales y finales
    require: true,
  },
  description: {
    type: String,
    trim: true,
  }
  ,
  done: {
    type: Boolean,
    default:false
  }
},{
  timestamps: true, // El update_at y created_at de mongoose para MongoDB
  versionKey: false
});

// Paginación Automatica
taskSchema.plugin(mongoosePaginate);

// Query
export default model('Task', taskSchema); // model devuelve un objeto con el get post put y delete ya asignados, permite interactuar desde codigo