import express from "express";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";

const router = express.Router();

//create a task
router.post("/", async (req, res) => {
  try {
    const { title, status, projectId } = req.body;

    const createdTask = await Task.create({
      title,
      status,
      project: projectId,
    });

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        $push: { tasks: createdTask._id },
      },
      { new: true, runValidators: true }
    );

    res.status(201).json(createdTask);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//delete the task

router.delete("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    const updatedProject = await Project.findByIdAndUpdate(
      deletedTask.project,
      { $pull: { tasks: taskId } },
      { new: true }
    );

    res.json({ message: "Task deleted succesfully and removed from project" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({ message: "task status updated", updatedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
export default router;
