const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,  
    },
});

/**
 * @param {object} options 
 * @param {string} options.to
 * @param {string} options.subject 
 * @param {string} options.text 
 * @param {string} [options.html] 
 */
const sendEmail = async (options) => {
    try {
        const mailOptions = {
            from: `"The Art Blog" <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html, 
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent');
    }
};

module.exports = sendEmail;