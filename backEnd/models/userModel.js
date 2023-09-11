const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
var uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "First name is required"],
  },
  last_name: {
    type: String,
    trim: true,
    required: [true, "Last name is required"],
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    default: "admin",
  },
  passwordConfirm: {
    type: String,
    required: [true, "Confirm password is required"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return (el = this.password);
      },
      message: "Passwords are not the same!",
    },
  },
  permissions: { type: String, ref: "roles" },
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();
  // Hash the password with cost of 12
  this.password = bcrypt.hashSync(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("updateOne", async function (next) {
  const data = this.getUpdate();
  if (data.password) {
    data.password = bcrypt.hashSync(data.password, 12);
    data.passwordConfirm = undefined;
  }
  next();
});

userSchema.plugin(uniqueValidator, { message: "{PATH} already exists" });

userSchema.methods.correctPassword = function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compareSync(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
