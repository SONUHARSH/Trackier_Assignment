
import express from 'express';
import { 
        createTask, 
        getTasks, 
        getAllTasks, 
        updateTask, 
        deleteTask } from '../controllers/taskController.js';

import { verifyJWT } from '../middlewares/auth.js';

const router = express.Router();

router.route("/create").post(verifyJWT, createTask);
router.route("/alltasks").get(verifyJWT, getTasks);

router.route("/:id")
    .get(verifyJWT, getAllTasks)
    .put(verifyJWT, updateTask)
    .delete(verifyJWT, deleteTask);

export default router
