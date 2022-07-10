const Joi = require("joi");

const forgotPassSchema = Joi.object({  
  email: Joi.string().email().required()
  .messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
});

const forgotPassValidation = (req, res, next) => {
    const { error } = forgotPassSchema.validate(req.body);
    if (error) {
        const message = error.details[0].message.includes('allowed') ? 'Bad request' : error.details[0].message;
        return res.status(400).json({ message: message });
    }
    return next();
};

module.exports = forgotPassValidation;