'use strict';
const nodemailer = require('nodemailer');

var output = `
        <p>You have signed up!</p>
        <h3>Your Details</h3>
        <ul>
            <li>${req.body.name}</li>
            <li>${"whatever"}</li>
        </ul>`;

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'seandillon1224@gmail.com', // generated ethereal user
            pass: 'Brandnew1224' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"nodemailer contact" <seandillon1224@gmail.com>', // sender address
        to: 'shakezula1224@yahoo.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render("login", {
            msg: "Email on the way"
        })

    });
});