const jwt = require("jsonwebtoken");
const employeeSchema = require("../schema/employeeSchema");

exports.isAuthenticated = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please Login to access this resource" });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.employee = await employeeSchema.findById(decodedData.id);

    // console.log("Employee Object:", req.employee);

    next();
  } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

exports.authorisedRoles = (...departments) => {
  return (req, res, next) => {
    if (!departments.includes(req.employee.department)) {
      return res.json({
        message: `Role: ${req.employee.department} is not allowed to access this resouce `,
      });
    }

    next();
  };
};
