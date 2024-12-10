import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: "sandip.axios@gmail.com",
                pass: "khgj gndr xclz wsta",
            },
        });
    }

    async sendMail(options: nodemailer.SendMailOptions): Promise<void> {
        await this.transporter.sendMail(options);
    }
}
