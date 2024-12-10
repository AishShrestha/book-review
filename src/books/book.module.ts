import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./entity/book.entity";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { UserModule } from "src/users/user.module";
import { UserService } from "src/users/user.service";
import { User } from "src/users/entity/user.entity";
import { AuthService } from "src/auth/auth.service";
import { MailerService } from "@nestjs-modules/mailer";

@Module({
    imports: [TypeOrmModule.forFeature([Book]), TypeOrmModule.forFeature([User]), UserModule],
    controllers: [BookController],
    providers: [BookService, UserService,AuthService],
    exports: [BookService]
})
export class BookModule {

}