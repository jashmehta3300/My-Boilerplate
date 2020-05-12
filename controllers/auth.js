const User = require('../models/user');

// @desc      Register User
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  //Create user
  const user = await User.create({
    name: name,
    email: email,
    password: password
  });

  //Create token
  const token = user.getSignedJwtToken();

  //So now we are encrypting the password and instead of returning the data, we are sending a JWT token back

  res.status(200).json({
    success: true,
    token: token,
  });
};

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return next(
      res.status(400).json({
        success: false,
        error: 'Please provide email and password',
      })
    );
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(
      res.status(401).json({
        success: false,
        error: 'Invalid Credentials',
      })
    );
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(
      res.status(401).json({
        success: false,
        error: 'Invalid Credentials',
      })
    );
  }

  const token = user.getSignedJwtToken();

  res.send(200).json({
    success: true,
    token,
  });
};
