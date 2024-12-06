import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { ReviewService } from "./review.service";
import { Review } from "./entity/review.entity";
import { CreateReviewDto } from "./dto/create-review-dto";
import { AuthGuard } from "src/guard/auth.guard";
import { UpdateReviewDto } from "./dto/update-review-dto";

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {

    constructor(
        private readonly reviewService: ReviewService
    ) { }

    @Post('/')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add a new review' })
    @ApiResponse({ status: 201, description: 'Review successfully created' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @ApiBody({ type: CreateReviewDto })
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    async addReview(@Body() createReviewDto: CreateReviewDto, @Req() req: Request): Promise<Review> {
        const userId = req['user'].id;
        return await this.reviewService.create(createReviewDto, userId);
    }

    @Get('/:bookId')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all reviews for a specific book' })
    @ApiResponse({ status: 200, description: 'List of reviews retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Book not found' })
    @ApiParam({ name: 'bookId', description: 'The ID of the book to retrieve reviews for' })
    @UseGuards(AuthGuard)
    async getAllReviews(@Param('bookId') bookId: string): Promise<Review[]> {
        return await this.reviewService.findAll(bookId);
    }

    @Patch('/update/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update an existing review' })
    @ApiResponse({ status: 200, description: 'Review successfully updated' })
    @ApiResponse({ status: 404, description: 'Review not found' })
    @ApiParam({ name: 'id', description: 'The ID of the review to update' })
    @ApiBody({ type: UpdateReviewDto })
    @UseGuards(AuthGuard)
    async updateReview(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto, @Req() req: Request): Promise<Review> {
        const userId = req['user'].id;
        return await this.reviewService.update(updateReviewDto, id, userId);
    }

    @Delete('/delete/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a review' })
    @ApiResponse({ status: 200, description: 'Review successfully deleted' })
    @ApiResponse({ status: 404, description: 'Review not found' })
    @ApiParam({ name: 'id', description: 'The ID of the review to delete' })
    @UseGuards(AuthGuard)
    async deleteReview(@Param('id') id: string, @Req() req: Request): Promise<{ message: string }> {
        const userId = req['user'].id;
        return await this.reviewService.remove(id, userId);
    }
}
