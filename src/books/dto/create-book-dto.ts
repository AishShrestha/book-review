import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookDto {

    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    title: string;

    @IsNotEmpty({ message: 'Author is required' })
    @IsString({ message: 'Author must be a string' })
    author: string;

    @IsNotEmpty({ message: 'Genre is required' })
    @IsString({ message: 'Genre must be a string' })
    genre: string;

    @IsOptional()
    @IsDate({ message: 'Published date must be a valid date format (YYYY-MM-DD)' })
    publishedAt: Date;

    @IsNotEmpty({ message: 'Summary is required' })
    @IsString({ message: 'Summary must be a string' })
    summary: string;
}
