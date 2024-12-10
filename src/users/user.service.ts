import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { AuthService } from 'src/auth/auth.service';
import { MailerService } from 'src/utils/sendEmail';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    private readonly saltRounds = 10;

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly authService: AuthService,
        private readonly mailerService: MailerService,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
        const { username, email, password, role } = createUserDto;

        const hashedPassword = await this.hashPassword(password);

        const newUser = this.userRepository.create({
            username,
            email,
            password: hashedPassword,
            role,
        });

        const savedUser = await this.userRepository.save(newUser);

        const { password: _, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;

    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async findOne(id: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: { id },
        });
    }
    async findAll(page: number = 1, limit: number = 5): Promise<{ result: User[], total: number }> {
        const offset = (page - 1) * limit;


        const [result, total] = await this.userRepository.findAndCount({
            skip: offset,
            take: limit,
        });
        return {
            result,
            total
        }
    }
    async changePassword(userId: string, changePasswordDto: ChangePasswordDto):Promise<{message: string}>{
        const {currentPassword, newPassword} = changePasswordDto;

        const user = await this.userRepository.findOne({
            where: {id: userId},
            select: {
                password: true,
                id: true
            }
        })

        if(!user){
            throw new BadRequestException('User not found');
        }
        const isPasswordValid = await this.comparePassword(currentPassword,user.password);
        
        if(!isPasswordValid){
            throw new BadRequestException('Invalid password');
        }
        const hashedPassword = await this.hashPassword(newPassword);
        console.log(hashedPassword);

        user.password = hashedPassword;
        await this.userRepository.save(user);


        return {message: 'Password changed successfully'};  

    }
    async comparePassword(PlainPasword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(PlainPasword, hashedPassword);
    }

    async sendForgotPasswordLink(forgotPasswordDto:ForgotPasswordDto){
        const {email} = forgotPasswordDto;
        const user = await this.userRepository.findOne({
            where: {email},
            select: {
                id: true,
                username:true,
            }
        });
        if(!user){
            throw new BadRequestException('User not found');
        }
        const payload ={id: user.id,username:user.username};
        const resetToken = await this.authService.generateToken(payload);

    const resetLink = `https://localhost:3000/user/reset-password?token=${resetToken}`;

    await this.mailerService.sendMail({
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
        html: `<p>You requested a password reset. Click the link below to reset your password:</p>
               <a href="${resetLink}">Reset Password</a>`,
      });

      return { message: 'Password reset link sent successfully' };
  


    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
        });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        Object.assign(user, updateUserDto);

        return this.userRepository.save(user);
    }

    async deleteUser(id: string): Promise<{ message: string }> {
        const user = await this.userRepository.findOne({
            where:{id}
        })
        if(!user){
            throw new BadRequestException('User not found');
        }
        await this.userRepository.delete(id);
        return { message: 'User deleted successfully' };
    }




}
