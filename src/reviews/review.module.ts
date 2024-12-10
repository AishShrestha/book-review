import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./entity/review.entity";
import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { UserModule } from "src/users/user.module";
import { UserService } from "src/users/user.service";
import { User } from "src/users/entity/user.entity";
import { AuthService } from "src/auth/auth.service";
import { AuthModule } from "src/auth/auth.module";


@Module({
    imports: [TypeOrmModule.forFeature([Review]), TypeOrmModule.forFeature([User]), UserModule,AuthModule],
    controllers: [ReviewController],
    providers: [ReviewService, UserService,AuthService],
    exports: []
})

export class ReviewModule {

}