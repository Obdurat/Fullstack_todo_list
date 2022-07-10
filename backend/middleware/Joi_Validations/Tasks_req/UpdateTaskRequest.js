const Joi = require("joi");

const updateTaskSchema = Joi.object({  
  task: Joi.string().pattern(/[a-zA-Z \.,^~`´ç]/).max(255)
  .messages({
    'string.pattern.base': 'Unauthorized Character',
    'string.max': 'Task must be at least 255 characters long',
  }),
  completed: Joi.bool()
  .messages({
    'boolean.base': 'Completed must be a boolean value',
  }),
}).required();

const updateTaskValidation = (req, res, next) => {
    const { error } = updateTaskSchema.validate(req.body);
    if (error) {
        const message = error.details[0].message.includes('allowed') ? 'Bad request' : error.details[0].message;
        return res.status(400).json({ message: message });
    }
    return next();
};

module.exports = updateTaskValidation;