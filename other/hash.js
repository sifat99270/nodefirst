const bcrypt = require("bcrypt");
const createError = require("http-errors");
async function Hash(password) {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (err) {
    createError(404, "password dont hash");
  }
}

module.exports = Hash;
