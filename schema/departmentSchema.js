const mongoose = require("mongoose");
const departmentSchema = new mongoose.Schema(
  {
    departmentname: { type: String, required: true },
    employeename: { type: String, required: true },
  },
  {
    collection: "Departments",
  }
);

module.exports = mongoose.model("Departments", departmentSchema);
