import { IsString, isString, MinLength } from "class-validator";

export class ChangePasswordDto{

    @IsString()
    currentPassword: string;

    @IsString()
    @MinLength(8,{message: 'Password must be at least 8 characters long'})
    newPassword: string;
} 