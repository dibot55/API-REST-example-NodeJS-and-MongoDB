import modeltask from "../models/Task"; // Modelo de datos
import { getPaginate } from "../libs/getPagination"; // las Options de .paginate

// Read
export const findalltask = async (req, res) => {
  // try {
  //   // Ver toda la lista de datos guardadas en la base de datos
  //   const taskfind = await modeltask.find();
  //   res.json(taskfind);
  // } catch (error) {
  //   res.status(500).json({
  //     message: error.message || 'Algo salio mal recibiendo las tareas'
  //   });
  // } 

  try {
    // con el req.query obtengo las clave-valor de la query por URL
    const { page, size, title} = req.query;

    // Pasando los parametros
    const { offset, limit } = getPaginate(page, size); 

    // Relacionar el title de la consulta con el title de la base de datos
    const conditionTitle =  title ? { 
      // $regex = crea una expresión regular utilizando el constructor RegExp /titulo/
      // $options : "i" = busca una coincidencia con el texto del título de forma insensible a mayúsculas y minúsculas
      title: {$regex: new RegExp(title), $options: "i" } 
    } : {};
    console.log(conditionTitle);
    
    // Ver toda la lista de datos guardadas en la base de datos usando mongoose-paginate-v2
    const taskfind = await modeltask.paginate(conditionTitle, { offset, limit });

    // si quieres ver todos las propiedades de taskfind entonces quita el objeto y ponle taskfind
    res.json({
      totalItems: taskfind.totalDocs,
      task: taskfind.docs,
      totalPages: taskfind.totalPages,
      currentPage: taskfind.page -1 
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Algo salio mal recibiendo las tareas'
    });
  }
};

// Create
export const savetasks = async (req, res) => {

  // Valida que el titulo existe antes de hacer la peticion
  if(!req.body.title){
    res.status(404).json({
      message: 'El contenido de la solicitud no puede estar vacio'
    });
  }

  // Aqui se configuró el modelo para que las peticiones POST realizadas por el cliente REST sean guardadas
  try {
  // Puedes usar directamente req.body en lugar del objeto. Lo mostre para que se vea que es lo que se esta subiendo
  const tasksv = new modeltask({
    title: req.body.title,
    description: req.body.description,
    done: req.body.done ? req.body.done : false
  });

  // Guardar
  const tasksaved = await tasksv.save();

  res.json(tasksaved);

  } catch (error) {
    res.status(500).json({
      message: error.message || 'Algo salio mal creando la tarea'
    });
  }
};

// READ by ID

export const findTaskById = async (req, res) => {
  
  try {
    const taskid = await modeltask.findById(req.params.id);

    // Validación
    if(!taskid){
      res.status(404).json({
        message: `El contenido solicidado no existe: ${req.params.id}`
      });
    }

    res.json(taskid);

  } catch (error) {
    res.status(500).json({
      message: error.message || `Error devoliendo el contenido : ${req.params.id}`
    });
  }
};

// UPDATE

export const updateTask = async (req, res) => {

  try {
    await modeltask.findByIdAndUpdate(req.params.id, req.body);

    res.json({ 
    
      message: `La terea fue actualizada exitosamente` 
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || `Error actualizando el contenido : ${req.params.id}`
    });
  }
  
};

// DELETE

export const deleteTask = async (req, res) => {
  
  try {
    await modeltask.findByIdAndDelete(req.params.id);

    res.json({
    message: "La tarea fue eliminada exitosamente",
  });
  } catch (error) {
    res.status(500).json({
      message: error.message || `Error borrando el contenido : ${req.params.id}`
    });
  }
};

// ALL TRUE

export const findTaskDone = async (req, res) => {
  // Busca todos los elementos que tengan done: true
  const taskfind = await modeltask.find({done : true});
  // Validación
  if(!taskfind){
    res.status(404).json({
      message : 'No hay tareas disponibles aún con las propiedades solicitadas'
    });
  }
  res.json(taskfind);
};
