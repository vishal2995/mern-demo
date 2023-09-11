const rolesModel = require("../models/rolesModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllRole = catchAsync(async (req, res) => {
  const role = await rolesModel.find();
  //SEND RESPONCE
  res.status(200).json({
    status: "success",
    data: {
      role,
    },
  });
});

exports.createRole = catchAsync(async (req, res, next) => {
  const newRole = await rolesModel.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      payload: newRole,
    },
  });
});

exports.getRole = catchAsync(async (req, res, next) => {
  const role = await rolesModel.findById(req.params.id);
  if (!role) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      payload: role,
    },
  });
});

exports.editRole = catchAsync(async (req, res, next) => {
  const role = await rolesModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!role) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      role,
    },
  });
});

exports.deleteRole = catchAsync(async (req, res, next) => {
  const role = await rolesModel.findByIdAndDelete(req.params.id);
  if (!role) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    message: "Role deleted successfully",
    data: null,
  });
});
