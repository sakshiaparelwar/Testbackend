const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const employeeRoutes = require("./routes/EmployeesRoutes");
const departmentRoutes = require("./routes/DepartmentRoutes");
const dotenv = require("dotenv");

dotenv.config();

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to database");
});
db.on("open", () => {
  console.log("Database connected");
});

app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use("/employees", employeeRoutes);
app.use("/departments", departmentRoutes);

app.listen(5001, () => {
  console.log("server listening on 5001");
});
