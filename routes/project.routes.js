import express from "express";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import checkReqBody from "../middleware/checkProject.js";
const router = express.Router();

//CREATE A PROJECT
router.post("/", checkReqBody, async (req, res) => {
  try {
    const { title, description } = req.body;

    const createdProject = await Project.create({ title, description });
    res.status(201).json(createdProject);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET ALL PROJECTS
router.get("/", async (req, res) => {
  try {
    const allProjects = await Project.find().populate("tasks");

    res.json(allProjects);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET A SINGLE PROJECT
router.get("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const singleProject = await Project.findById(projectId).populate("tasks");

    res.json(singleProject);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//UPDATE A PROJECT
router.put("/:projectId", checkReqBody, async (req, res) => {
  try {
    const { projectId } = req.params;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedProject);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//DELETE A PROJECT
router.delete("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const deletedProject = await Project.findByIdAndDelete(projectId);

    //loops over the tasks array of deleted project
    //delete each task from the Task Collection in DB

    for (const task of deletedProject.tasks) {
      await Task.findByIdAndDelete(task);
    }

    res.json({ message: "deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
