// التحقق من البيانات الجايه من المستخدم 
// منع ادخال بيانات غلط
// ارجاع رسائل خطا واضحه 
const Joi = require('joi');
// هنا بننشئ Schema يحدد شكل البيانات المطلوبة عند تسجيل مستخدم جديد.
const registerSchema = Joi.object({
  // لازم يكون استرينج ويكون اقل طول حرفين واكبر 50حرف والحقل اجباري
  name: Joi.string().min(2).max(50).required().messages({
    // لو المستخدم لم يكتب اسم
    'string.empty': 'Name is required',
    // لو الاسم اقل من حرفين
    'string.min': 'Name must be at least 2 characters',
  }),
  // لازم الايميل يكون استرينج ويكون صحيح وميكونش فيه مسافات
  email: Joi.string().email().required().messages({
    // لو مكتبش ايميل
    // او لو كتب ايميل غير صحيح يعني فيه ارقام كتير 
    // بتظهر السطر الي تحت
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email',
  }),

  password: Joi.string().min(6).required().messages({
    // لو مكتبش باسورد او كتب اقل من 6 حروف مثلا
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters',
  }),
});
// هذا الكود يستخدم مكتبة Joi لعمل Validation لبيانات تسجيل الدخول.

// يعني يتأكد أن البيانات التي يرسلها المستخدم صحيحة قبل تنفيذ login.


// بعمل اسكيما في حاله اللوجن بنحتاج ايميل وباسورد
const loginSchema = Joi.object({
  // بنتحقق من الايميل
  email: Joi.string().email().required().messages({
    // لو المستخدم مكتبش ايميل
    'string.empty': 'Email is required',
    // لو الايميل اتكتب بس غلط
    'string.email': 'Please provide a valid email',
  }),
  // التحقق من الباسورد
  // مش هنحط رقم هنا لان حدده في انشاء انشاء كلمه المرور بالفعل عند التسجيل 
  password: Joi.string().required().messages({
    // لو مكتبتش باسورد هتظهر الرساله  دي
    'string.empty': 'Password is required',
  }),
});


// هذا السطر يسمح باستخدام:

// registerSchema

// loginSchema

// في ملفات أخرى مثل:

// auth.routes

// middleware validation
module.exports = { registerSchema, loginSchema };