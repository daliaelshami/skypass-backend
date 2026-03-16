const jwt = require('jsonwebtoken');
// jsonwebtoken → مكتبة للتحقق وإنشاء الـJWT (Token).
const User = require('../modules/auth/user.model'); 
// User → موديل المستخدم من قاعدة البيانات (MongoDB غالبًا).
const AppError = require('../utils/AppError');
// AppError → كلاس مخصص للأخطاء، بيخلي التحكم في الأخطاء أسهل.


// Middleware حماية الـRoutes
const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new AppError('Not authenticated', 401);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) throw new AppError('User not found', 401);

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = { protect };