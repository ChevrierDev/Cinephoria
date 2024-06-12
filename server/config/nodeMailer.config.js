require('dotenv').config({ path: '../../.env' });
const nodemailer = require("nodemailer");

console.log(process.env.USER_PASSWORD)

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });
  
  
  
  module.exports = transporter;