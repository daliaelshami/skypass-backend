const authService = require('./auth.service');
const { registerSchema, loginSchema } = require('./auth.validation');
const AppError = require('../utils/appError');

const register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    const result = await authService.register(req.body);

    res.status(201).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    const result = await authService.login(req.body);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };