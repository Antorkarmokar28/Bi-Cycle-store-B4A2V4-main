import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production', // true for port 465, false for other ports
    auth: {
      user: 'antorkarmokar28@gmail.com',
      pass: 'qsef foji djze umlv',
    },
  });
  // send mail with defined transport object
  await transporter.sendMail({
    from: 'antorkarmokar28@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within 5 min ✔', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
