const User = require('./user.model');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/AppError');

// داله انشاء التوكن
const generateToken = (userId) => {
  // يستخدم لتأمين التوكن.
  //  بروسيس انف جي تابيو تي ده مفتاح سري موجود في ملف الenv
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    // وقت انتهاء التوكن 7 ايام
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};
// دي مسؤولة عن إنشاء مستخدم جديد.
const register = async ({ name, email, password }) => {
  // لو فيه مستخدم بنفس الايميل بيعمل ايرور
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError('Email already in use', 400);
  // ونحفظ المستخدم في قاعده البيانات

  const user = await User.create({ name, email, password });
  // هننشأ توكن ونستخدم id المستخدم لانشاء التوكن
  const token = generateToken(user._id);

  // هنرجع التوكن وبيانات المستدم بس منغير باسورد للامان
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

// دي مسئوله عن تسجيل الدخول
const login = async ({ email, password }) => {
  // نبحث عن المستخدم
  // بنضيف سيليكت باسورد عشان الباسورد مخفي في الموديلل
  const user = await User.findOne({ email }).select('+password');
  // لو المستخدم م موجود
  if (!user) throw new AppError('Invalid email or password', 401);
// المخل والمشفر في قاعده البيانات دي لمقارنه الباسورد
  const isMatch = await user.comparePassword(password);
  // دي لو الباسورد غلط
  if (!isMatch) throw new AppError('Invalid email or password', 401);

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
// تصدير الدوال زي مسح الملفات التانيه باستخدام اللوجين والريجيستر
module.exports = { register, login };
















// هذا الملف يحتوي على Authentication Service المسؤول عن تسجيل المستخدمين وتسجيل الدخول.
// عند التسجيل يتم التأكد أن البريد الإلكتروني غير مستخدم ثم إنشاء المستخدم وإنشاء JWT Token.
// وعند تسجيل الدخول يتم التحقق من البريد وكلمة المرور ثم إنشاء Token وإرجاع بيانات المستخدم.