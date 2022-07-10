const Joi = require("joi");

const loginSchema = Joi.object({  
  email: Joi.string().email().required()
  .messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
  password: Joi.string().min(8).max(100).required()
  .messages({
    'any.required': 'Password is required',
    'string.min': 'Password must be at least 8 characters long', 
    'string.max': 'Password must be at most 100 characters long',
  })
});

const loginValidation = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        const message = error.details[0].message.includes('allowed') ? 'Bad request' : error.details[0].message;
        return res.status(400).json({ message: message });
    }
    return next();
};

module.exports = loginValidation;