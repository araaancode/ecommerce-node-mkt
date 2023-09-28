const nodeMailer = require('nodemailer')

function sendEmail(user, link) {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
  let mailOptions = {
    // should be replaced with real recipient's account
    to: user.email,
    subject: 'بازنشانی گذرواژه',
    text: `سلام ${user.firstName} ${user.lastName} برای بازنشانی گذرواژه روی لینک زیر کلیک کنید`,
    html: '<h1>برای تغییر گذرواژه روی لینک زیر کلیک کنید</h1> <br>' + link,
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message %s sent: %s', info.messageId, info.response)
  })
}

const sendSuccessEmail = (user, link) => {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
  let mailOptions = {
    // should be replaced with real recipient's account
    to: user.email,
    subject: ' گذرواژه با موفقیت تغییر یافت',
    text: `سلام ${user.firstName} ${user.lastName}  گذرواژه با موفقیت تغییر یافت. روی لینک زیر کلیک کنید تا وارد سایت شوید`,
    html: link,
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message %s sent: %s', info.messageId, info.response)
  })
}

module.exports = {
  sendEmail,
  sendSuccessEmail,
}