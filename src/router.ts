import { Router } from "express";
import {
  createList,
  createSubtask,
  createTask,
  deleteList,
  deleteSubtask,
  deleteTask,
  getAllLists,
  getAllSubtasks,
  getAllTasks,
  updateList,
  updateSubtask,
  updateTask,
} from "./todoHandler";
import { body } from "express-validator";
import { handleInputErrors } from "./utils/handleInputErrors";

const router = Router();

/**
 * Routes for managing lists
 */
router.get("/lists", getAllLists);
router.post(
  "/lists",
  body("name").isString().isLength({ min: 1, max: 255 }),
  body("description").optional().isString().isLength({ min: 1, max: 255 }),
  handleInputErrors,
  createList,
);
router.put(
  "/lists/:id",
  body("name").isString().isLength({ min: 1, max: 255 }),
  body("description").optional().isString().isLength({ min: 1, max: 255 }),
  handleInputErrors,
  updateList,
);
router.delete("/lists/:id", deleteList);

/**
 * Routes for managing tasks
 */
router.get("/lists/:listId/tasks", getAllTasks);
router.post(
  "/lists/:listId/tasks",
  body("name").isString().isLength({ min: 1, max: 255 }),
  body("description").optional().isString().isLength({ min: 1, max: 255 }),
  body("dueDate").isDate().optional(),
  handleInputErrors,
  createTask,
);
router.put(
  "/lists/:listId/tasks/:taskId",
  body("name").isString().isLength({ min: 1, max: 255 }),
  body("description").optional().isString().isLength({ min: 1, max: 255 }),
  body("dueDate").isDate().optional(),
  handleInputErrors,
  updateTask,
);
router.delete("/lists/:listId/tasks/:taskId", deleteTask);

/**
 * Routes for managing subtasks
 */
router.get("/lists/:listId/tasks/:taskId/subtasks", getAllSubtasks);
router.post(
  "/lists/:listId/tasks/:taskId/subtasks",
  body("name").isString().isLength({ min: 1, max: 255 }),
  body("description").optional().isString().isLength({ min: 1, max: 255 }),
  body("dueDate").isDate().optional(),
  handleInputErrors,
  createSubtask,
);
router.put(
  "/lists/:listId/tasks/:taskId/subtasks",
  body("name").isString().isLength({ min: 1, max: 255 }),
  body("description").optional().isString().isLength({ min: 1, max: 255 }),
  body("dueDate").isDate().optional(),
  handleInputErrors,
  updateSubtask,
);
router.delete(
  "/lists/:listId/tasks/:taskId/subtasks",
  body("name").isString().isLength({ min: 1, max: 255 }),
  body("description").optional().isString().isLength({ min: 1, max: 255 }),
  body("dueDate").isDate().optional(),
  handleInputErrors,
  deleteSubtask,
);

export default router;
