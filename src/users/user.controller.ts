import { Body, Controller, Get, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user-dto";
import { AuthGuard } from "src/guard/auth.guard";
import { Roles } from "src/decorator/role.decorator";
import { RolesGuard } from "src/guard/role.guard";


@Controller('users')
export class UserController {

    constructor(

        private readonly userService: UserService,
    ) { }
    @UsePipes(ValidationPipe)
    @Post('/register')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Roles('admin')
    @UseGuards(AuthGuard, RolesGuard)
    @Get('/')
    async findAll(@Query('page') page?: number,
        @Query('limit') limit?: number): Promise<{ result: User[], total: number }> {
        return this.userService.findAll(page, limit);
    }
    @UseGuards(AuthGuard)
    @Get('/self')
    async findSelf(@Req() req: Request): Promise<User> {
        const userId = req['user'].id;
        return this.userService.findOne(userId);
    }








}