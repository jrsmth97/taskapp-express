const httpStatus = require('http-status');
const { Task } = require('../models');
const ApiError = require('../utils/api-error');

const createTask = async (task) => {
  return Task.create(task);
};

const getTasks = async () => {
  const tasks = await Task.find({});
  return tasks;
};

const getTaskById = async (id) => {
  const task = await Task.findById(id);
  return task;
};

const updateTaskById = async (req, taskId, updateBody) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found', req);
  }

  Object.assign(task, updateBody);
  await task.save();
  return task;
};

const deleteTaskById = async (req, taskId) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found', req);
  }

  await task.remove();
  return task;
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};