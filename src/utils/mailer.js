// backend/src/utils/mailer.js
const nodemailer = require("nodemailer");
const { config } = require("../database/firebase");

const emailConfig = config.email;

const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: emailConfig.secure, // true para 465, false para 587
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

async function sendMail(to, subject, html) {
  const info = await transporter.sendMail({
    from: emailConfig.from,
    to,
    subject,
    html,
  });

  console.log("Correo enviado:", info.messageId);
}

module.exports = { sendMail };
