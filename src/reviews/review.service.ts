import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "./entity/review.entity";
import { Repository } from "typeorm";
import { CreateReviewDto } from "./dto/create-review-dto";
import { BookService } from "src/books/book.service";
import { isUUID } from "class-validator";
import { UpdateReviewDto } from "./dto/update-review-dto";

@Injectable()
export class ReviewService {

    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
    ) { }

    async create(createReviewDto: CreateReviewDto, userId: string): Promise<Review> {
        const review = this.reviewRepository.create({
            ...createReviewDto,
            user: { id: userId },
            book: { id: createReviewDto.bookId },
        });

        return await this.reviewRepository.save(review);

    }
    async findAll(bookId: string): Promise<Review[]> {
        if (!bookId) {
            throw new Error('Book ID is required.');
        }
        if (!isUUID(bookId)) {
            throw new BadRequestException(`Invalid UUID format: "${bookId}"`);
        }
        const reviews = await this.reviewRepository.find({
            where: {
                book: { id: bookId }
            }
        })

        return reviews;

    }
    async update(updateReviewDto: UpdateReviewDto, id: string, userId: string) {
        const review = await this.reviewRepository.findOne({
            where: {
                id,
                user: { id: userId }
            }
        })
        if (!review) throw new Error(`Review not found`);

        Object.assign(review, updateReviewDto);

        return await this.reviewRepository.save(review);



    }
    async remove(id: string, userId: string): Promise<{ message: string }> {
        const review = await this.reviewRepository.findOne({
            where: {
                id,
                user: { id: userId }
            }
        })
        if (!review) throw new Error(`Review not found`);

        await this.reviewRepository.remove(review);
        return { message: `Review with ID "${id}" has been successfully deleted.` };
    }
}
