const nodemailer = require("nodemailer");

function sendEmail(message){
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    transporter.sendMail(message, function(err, info) {
      if(err) {
        rej(err)
      }else{
        res(info)
      }
    })
  });
}

exports.sendConfirmationEmail = function ({ toUser, hash }) {
  console.log(toUser.email,hash);
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email,
    // to: process.env.GOOGLE_USER,
    subject: 'Kích hoạt tài khoản',
    html: `
      <h3>Chào ${toUser.firstname} ${toUser.lastname} </h3>
      <p>Cảm ơn bạn đã đăng ký vào ứng dụng của chúng tôi. Chỉ còn một bước nữa...</p>
      <p>Để kích hoạt tài khoản hãy nhấn vào liên kết sau: <a target="_" href="${process.env.DOMAIN}active/user/${hash}">Liên kết kích hoạt</a></p>
      <p>Thank you,</p>
      <p>Nongnghiepxanh</p>    
    `
  }

  return sendEmail(message);
};
  
// exports.sendResetPassword = function ({ toUser, hash }) {
  
//   const message = {
//     from: process.env.GOOGLE_USER,
//     to: toUser.email,
//     // to: process.env.GOOGLE_USER,
//     subject: 'DULCIE - Reset Password',
//     html: `
//       <h3>Chào ${toUser.username} </h3>
//       <p>Để đổi mật khẩu hãy nhấn vào liên kết sau: <a target="_" href="${process.env.DOMAIN}/reset-password/${hash}">Liên kết đôi mật khẩu</a></p>
//       <p>Cheers,</p>
//       <p>DATN-DULCIE</p>    
//     `
//   }

//   return sendEmail(message);
// };