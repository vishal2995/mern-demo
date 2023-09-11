const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const rolesSchema = new mongoose.Schema({
  allPermissions: [
    { group: String, permissions: [{ title: String, name: String }] },
  ],
  role: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Role is required"],
  },
  permissions: [{ type: String }],
});
rolesSchema.plugin(uniqueValidator, { message: "{PATH} already exists" });
module.exports = mongoose.model("roles", rolesSchema);
