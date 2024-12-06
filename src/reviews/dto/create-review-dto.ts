import { IsString, IsNotEmpty, IsInt, Min, Max, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
    @ApiProperty({
        description: 'The content of the review',
        example: 'This book was fantastic! Highly recommend.',
    })
    @IsString()
    @IsNotEmpty({ message: 'Content should not be empty' })
    content: string;

    @ApiProperty({
        description: 'The rating given to the book (1 to 5)',
        example: 5,
        minimum: 1,
        maximum: 5,
    })
    @IsInt({ message: 'Rating must be an integer' })
    @Min(1, { message: 'Rating must be at least 1' })
    @Max(5, { message: 'Rating cannot be more than 5' })
    rating: number;

    @ApiProperty({
        description: 'The UUID of the book being reviewed',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID('4', { message: 'Invalid UUID format for bookId' })
    bookId: string;
}
