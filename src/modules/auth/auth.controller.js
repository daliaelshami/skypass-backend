//  اللي فيه منطق التسجيل والدخول
const authService = require('./auth.service');
// قواعد التحقق من البيانات
const { registerSchema, loginSchema } = require('./auth.validation');
// لإنشاء رسائل الأخطاء
const AppError = require('../../utils/AppError');

const register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    // لو فيه غلط يوقف ويرجع رساله بالغلط 400
    if (error) return next(new AppError(error.details[0].message, 400));
// لو تمام → يبعت البيانات لـ authService.register
    const result = await authService.register(req.body);
// لو 201 يتم الانشاء بنجاح 
    res.status(201).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// يتحقق من البيانات
const login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    // لو في خطأ → يرجع 400

    if (error) return next(new AppError(error.details[0].message, 400));
// لو تمام → يبعت لـ authService.login()

    const result = await authService.login(req.body);
// يرجع رد 200 = نجاح
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// بيصدؤ دالتين عشان يستخدمهم الاث واللوجين جي اس
module.exports = { register, login };