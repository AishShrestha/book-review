import { Body, Controller, Get, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { UserService } from "./user.service";
import { User } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user-dto";
import { AuthGuard } from "src/guard/auth.guard";
import { Roles } from "src/decorator/role.decorator";
import { RolesGuard } from "src/guard/role.guard";

@ApiTags('Users')
@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('/register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully created' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @UsePipes(ValidationPipe)
    @ApiBody({ type: CreateUserDto })
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get('/')
    @Roles('admin')
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users with pagination (admin only)' })
    @ApiResponse({ status: 200, description: 'List of users retrieved successfully' })
    @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination', example: 1 })
    @ApiQuery({ name: 'limit', required: false, description: 'Number of results per page', example: 10 })
    async findAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number
    ): Promise<{ result: User[], total: number }> {
        return this.userService.findAll(page, limit);
    }

    @Get('/self')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get details of the currently authenticated user' })
    @ApiResponse({ status: 200, description: 'Authenticated user details retrieved successfully' })
    async findSelf(@Req() req: Request): Promise<User> {
        const userId = req['user'].id;
        return this.userService.findOne(userId);
    }
}
