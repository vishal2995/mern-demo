const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const rolesModel = require("../models/rolesModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const days = process.env.JWT_EXPIRES_IN
  const cookiesOptions = {
    day: days,
    expires: new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookiesOptions.secure = true;
console.log(cookiesOptions)
  res.cookie("jwt", token, cookiesOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    tokenexpires:cookiesOptions.day,
    message: "You have successfully logged in",
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const name = `${req.body.first_name}` + " " + `${req.body.last_name}`;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  const role = req.body.role || "admin";
  const roleModel = await rolesModel.findOne({ role: role });
  const permissions = roleModel._id;
  const newUser = await User.create({
    first_name,
    last_name,
    name,
    email,
    password,
    passwordConfirm,
    role,
    permissions,
  });
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    message: "You have successfully signed up",
    data: {
      token: token,
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist

  if (!email && !password) {
    res.status(400).json({
      status: "error",
      message: {
        email: "Email is required",
        password: "Password is required",
      },
    });
  } else if (!email) {
    res.status(400).json({
      status: "error",
      message: "Email is required",
    });
  } else if (!password) {
    res.status(400).json({
      status: "error",
      message: "Password is required",
    });
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email })
    .select("+password")
    .populate("permissions");
  if (!user || !user.correctPassword(password, user.password)) {
    return next(
      new AppError("These credentials do not match our records.", 401)
    );
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});
