const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(100).required()
  .messages({
    'any.required': 'First Name is required',
    'string.alphanum': 'First Name must only contain letters or numbers',
    'string.min': 'First Name must be at least 3 characters long',
    'string.max': 'First Name must be at most 100 characters long',
  }),
  lastName: Joi.string().alphanum().min(3).max(100).required()
  .messages({
    'any.required': 'Last Name is required',
    'string.alphanum': 'Last Name must only contain letters or numbers',
    'string.min': 'Last Name must be at least 3 characters long',
    'string.max': 'Last Name must be at most 100 characters long',
  }),
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
  }),
});

const registerValidation = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    return next();
};

module.exports = registerValidation;