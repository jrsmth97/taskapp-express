const Joi = require('joi');

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const createTask = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    is_finish: Joi.boolean().default(false),
  }),
};

const getTasks = {
  query: Joi.object().keys({}),
};

const getTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
};

const updateTask = {
  params: Joi.object().keys({
    taskId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        title: Joi.string().required(),
        description: Joi.string().optional(),
        is_finish: Joi.boolean().optional(),
    })
    .min(1),
};

const deleteTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};