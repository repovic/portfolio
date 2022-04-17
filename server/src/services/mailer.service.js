const nodemailer = require("nodemailer");

const self = (module.exports = {
    sendMail: async ({ from, to, replyTo, subject, text, html }) => {
        try {
            if (Number(process.env.EMAIL_ENABLED) === 1) {
                const transporter = nodemailer.createTransport({
                    host: process.env.EMAIL_HOST,
                    port: process.env.EMAIL_PORT,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_AUTH_USER,
                        pass: process.env.EMAIL_AUTH_PASS,
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                });
                return await transporter.sendMail({
                    from,
                    to,
                    replyTo,
                    subject,
                    text,
                    html,
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
});
