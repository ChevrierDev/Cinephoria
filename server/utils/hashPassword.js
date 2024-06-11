const bcrypt = require("bcrypt");

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword; 
  } catch (err) {
    console.log(err);
    throw new Error('Hashing password failed');
  }
}

async function compareHashedPassword(password, hashedPassword) {
    try {
        const comparePassword = await bcrypt.compare(password, hashedPassword);
        return comparePassword; 
      } catch (err) {
        console.log(err);
        throw new Error('Coparing password failed');
      }
}

module.exports = {hashPassword, compareHashedPassword};
