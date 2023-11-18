const Hash = require("../../other/hash");
const User = require("../../models/usersSchema");
const jwt = require("jsonwebtoken");

//get user
async function getUser(req, res, next) {
  let newUser;
  const pass = req.body.password;
  const hash = await Hash(pass);
  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hash,
    });
  } else {
    newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
  }
  try {
    const result = await newUser.save();
    const find = await User.findOne({ email: result.email });
    if (find._id && find.name && find.email) {
      const loginObj = {
        name: find.name,
        id: find._id,
        email: find.email,
        avatar: find.avatar,
      };
      const token = jwt.sign(loginObj, process.env.JWT_SECRET);
      console.log(token);
      return res.status(200).json({
        token,
        loginObj,
        message: "user create successfully",
      });
    } else {
      res.status(500).json({
        error: "user can not find",
      });
    }
  } catch (err) {
    return res.status(500).json({
      errors: {
        common: {
          msg: "Unknown user occured",
        },
      },
    });
  }
}

module.exports = getUser;
