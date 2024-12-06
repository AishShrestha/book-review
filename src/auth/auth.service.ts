import { Get, HttpStatus, Injectable, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user-dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entity/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginUserDto: LoginUserDto): Promise<string> {
        const { username, password } = loginUserDto;

        const user = await this.userRepository.findOne({ where: { username }, select: ['username', 'id', 'password'] });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        // console.log(user);
        // console.log(password, user.password);
        const isPasswordValid = await this.validatePassword(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { id: user.id, username: user.username };
        const token = await this.generateToken(payload);

        return token;
    }

    async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    async generateToken(payload: { id: string, username: string }): Promise<string> {
        return this.jwtService.signAsync(payload);
    }
    googleLogin(req) {
        if (!req.user) {
            return 'No user from google';
        }

        return {
            message: 'User information from google',
            user: req.user,
        };
    }

}
