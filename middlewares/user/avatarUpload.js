const uploder = require("../../utilities/singleUploder");

function avatarUpload(req, res, next) {
  console.log(req.files);
  const upload = uploder(
    "avatars",
    200000000,
    "only .jpeg,.jpg,.png formal allowed"
  );
  upload.any()(req, res, next, (err) => {
    if (err) {
      return res.status(500).json({
        error: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}
module.exports = avatarUpload;
