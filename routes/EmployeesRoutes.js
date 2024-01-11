const express = require("express");
const router = express.Router();
const employeeSchema = require("../schema/employeeSchema");
const {
  signinEmployee,
  getEmployee,
  loginEmployee,
} = require("../controllers/employeeController");
const { isAuthenticated, authorisedRoles } = require("../middlewares/auth");

router.route("/create-employee").post(signinEmployee);

router.route("/").get(isAuthenticated, getEmployee);

router.route("/log-in").post(loginEmployee);

module.exports = router;
