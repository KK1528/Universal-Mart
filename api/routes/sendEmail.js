const express = require("express");
const router = express.Router(); // Create a router instance
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'universalmart40@gmail.com',
    pass: 'Umart@#123'
  }
});

router.post('/', (req, res) => { // Define the route without the '/api' prefix
  const { email } = req.body;

  const mailOptions = {
    from: 'universalmart40@gmail.com',
    to: email,
    subject: 'Universal Mart Newsletter Subscription',
    text: 'You have successfully subscribed to our newsletter.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

module.exports = router; // Export the router
