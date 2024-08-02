
import { Router } from "express";
import {
        createProject,
        getProjects,
        getProjectDetails,
        updateProject,
        deleteProject } from "../controllers/projectController.js";

import { verifyJWT } from "../middlewares/auth.js";

const router = Router();

router.route("/create").post(verifyJWT, createProject);
router.route("/allproject").get(verifyJWT, getProjects);

router.route("/:id")
    .get(verifyJWT, getProjectDetails)
    .put(verifyJWT, updateProject)
    .delete(verifyJWT, deleteProject);

export default router;

