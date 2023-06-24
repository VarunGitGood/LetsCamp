const axios = require('axios');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

// this script will send an email to all users with the list of bootcamps added in the last week 
// for the cron we will be using github actions and the cron will run every week on monday

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});

const templatePath = path.join(__dirname, 'email.ejs');
const template = fs.readFileSync(templatePath, 'utf-8');

async function sendEmail(emailOptions) {
  try {
    const compiledTemplate = ejs.compile(template);
    const html = compiledTemplate(emailOptions.context);

    const info = await transporter.sendMail({
      ...emailOptions,
      html,
    });

    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

axios
  .get('https://your-backend-api/users')
  .then(response => {
    const users = response.data;

    axios
      .get('https://your-backend-api/bootcamps')
      .then(response => {
        const bootcamps = response.data;

        users.forEach(user => {
          const emailOptions = {
            from: 'your-email@example.com',
            to: user.email,
            subject: 'New Bootcamps',
            context: {
              bootcamps: bootcamps,
            },
          };

          sendEmail(emailOptions);
        });
      })
      .catch(error => {
        console.error('Error fetching bootcamps:', error);
      });
  })
  .catch(error => {
    console.error('Error fetching users:', error);
  });
