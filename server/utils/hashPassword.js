const bcrypt = require("bcrypt");

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hash:', hashedPassword);
    return hashedPassword; 
  } catch (err) {
    console.log(err);
    throw new Error('Hashing password failed');
  }
}

module.exports = hashPassword;
