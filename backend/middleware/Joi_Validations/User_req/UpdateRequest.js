const Joi = require("joi");

const updateSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(100)
  .messages({
    'string.alphanum': 'First Name must only contain letters or numbers',
    'string.min': 'First Name must be at least 3 characters long',
    'string.max': 'First Name must be at most 100 characters long',
  }),
  lastName: Joi.string().alphanum().min(3).max(100)
  .messages({    
    'string.alphanum': 'Last Name must only contain letters or numbers',
    'string.min': 'Last Name must be at least 3 characters long',
    'string.max': 'Last Name must be at most 100 characters long',
  }),
  email: Joi.string().email()
  .messages({
    'string.email': 'Email must be a valid email address',
  }),
  avatar: Joi.string().uri()
  .messages({
    'string.uri': 'You Avatar must come from a valid URL',
  })
}).required();

const updateValidation = (req, res, next) => {
    const { error } = updateSchema.validate(req.body);
    if (error) {
        const message = error.details[0].message.includes('allowed') ? 'Bad request' : error.details[0].message;
        return res.status(400).json({ message: message });
    }
    return next();
};

module.exports = updateValidation;