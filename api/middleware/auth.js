const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const token = JSON.parse(req.headers.authorization?.split(' ')[1]);
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      return decoded
    });
    const user = await User.findById({_id: decodedToken.userId});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    console.log(req.user)
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticate };