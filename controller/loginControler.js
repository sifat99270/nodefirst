const user = require("../models/usersSchema");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//route
async function loginController(req, res, next) {
  const loginuser = await user.findOne({ email: req.body.email });
  if (loginuser && loginuser._id) {
    const pass = `${req.body.password},${req.body.password}`;
    const compire = await bcrypt.compare(pass, loginuser.password);
    if (compire) {
      const loginObj = {
        name: loginuser.name,
        id: loginuser._id,
        email: loginuser.email,
        avatar: loginuser.avatar,
      };
      //token generate
      const token = jwt.sign(loginObj, process.env.JWT_SECRET);
      res.status(200).json({
        token,
        loginObj,
        message: "login successful",
      });
    } else {
      next(createError(404, "authnication fail"));
    }
  } else {
    next(createError(404, "authnication fail"));
  }
}

module.exports = {
  loginController,
};
