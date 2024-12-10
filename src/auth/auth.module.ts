import { forwardRef, Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserModule } from "src/users/user.module";
import { jwtConstants } from "./constants";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "src/users/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entity/user.entity";
import { FacebookStrategy } from "./strategies/facebook.stategy";
import { GoogleStrategy } from "./strategies/google.strategy";
import { MailerService } from "src/utils/sendEmail";


@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
        TypeOrmModule.forFeature([User])],

    controllers: [AuthController],
    providers: [AuthService, UserService, FacebookStrategy, GoogleStrategy,MailerService],
    exports: [AuthService],

})
export class AuthModule { }