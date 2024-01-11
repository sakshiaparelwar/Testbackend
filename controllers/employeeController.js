const bcrypt = require("bcrypt");
// const sendToken = require("../utils/sendToken");
const employeeSchema = require("../schema/employeeSchema");

exports.signinEmployee = (req, res, next) => {
  const { name, phone, location, email, password, department } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      employeeSchema.create(
        { name, phone, location, email, password: hash, department },
        (err, data) => {
          if (err) {
            return next(err);
          } else {
            const token = data.getJWTToken();
            return res.json({ data, token });
          }
        }
      );
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getEmployee = (req, res, next) => {
  // Retrieve query parameters
  const location = req.query.location;
  const name = req.query.name;
  const sort = req.query.sort || "asc";

  const filter = {};
  if (location) {
    filter.location = location;
  }
  if (name) {
    filter.name = { $regex: new RegExp(name, "i") };
  }

  // Find employees with optional filtering and sorting
  employeeSchema
    .find(filter)
    .sort({ name: sort, location: sort })
    .exec((err, data) => {
      if (err) {
        return next(err);
      } else {
        return res.json(data);
      }
    });
};

// exports.getEmployee = (req, res, next) => {
//   employeeSchema.find((err, data) => {
//     if (err) {
//       return next(err);
//     } else {
//       return res.json(data);
//     }
//   });
// };

exports.loginEmployee = (req, res, next) => {
  const { email, password } = req.body;
  employeeSchema.findOne({ email }).then((employee) => {
    if (employee) {
      bcrypt.compare(password, employee.password, (err, response) => {
        if (response) {
          const token = employee.getJWTToken();
          return res.status(200).json({
            success: true,
            message: "You have logged in successfully",
            token: token,
          });
        } else {
          return res.json({ message: "Password is incorrect!!!" });
        }
      });
    } else {
      res.status(404).json({ success: false, message: "No record found" });
    }
  });
};
