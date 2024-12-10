import { IsNotEmpty, IsString, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entity/user.entity';

export class CreateUserDto {

    @ApiProperty({
        description: 'The username of the new user',
        example: 'johndoe',
    })
    @IsNotEmpty({ message: 'Username is required' })
    @IsString({ message: 'Username must be a string' })
    username: string;

    @ApiProperty({
        description: 'The email address of the new user',
        example: 'johndoe@example.com',
    })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @ApiProperty({
        description: 'The password for the new user account',
        example: 'password123',
    })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    password: string;

    @ApiProperty({
        description: 'The role of the user',
        example: Role.ADMIN,
        enum: Role,
    })
    @IsNotEmpty({ message: 'Role is required' })
    @IsEnum(Role, { message: 'Role must be a valid enum value' })
    role: Role;
}
