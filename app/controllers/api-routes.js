var db = require("../models");
var expressValidator = require("express-validator");
var passport = require('passport');

var bcrypt = require('bcrypt');
const saltRounds = 10;

var userSession;


// var output = `
//         <p>You have signed up!</p>
//         <h3>Your Details</h3>
//         <ul>
//             <li>${results.user}</li>
//             <li>${"whatever"}</li>
//         </ul>`;

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: 'seandillon1224@gmail.com', // generated ethereal user
//         pass: 'Brandnew1224' // generated ethereal password
//     }
// });

// // setup email data with unicode symbols
// let mailOptions = {
//     from: '"nodemailer contact" <seandillon1224@gmail.com>', // sender address
//     to: req.body.email, // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world?', // plain text body
//     html: output // html body
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message sent: %s', info.messageId);
//     // Preview only available when sending through an Ethereal account
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//     res.render("login", {
//         msg: "Email on the way"
//     })

// });

module.exports = function (app) {
    app.get("/", function (req, res) {



        db.Category.findAll({
           
        }).then(function (results) {
            console.log(results)
            res.render('home', 
             homeData = {
                title: 'Home',
                Category: results
            })
        });

    })

    app.get("/profile", authenticationMiddleware(), function (req, res) {
        db.User.find({
            where: {
                userName: req.session.passport.user.userName
            }
        }).then(function (results) {
            console.log(results)
            res.render('profile', 
             profileData = {
                title: 'Profile',
                profile: results
            })
        });
    });

    app.get('/login', function (req, res) {
        res.render('login', {
            title: "Login"
        })
    });

    app.post('/login', passport.authenticate("local", {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    app.get("/logout", function (req, res) {
        req.logout();
        req.session.destroy();
        res.redirect("/")
    });


    //MOVE ITEMS TO item-api-routes.js
    // app.get("/items", function (req, res) {
    //     res.render("items", {
    //         title: "Items"
    //     });
    // })

    // app.post("/items", function (req, res) {
    //     db.Items.create({


    //     });

    // });

    app.get("/register", function (req, res) {
        res.render("register", {
            title: "Registration"
        });
    });

    app.post("/registernew", function (req, res) {
        const password = req.body.password;
        bcrypt.hash(password, saltRounds, function (err, hash) {
            db.User.create({
                userName: req.body.username,
                password: hash,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }).then(function (results) {
                

                    res.render("login", {
                        msg: "Email on the way"
                    })

               
            });
        });
    });
}

passport.serializeUser(function (user_id, done) {
    done(null, user_id)
});

passport.deserializeUser(function (user_id, done) {
    done(null, user_id);
});

function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`
        req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.isAuthenticated()) return next();

        res.redirect("/login")
    }
}

// this code if used properly will help display validation errors, leaving it out for time being until working

// .catch(Sequelize.ValidationError, function (err) {
//     console.log(err + "heres your error")
// })