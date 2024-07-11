import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { userModel } from '../../../models/userModel.js';

export class PasswordResetController {
    static async sendPasswordResetEmail(req, res) {
        const { email } = req.body;
        const user = await userModel.findByEmail(email);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        // Calculate expiration date for the reset token, e.g., 1 hour from now
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);
        await userModel.saveResetToken(email, resetToken, expirationDate);

        const resetLink = `http://localhost:3000/forgot-password?token=${resetToken}`;
        
        // Configuración de Nodemailer
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, 
            auth: {
                user: 'andresburgosj@gmail.com',
                pass: 'tkah xche uzyi uuql' 
            }
        });

        transporter.verify().then(() =>{ 
            console.log('Listo para enviar correos');
        });

        const mailOptions = {
            from: ' "Forgot Password" <andresburgosj@gmail.com> ', // sender address
            to: email, // list of receivers, changed from user.username to email
            subject: 'Reinicio de Contraseña', // Subject line
            text: `Para reiniciar tu contraseña, por favor sigue este enlace: ${resetLink}`, // plain text body
            // html: "<b>Hello world?</b>", // html body - optional
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
                return res.status(500).send('Error al enviar el correo');
            }
            res.send('Correo enviado: ' + info.response);
        });
    }
}