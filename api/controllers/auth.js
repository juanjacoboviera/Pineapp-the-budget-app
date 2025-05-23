const jwt = require('jsonwebtoken');
const User = require('../models/User');


const register = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password: password });
    await user.save();
    res.json({ message: 'Registration successful', user: user });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1 hour'
    });
    res.status(200).json({ token, message: "Login successful!" });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };