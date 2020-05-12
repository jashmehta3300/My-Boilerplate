const User = require('../models/User');
const asyncHandler = require('../middleware/async');

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

  sendTokenResponse(user, 200, res);
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

  sendTokenResponse(user, 200, res)
};

//Get token from model, create cookie and send response
const sendTokenResponse  = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
        success:true,
        message:"Haa bhai",
        token
    })
}

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});