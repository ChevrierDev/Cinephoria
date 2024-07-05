const express = require("express");
const contactRoutes = express.Router();
const transporter = require("../../config/nodeMailer.config");
require("dotenv").config({ path: "../../../.env" });

contactRoutes.get("/", (req, res) => {
  res.render("layouts/contact", {
    title: "Contactez-nous.",
    message: "",
  });
});

contactRoutes.post("/", async (req, res) => {
    const { email, username, titre, message } = req.body;
  
    const mailOptions = {
      from: email,
      replyTo: email,
      to:  process.env.USER_EMAIL,
      subject: titre,
      text: `Ce mail vous a été envoyé par ${username} (${email}): ${message}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.render("layouts/contact", {
        title: "Contactez-nous",
        message: "Votre message a été envoyé avec succès.",
      });
    } catch (err) {
      console.error(err);
      res.render("layouts/contact", {
        title: "Contactez-nous",
        message:
          "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer plus tard.", 
      });
    }
  });
  
module.exports = contactRoutes;
