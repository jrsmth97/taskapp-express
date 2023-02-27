const express = require('express');
const validate = require('../middlewares/validate.middleware');
const taskValidator = require('../validators/task.validator');
const { taskController } = require('../controllers');

const router = express.Router();

router
  .route('/')
  .get(taskController.getTasks)
  .post(validate(taskValidator.createTask), taskController.createTask);

router
  .route('/:taskId')
  .get(validate(taskValidator.getTask), taskController.getTask)
  .patch(validate(taskValidator.updateTask), taskController.updateTask)
  .delete(validate(taskValidator.deleteTask), taskController.deleteTask);

module.exports = router;