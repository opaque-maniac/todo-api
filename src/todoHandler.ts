import prisma from "./utils/db";

/**
 * Handler for managing lists
 * @param req
 * @param res
 * @param next
 */

// Get all lists
export const getAllLists = async (req, res, next) => {
  try {
    const pageNumber = req.query.pageNumber || 1;
    const itemsPerPage = req.query.itemsPerPage || 10;

    const lists = await prisma.list.findMany({
      where: {
        userId: req.user.id,
      },
      skip: (pageNumber - 1) * itemsPerPage,
      take: itemsPerPage,
    });
    return res.status(200).json({
      success: true,
      data: lists,
    });
  } catch (e) {
    return next(e);
  }
};

// Create a new list
export const createList = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const list = await prisma.list.create({
      data: {
        name,
        description: description ?? null,
        userId: req.user.id,
      },
    });
    return res.status(201).json({
      success: true,
      data: list,
    });
  } catch (e) {
    return next(e);
  }
};

// Update a list by id
export const updateList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const list = await prisma.list.update({
      where: {
        userId: req.user.id,
        id: id,
      },
      data: {
        name,
        description: description ?? null,
        dateModified: new Date(),
      },
    });
    return res.status(201).json({
      success: true,
      data: list,
    });
  } catch (e) {
    return next(e);
  }
};

// Delete a list by id
export const deleteList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const list = await prisma.list.delete({
      where: {
        userId: req.user.id,
        id: id,
      },
    });
    return res.status(200).json({
      success: true,
      data: list,
    });
  } catch (e) {
    return next(e);
  }
};

/**
 * Handler for managing tasks
 * @param req
 * @param res
 * @param next
 */

// Get all tasks for a specific list
export const getAllTasks = async (req, res, next) => {
  try {
    const list = await prisma.list.findFirst({
      where: {
        userId: req.user.id,
      },
      include: {
        tasks: true,
      },
    });
    return res.status(200).json({
      success: true,
      data: list.tasks,
    });
  } catch (e) {
    return next(e);
  }
};

// Create a new task for a specific list
export const createTask = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const { name, description, dueDate, isComplete } = req.body;

    const list = await prisma.list.findFirstOrThrow({
      where: {
        userId: req.user.id,
        id: listId,
      },
    });

    const task = await prisma.task.create({
      data: {
        name,
        description: description ?? null,
        dueDate: dueDate ? new Date(dueDate) : null,
        isComplete: isComplete ?? false,
        listId: list.id,
      },
    });
    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (e) {
    return next(e);
  }
};

// Update a task by id
export const updateTask = async (req, res, next) => {
  try {
    const { listId, taskId } = req.params;
    const { name, description, dueDate, isComplete } = req.body;

    const list = await prisma.list.findFirstOrThrow({
      where: {
        userId: req.user.id,
        id: listId,
      },
    });

    const task = await prisma.task.update({
      where: {
        listId: list.id,
        id: taskId,
      },
      data: {
        name,
        description: description ?? null,
        dueDate: dueDate ? new Date(dueDate) : null,
        isComplete: isComplete ?? false,
        dateModified: new Date(),
      },
    });
    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (e) {
    return next(e);
  }
};

// Delete a task by id
export const deleteTask = async (req, res, next) => {
  try {
    const { listId, taskId } = req.params;

    const list = await prisma.list.findFirstOrThrow({
      where: {
        userId: req.user.id,
        id: listId,
      },
    });
    const task = await prisma.task.delete({
      where: {
        listId: list.id,
        id: taskId,
      },
    });
    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (e) {
    return next(e);
  }
};

/**
 * Handler for managing tasks
 * @param req
 * @param res
 * @param next
 */

// Get all subtasks for a specific task
export const getAllSubtasks = async (req, res, next) => {
  try {
    const { listId, taskId } = req.params;
    const list = await prisma.list.findFirstOrThrow({
      where: {
        userId: req.user.id,
        id: listId,
      },
      include: {
        tasks: {
          where: {
            id: taskId,
          },
          include: {
            subtasks: true,
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      data: list.tasks[0].subtasks,
    });
  } catch (e) {
    return next(e);
  }
};

export const createSubtask = async (req, res, next) => {
  try {
    const { listId, taskId } = req.params;
    const { name, description, dueDate } = req.body;

    const list = await prisma.list.findFirstOrThrow({
      where: {
        userId: req.user.id,
        id: listId,
      },
      include: {
        tasks: {
          where: {
            id: taskId,
          },
        },
      },
    });

    const subtask = await prisma.subtask.create({
      data: {
        name,
        description: description ?? null,
        dueDate: dueDate ? new Date(dueDate) : null,
        taskId: list.tasks[0].id,
      },
    });
    return res.status(201).json({
      success: true,
      data: subtask,
    });
  } catch (e) {
    return next(e);
  }
};

export const updateSubtask = async (req, res, next) => {
  try {
    const { listId, taskId, subtaskId } = req.params;
    const { name, description, dueDate } = req.body;

    const list = await prisma.list.findFirstOrThrow({
      where: {
        userId: req.user.id,
        id: listId,
      },
      include: {
        tasks: {
          where: {
            id: taskId,
          },
        },
      },
    });

    const subtask = await prisma.subtask.update({
      where: {
        taskId: list.tasks[0].id,
        id: subtaskId,
      },
      data: {
        name,
        description: description ?? null,
        dueDate: dueDate ? new Date(dueDate) : null,
        dateModified: new Date(),
      },
    });
  } catch (e) {
    return next(e);
  }
};

export const deleteSubtask = async (req, res, next) => {
  try {
    const { listId, taskId, subtaskId } = req.params;
    const list = await prisma.list.findFirstOrThrow({
      where: {
        userId: req.user.id,
        id: listId,
      },
      include: {
        tasks: {
          where: {
            id: taskId,
          },
        },
      },
    });
    const subtask = await prisma.subtask.delete({
      where: {
        taskId: list.tasks[0].id,
        id: subtaskId,
      },
    });
    return res.status(200).json({
      success: true,
      data: subtask,
    });
  } catch (e) {
    return next(e);
  }
};
