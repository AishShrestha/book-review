import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./entity/book.entity";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { UserModule } from "src/users/user.module";
import { UserService } from "src/users/user.service";
import { User } from "src/users/entity/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Book]), TypeOrmModule.forFeature([User]), UserModule],
    controllers: [BookController],
    providers: [BookService, UserService],
    exports: []
})
export class BookModule {

}