import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';




sgMail.setApiKey('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');


export const send = (to, subject, body) => {


    sgMail.send({
        to: to,
        from: 'franciscomanueldomingosj@gmail.com',
        subject: subject,

        html: body,
    })
        .then(() => {
            console.log('E-mail enviado com sucesso!');
        })
        .catch((error) => {
            console.error(error);
        });

}



const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }

});



export async function sendMail({ to, subject, text }) {


    const info = await transporter.sendMail({
        from: "franciscomanueldomingosj@gmail.com",
        to,
        subject,
        text,
        html: `<b>${subject}</b><br><p>${text}</p>`
    });

}