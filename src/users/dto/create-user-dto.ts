import { IsNotEmpty, IsString, IsEmail, IsEnum } from 'class-validator';
import { Role } from '../entity/user.entity';

export class CreateUserDto {

    @IsNotEmpty({ message: 'Username is required' })
    @IsString({ message: 'Username must be a string' })
    username: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    password: string;

    @IsNotEmpty({ message: 'Role is required' })
    @IsEnum(Role, { message: 'Role must be a valid enum value' })
    role: Role;
}
