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
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
      // Initiates Google login
    }

    @Get('google-redirect')
    @UseGuards(AuthGuard("google"))
    googleAuthRedirect(@Req() req) {
        return this.authService.googleLogin(req);
    }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {
    // Initiates Facebook login
  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req: any) {
    const token = await this.authService.generateToken(req.user);
    console.log("Token:",token);
    return { message: 'Facebook login successful', token };
  }
}
