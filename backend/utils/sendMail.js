const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USERNAME, 
      pass: process.env.MAILTRAP_PASSWORD, 
    },
  });

  let message = await transporter.sendMail({
    from: `From ${process.env.FROM_NAME}:/ <${process.env.FROM_EMAIL}>`,
    to: `${options.email}`,
    subject: `${options.subject}`,
    text: `${options.message}`,
  });
  console.log('Message sent: %s', message.messageId);
};

module.exports = sendEmail;

