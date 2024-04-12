const app = require("express");
const router = app.Router();
const nodemailer = require('nodemailer');



router.post('/', async (req, res) => {

  const transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'universalmart40@gmail.com',
      pass: 'berw zcor jnij snto'
    }
  });

  try {
    const { email } = req.body;

    const mailOptions = {
      from: 'universalmart40@gmail.com',
      to: email,
      subject: 'Universal Mart Newsletter Subscription',
      text: 'You have successfully subscribed to our newsletter.'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.send('Email sent successfully');
  } catch (error) {
    console.error("Error sending email backend:", error);
  }
});

module.exports = router;
