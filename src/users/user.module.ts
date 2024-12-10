import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { MailerService } from "src/utils/sendEmail";
import { MailerModule } from '@nestjs-modules/mailer';

;

@Module({
    imports: [TypeOrmModule.forFeature([User]),forwardRef(() => AuthModule),MailerModule],
    controllers: [UserController],
    providers: [UserService,AuthService,MailerService],
    exports: [UserService,MailerService],
})
export class UserModule { } 