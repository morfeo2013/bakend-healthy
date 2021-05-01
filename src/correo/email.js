const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'ganohealthymedellin2021@gmail.com', // generated ethereal user
      pass: 'bvmh oxdr qqud vmbv', // generated ethereal password
    },
});

module.exports = {transporter};
