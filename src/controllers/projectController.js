import { Project } from "../models/projectModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new project
const createProject = async (req, res, next) => {
  const { name, description } = req.body;

  if ([name, description].some(field => field?.trim() === "")) {
    return res.status(400).json(
      new ApiResponse(400, null, "All fields are required", false)
    )
  }

  try {
    const project = new Project({
        name,
        description,
        user: req.user._id
 })

 //console.log('New project created:', project);
    await project.save();

    res.status(201).json(
      new ApiResponse(201, project, "Project created successfully", true)
    );
  } catch (error) {
    console.error('Error creating project:', error);
    next(new ApiError(400, error.message));
  }
};

// Get all projects for the logged-in user
const getProjects = async (req, res, next) => {

  try {
    const projects = await Project.find({ user: req.user._id })

    res.status(200).json(
      new ApiResponse(200, projects, "Projects fetched successfully", true)
    );

  } catch (error) {
    console.error('Error fetching projects:', error);
    next(new ApiError(400, error.message));
  }
};

// Get project details by project ID
const getProjectDetails = async (req, res, next) => {

  try {
    const project = await Project.findById(req.params.id).populate('tasks');

    if (!project) {
      return next(new ApiError(404, "Project not found"));
    }
    res.status(200).json(
      new ApiResponse(200, project, "Project details fetched successfully", true)
    )

  } catch (error) {
    console.error('Error fetching project details:', error);
    next(new ApiError(400, error.message))
  }
};

// Update project by project ID
const updateProject = async (req, res, next) => {
  const { name, description } = req.body

  if ([name, description].some(field => field?.trim() === "")) {
    return res.status(400).json(
      new ApiResponse(400, null, "All fields are required", false)
    );
  }

  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    )
    if (!project) {
      return next(new ApiError(404, "Project not found"))
    }
    res.status(200).json(
      new ApiResponse(200, project, "Project updated successfully", true)
    )
  } catch (error) {
    console.error('Error updating project:', error);
    next(new ApiError(400, error.message));
  }
};

// Delete project by project ID
const deleteProject = async (req, res, next) => {

  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return next(new ApiError(404, "Project not found"));
    }
    res.status(200).json(
      new ApiResponse(200, null, "Project deleted successfully", true)
    );
  } catch (error) {
    console.error('Error deleting project:', error);
    next(new ApiError(400, error.message));
  }
};

export {
        createProject,
        getProjects,
        getProjectDetails,
        updateProject,
        deleteProject
     
};
