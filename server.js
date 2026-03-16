// ستخدم مكتبة dotenv لتحميل المتغيرات الموجودة في ملف .env.
require('dotenv').config();
const app = require('./src/app');
const mongoose = require('mongoose');
// تحديد رقم البورت لو موجود في اينف ولو مش موجود يستخدم 5000
const PORT = process.env.PORT || 5000;
// الاتصال بقاعدة بيانات MongoDB باستخدام الرابط الموجود في متغير البيئة MONGODB_URI.
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected');
// تشغيل السيرفر على البورت المحدد باستخدام تطبيق Express.js.
        app.listen(PORT, () => {
// طباعة رسالة توضح أن السيرفر يعمل وعلى أي بورت.
            console.log(`Server running on port ${PORT}`);
        });
    })
// تنفيذ الكود التالي إذا حدث خطأ أثناء الاتصال بقاعدة البيانات.
    .catch((err) => {
// طباعة رسالة الخطأ في الـ console.
        console.error('DB Connection Error:', err.message);
// إيقاف البرنامج بسبب الخطأ.
        process.exit(1);
    });