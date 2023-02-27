const httpStatus = require("http-status");
const { taskService } = require("../services");
const ResponseBuilder = require("../utils/response-builder");

const createTask = async (req, res) => {
  const task = await taskService.createTask(req.body);
  return res
    .status(httpStatus.CREATED)
    .send(
      ResponseBuilder.SuccessResponse(
        "Success get tasks",
        httpStatus.CREATED,
        task
      )
    );
};

const getTasks = async (req, res) => {
  const tasks = await taskService.getTasks();
  return res.send(
    ResponseBuilder.SuccessResponse("Success get tasks", httpStatus.OK, tasks)
  );
};

const getTask = async (req, res) => {
  const task = await taskService.getTaskById(req.params.taskId);
  if (!task) {
    return res.send(
      ResponseBuilder.ErrorResponse("Task not found", httpStatus.NOT_FOUND)
    );
  }

  return res.send(
    ResponseBuilder.SuccessResponse("Success get task", httpStatus.OK, task)
  );
};

const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTaskById(req, req.params.taskId, req.body);
    return res.send(ResponseBuilder.SuccessResponse("Success get task", httpStatus.OK, task));
  } catch (err) {
    return res.send(
      ResponseBuilder.ErrorResponse(
        "Error update task",
        httpStatus.INTERNAL_SERVER_ERROR,
        err.message
      )
    );
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await taskService.deleteTaskById(req, req.params.taskId);
    return res.send(ResponseBuilder.SuccessResponse("Success delete task", httpStatus.OK, deletedTask));
  } catch (err) {
    return res.send(
      ResponseBuilder.ErrorResponse(
        "Error delete task",
        httpStatus.INTERNAL_SERVER_ERROR,
        err.message
      )
    );
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
