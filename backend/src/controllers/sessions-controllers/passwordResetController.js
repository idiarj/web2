// backend/src/controllers/sessions-controllers/passwordResetController.js
import express from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { userModel } from '../../../models/userModel.js'; 

const router = express.Router();

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'joseburgos153@gmail.com',
        pass: 'Jose120511'
    }
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user) {
        return res.status(404).send('Usuario no encontrado');
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    await userModel.saveResetToken(email, resetToken, /* Fecha de expiración */);

    const resetLink = `http://localhost:3000/forgot-password?token=${resetToken}`;
    const mailOptions = {
        from: 'tuCorreo@gmail.com',
        to: 'joseburgos153@gmail.com, jose.30819564@uru.edu',
        subject: 'Reinicio de Contraseña',
        text: `Para reiniciar tu contraseña, por favor sigue este enlace: ${resetLink}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error al enviar el correo');
        }
        res.send('Correo enviado: ' + info.response);
    });
});

export default router;
