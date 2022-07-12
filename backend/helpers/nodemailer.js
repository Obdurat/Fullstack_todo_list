const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

const messageCreator = (token, email) => {
  const message = {
    from: "todo_list_team@email.com",
    to: `${email}`,
    subject: "Password Reset Todo List",
    html: `
        <div>
            <img src='https://i.imgur.com/xbJFnva.png' style='width: 100%;'>
            <p style='text-align: center'>Hello from the fullstack todo List team !</p>
            <p style='text-align: center'>You're seeing this email because someone made a request to reset your password</p>
            <p style='text-align: center'>If you didn't make this request please disconsider this email</p>
            <p style='text-align: center'>If you did make this request please click the link bellow to reset your password</p>
            <p style='text-align: center'><a href='http://localhost:3000/resetpassword/${token}'>http://localhost:3000/resetpassword/${token}</a></p>
        </div>`,
  };
  return message;
};

const promiseSendMail = (token, email) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(messageCreator(token, email), (err, info) => {
      if (err) reject(err);
      else resolve(info);
    });
  });
};

module.exports = { promiseSendMail };
