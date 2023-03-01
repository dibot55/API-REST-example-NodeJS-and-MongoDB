// Rutas de las URLs
import { Router } from "express";
import * as taskController from "../controllers/task.controller"; // Controllers


const router = Router();

// Esta es la ruta definida -> /api/tasks/(rutas)

// READ
router.get('/', taskController.findalltask);

// CREATE
router.post('/', taskController.savetasks);

// ALL TRUE

router.get('/done', taskController.findTaskDone);

// ALL TRUE tiene que estar arriba de las peticiones que pidan parametros :id o el interprete se confunde

// READ by ID - Bucar task unicamente por id
router.get('/:id', taskController.findTaskById);

// Update
router.put('/:id', taskController.updateTask);

// Delete
router.delete('/:id', taskController.deleteTask);


export default router;