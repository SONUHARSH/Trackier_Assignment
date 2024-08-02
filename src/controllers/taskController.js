
import { Task } from "../models/taskModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new task
const createTask = async (req, res, next) => {
    const { name, description, status, tags, dueDate, assignedUser, project } = req.body;

    if ([name, description, project].some(field => field?.trim() === "")) {
        return res.status(400).json(
            new ApiResponse(400, null, "All fileds are required", false)
        )
    }

    try {
        const task = new Task(
                { 
                        name, 
                        description, 
                        status, 
                        tags, 
                        dueDate, 
                        assignedUser, 
                        project 
                }
        );

        //console.log("New task created", task)

        await task.save();

        res.status(201).json(
            new ApiResponse(201, task, "Task created successfully", true)
        )
    }  catch (error) {

        throw new ApiError(500, null, "Some Error in tasks created ");
    
  }
};

// Get all tasks for a project

const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId });

        res.status(200).json(
            new ApiResponse(200, tasks, "Tasks fetched successfully", true)
        )
    }  catch (error) {

        throw new ApiError(500, null, " Tasks not fetched ");
    
  }
};

// Get all tasks assigned to the logged-in user
const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ assignedUser: req.user._id });

        res.status(200).json(
            new ApiResponse(200, tasks, "All tasks fetched successfully", true)
        );
    } catch (error) {

        throw new ApiError(500, null, "Error in getAllTasks fetched at time ");
    
  }
};

// Update task by task ID
const updateTask = async (req, res, next) => {
    const { name, description, status, tags, dueDate, assignedUser } = req.body;

    if ([name, description].some(field => field?.trim() === "")) {
        return res.status(400).json(
            new ApiResponse(400, null, "Name and description are required fields", false)
        );
    }

    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { name, description, status, tags, dueDate, assignedUser },
            { new: true }
        );

        if (!task) {
            return next(new ApiError(404, "Task not found"));
        }

        res.status(200).json(
            new ApiResponse(200, task, "Task updated successfully", true)
        );
    }  catch (error) {

        throw new ApiError(500, null, " Not updated some probleam ");
    
  }
};

// Delete task by task ID
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return next(new ApiError(404, "Task not found"));
        }

        res.status(200).json(
            new ApiResponse(200, null, "Task deleted successfully", true)
        );
    }  catch (error) {

        throw new ApiError(500, null, " Not delete task some probleam ");
    
  }
};

export {
    createTask,
    getTasks,
    getAllTasks,
    updateTask,
    deleteTask
};
