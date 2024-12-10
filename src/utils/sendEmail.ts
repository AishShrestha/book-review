import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();


@Injectable()
export class MailerService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAILER_ID,
                pass: process.env.MAILER_PASS,
            },
        });
    }

    async sendMail(options: nodemailer.SendMailOptions): Promise<void> {
        await this.transporter.sendMail(options);
    }
}
