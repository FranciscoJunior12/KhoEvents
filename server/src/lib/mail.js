import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }

});


export async function sendMail({ to, subject, text }) {


    const info = await transporter.sendMail({
        from: '"khoevents" <khoeventsj@gmail.com>',
        to,
        subject,
        text,
        html: `<b>${subject}</b><br><p>${text}</p>`
    });

}