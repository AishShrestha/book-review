import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user-dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'User logged in successfully. Returns a JWT token.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid username or password.' })
    @ApiBody({ type: LoginUserDto })
    async login(@Body() loginUserDto: LoginUserDto): Promise<string> {
        return await this.authService.login(loginUserDto);
    }

    @Get("/facebook")
    @UseGuards(AuthGuard("facebook"))
    async facebookLogin(): Promise<any> {
        return HttpStatus.OK;
    }

    @Get("/facebook/redirect")
    @UseGuards(AuthGuard("facebook"))
    async facebookLoginRedirect(@Req() req: Request): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            // data: req.user,
        };
    }
    @Get()
    @UseGuards(AuthGuard("google"))
    async googleAuth(@Req() req) { }

    @Get('google-redirect')
    @UseGuards(AuthGuard("google"))
    googleAuthRedirect(@Req() req) {
        return this.authService.googleLogin(req);
    }
}
