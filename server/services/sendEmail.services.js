const transporter = require("../config/nodeMailer.config");
require('dotenv').config({path: '../../../.env'});


async function sendEmail(email, subject, text){
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: subject,
        text: text,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
    });
}

module.exports = sendEmail;