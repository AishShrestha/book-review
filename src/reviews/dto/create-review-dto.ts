import { IsString, IsNotEmpty, IsInt, Min, Max, IsUUID } from 'class-validator';

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty({ message: 'Content should not be empty' })
    content: string;

    @IsInt({ message: 'Rating must be an integer' })
    @Min(1, { message: 'Rating must be at least 1' })
    @Max(5, { message: 'Rating cannot be more than 5' })
    rating: number;

    @IsUUID('4', { message: 'Invalid UUID format for bookId' })
    bookId: string;
}
