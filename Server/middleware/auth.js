const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  const token =
    req.header('x-auth-token') ||
    (req.header('Authorization') && req.header('Authorization').split(' ')[1]);

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Decoded token:', decoded);
    if (!decoded.user || !decoded.user.id) {
      console.log('❌ Token missing user ID');
      return res.status(401).json({ msg: 'Token is not valid' });
    }


    // 🔥 THIS LINE: works for { user: { id: ... } }
    req.user = await User.findById(decoded.user.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    next();
  } catch (err) {
    console.error('❌ Token verification error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};


