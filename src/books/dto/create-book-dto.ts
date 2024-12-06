import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookDto {

    @ApiProperty({
        description: 'The title of the book',
        example: 'The Great Gatsby',
    })
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    title: string;

    @ApiProperty({
        description: 'The author of the book',
        example: 'F. Scott Fitzgerald',
    })
    @IsNotEmpty({ message: 'Author is required' })
    @IsString({ message: 'Author must be a string' })
    author: string;

    @ApiProperty({
        description: 'The genre of the book',
        example: 'Fiction',
    })
    @IsNotEmpty({ message: 'Genre is required' })
    @IsString({ message: 'Genre must be a string' })
    genre: string;

    @ApiPropertyOptional({
        description: 'The published date of the book in YYYY-MM-DD format',
        example: '1925-04-10',
        type: Date,
    })
    @IsOptional()
    @IsDate({ message: 'Published date must be a valid date format (YYYY-MM-DD)' })
    publishedAt: Date;

    @ApiProperty({
        description: 'A brief summary of the book',
        example: 'A story about the young and mysterious millionaire Jay Gatsby and his quixotic passion for Daisy Buchanan.',
    })
    @IsNotEmpty({ message: 'Summary is required' })
    @IsString({ message: 'Summary must be a string' })
    summary: string;
}
