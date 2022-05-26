const bcrypt = require("bcryptjs");

const generateHash = async (password) => {
  try {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

const compareHash = async (req_password, db_password) => {
  try {
    return await bcrypt.compare(req_password, db_password);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

module.exports = {
  generateHash,
  compareHash,
};
