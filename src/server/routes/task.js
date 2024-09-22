import { createTask, getTasks, getTaskById, updateTaskDescription, updateTaskDueDate, updateTaskPriority, updateTaskStatus, updateTaskTitle, deleteTask, updateTask } from "../controllers/task.js";
import express from 'express';
const router = express.Router();

router.post('/create', createTask);

router.get('/', getTasks);

router.get('/:id', getTaskById);

router.put('/update/:id', updateTask);

router.put('/update/title/:id', updateTaskTitle);

router.put('/update/description/:id', updateTaskDescription);

router.put('/update/dueDate/:id', updateTaskDueDate);

router.put('/update/priority/:id', updateTaskPriority);

router.put('/update/status/:id', updateTaskStatus);

router.delete('/delete/:id', deleteTask);

export default router;