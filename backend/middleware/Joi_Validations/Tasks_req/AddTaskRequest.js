const Joi = require("joi");

const addTaskSchema = Joi.object({  
  task: Joi.string().pattern(/[a-zA-Z0-9 \.,^~`´ç]/).max(255).required()
  .messages({
    'any.required': 'Task is required',
    'string.pattern.base': 'Unauthorized Character',
    'string.max': 'Task must be at least 255 characters long',
  }),
});

const addTaskValidation = (req, res, next) => {
    const { error } = addTaskSchema.validate(req.body);
    if (error) {
        const message = error.details[0].message.includes('allowed') ? 'Bad request' : error.details[0].message;
        return res.status(400).json({ message: message });
    }
    return next();
};

module.exports = addTaskValidation;