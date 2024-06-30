import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Movie-Reservation-System',
      link: 'http://localhost:8000',
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  // TRANSPORTER , RESPONSIBLE TO SEND EAMIL
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USERNAME,
      pass: process.env.MAILTRAP_SMTP_PASSWORD,
    },
  });

  const email = {
    from: '"Majid Ali" <noreply@demomailtrap.com>',
    to: options.email, // Receiver's mail address
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    let res = await transporter.sendMail(email);
    console.log('res', res);
  } catch (error) {
    console.log(
      'Email service failed silently. Make sure you have provided your MAILTRAP credentials in the .env file'
    );
    console.log('Error: ', error);
  }
};

export const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      action: {
        instructions: `Welcome here. We're very excited to have you on board.`,
        button: {
          color: '#48cfad', // Optional action button color
          text: 'Confirm your account',
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: 'We got a request to reset the password of our account',
      action: {
        instructions:
          'To reset your password click on the following button or link:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Reset password',
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
