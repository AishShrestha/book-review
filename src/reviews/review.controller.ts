import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { Review } from "./entity/review.entity";
import { CreateReviewDto } from "./dto/create-review-dto";
import { AuthGuard } from "src/guard/auth.guard";
import { UpdateReviewDto } from "./dto/update-review-dto";

@Controller('reviews')
export class ReviewController {

    constructor(
        private readonly reviewService: ReviewService
    ) { }

    @Post('/')
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    async addReview(@Body() createReviewDto: CreateReviewDto, @Req() req: Request): Promise<Review> {
        const userId = req['user'].id;
        return await this.reviewService.create(createReviewDto, userId);
    }

    @Get('/:bookId')
    @UseGuards(AuthGuard)
    async getAllReviews(@Param('bookId') bookId: string): Promise<Review[]> {
        return await this.reviewService.findAll(bookId);

    }
    @Patch('/update/:id')
    @UseGuards(AuthGuard)
    async updateReview(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto, @Req() req: string): Promise<Review> {
        const userId = req['user'].id;
        return await this.reviewService.update(updateReviewDto, id, userId);
    }

    @Delete('/delete/:id')
    @UseGuards(AuthGuard)
    async deleteReview(@Param('id') id: string, @Req() req: string): Promise<{ message: string }> {
        const userId = req['user'].id;
        return await this.reviewService.remove(id, userId);

    }
}