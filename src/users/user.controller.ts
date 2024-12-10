import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { UserService } from "./user.service";
import { User } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "src/guard/auth.guard";
import { Roles } from "src/decorator/role.decorator";
import { RolesGuard } from "src/guard/role.guard";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags('Users')
@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('/register')
    @UsePipes(ValidationPipe)
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get('/')
    @Roles('admin')
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    async findAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number
    ): Promise<{ result: User[], total: number }> {
        return this.userService.findAll(page, limit);
    }

    @Get('/self')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async findSelf(@Req() req: Request): Promise<User> {
        const userId = req['user'].id;
        return this.userService.findOne(userId);
    }

    @Post('/change-password')
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req:any){
        const userId = req['user'].id;
        return this.userService.changePassword(userId, changePasswordDto);
    }
    @Post('/forgot-password')
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto){
        return this.userService.sendForgotPasswordLink(forgotPasswordDto);
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @ApiBearerAuth()
    async update(@Body() updateUserDto: UpdateUserDto,@Param('id') id:string) {

        return this.userService.update(id, updateUserDto);
    }

    @ApiBearerAuth()
    @Roles('admin')
    @UseGuards(AuthGuard, RolesGuard)
    @Delete('/:id')
    async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
      return this.userService.deleteUser(id);
    }
  





}
