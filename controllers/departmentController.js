const departmentSchema = require("../schema/departmentSchema");

exports.createDepartment = (req, res, next) => {
  departmentSchema.create(req.body, (err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
};

exports.showDepartment = (req, res, next) => {
  departmentSchema.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
};

exports.deleteDepartment = (req, res, next) => {
  departmentSchema.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
};

exports.getdepartmenttoupdate = (req, res, next) => {
  departmentSchema.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
};

exports.updateDepartment = (req, res, next) => {
  departmentSchema.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (err, data) => {
      if (err) {
        return next(err);
      } else {
        return res.json(data);
      }
    }
  );
};
