const express = require("express");
const {
  createDepartment,
  showDepartment,
  deleteDepartment,
  updateDepartment,
  getdepartmenttoupdate,
} = require("../controllers/departmentController");
const { isAuthenticated, authorisedRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/create-department").post(createDepartment);

router.route("/").get(isAuthenticated, showDepartment);

router.route("/delete-department/:id").delete(deleteDepartment);

router
  .route("/update-employee/:id")
  .get(getdepartmenttoupdate)
  .put(updateDepartment);

module.exports = router;
