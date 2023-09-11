const Users = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatur");
const jwt = require("jsonwebtoken");
const rolesModel = require("../models/rolesModel");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // const userdata = await Users.find();
  let users = {};
  let datalength = {};
  const features = new APIFeatures(Users, req.query).filter().sort().paginate();
  users = await features.query;

  if (req.query.name) {
    const total = new APIFeatures(Users, req.query).filter();
    datalength = await total.query;
  } else {
    datalength = await Users.find();
  }

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    result: users.length,
    total: datalength.length,
    users,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const name = `${req.body.first_name}` + " " + `${req.body.last_name}`;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  const role = req.body.role || "user";
  const roleModel = await rolesModel.findOne({ role: role });
  const permissions = roleModel?._id;

  datalength = await Users.find();
  if(datalength.length < process.env.USER_LIMIT){
    const newUser = await Users.create({
      first_name,
      last_name,
      name,
      email,
      password,
      passwordConfirm,
      role,
      permissions,
    });
    res.status(201).json({
      status: "success",
      message: "User added succesfully",
      data: {
        user: newUser,
      },
    });
  }else{
    res.status(429).json({
      status: "success",
      message: "You have exceeded the add user limit. Please try again later!",
    });
  }
  
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const name = `${req.body.first_name}` + " " + `${req.body.last_name}`;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role || "user";
  const roleModel = await rolesModel.findOne({ role: role });
  const permissions = roleModel._id;
  const newUser = await Users.updateOne(
    { _id: req.params.id },
    {
      first_name,
      last_name,
      name,
      email,
      password,
      role,
      permissions,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!newUser) {
    return next(new AppError("No user found with that ID", 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      newUser,
    },
    message: "User edited succesfully",
  });
});

exports.deletUser = catchAsync(async (req, res, next) => {
  const user = await Users.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError("No tour found with that ID", 400));
  }
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
    data: null,
  });
});

exports.getuser = catchAsync(async (req, res, next) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    return next(new AppError("No tour found with that ID", 400));
  }
  res.status(200).json({
    status: "success",
    data: {
      users: user,
    },
  });
});
