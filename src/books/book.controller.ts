import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book-dto";
import { Book } from "./entity/book.entity";
import { Roles } from "src/decorator/role.decorator";
import { AuthGuard } from "src/guard/auth.guard";
import { RolesGuard } from "src/guard/role.guard";
import { UpdateBookDto } from "./dto/update-book-dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Books')
@Controller('books')
export class BookController {

    constructor(private readonly bookService: BookService) { }

    @Post('/')
    @Roles('admin')
    @UseGuards(AuthGuard, RolesGuard)
    @UsePipes(ValidationPipe)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add a new book' })
    @ApiResponse({ status: 201, description: 'Book created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
    @ApiBody({ type: CreateBookDto })
    async addBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return await this.bookService.create(createBookDto);
    }

    @Patch('/update/:id')
    @Roles('admin')
    @UseGuards(AuthGuard, RolesGuard)
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Update an existing book' })
    @ApiResponse({ status: 200, description: 'Book updated successfully.' })
    @ApiResponse({ status: 404, description: 'Book not found.' })
    @ApiParam({ name: 'id', description: 'ID of the book to update' })
    @ApiBody({ type: UpdateBookDto })
    async updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
        return await this.bookService.update(id, updateBookDto);
    }
    @Get('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get a list of books with optional filters' })
    @ApiResponse({ status: 200, description: 'Books retrieved successfully.' })
    @ApiQuery({ name: 'genre', required: false, description: 'Filter by genre' })
    @ApiQuery({ name: 'author', required: false, description: 'Filter by author' })
    @ApiQuery({ name: 'title', required: false, description: 'Filter by title' })
    @ApiQuery({ name: 'page', required: false, description: 'Pagination page number', type: Number })
    @ApiQuery({ name: 'limit', required: false, description: 'Pagination limit', type: Number })
    async getBooks(
        @Query('genre') genre?: string,
        @Query('author') author?: string,
        @Query('title') title?: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number
    ): Promise<{ books: Book[], total: number }> {
        return await this.bookService.findAll({ title, genre, author }, page, limit);
    }

    @Get('/detail/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get details of a specific book' })
    @ApiResponse({ status: 200, description: 'Book details retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Book not found.' })
    @ApiParam({ name: 'id', description: 'ID of the book to retrieve details' })
    async getBookDetail(@Param('id') id: string): Promise<Book> {
        return await this.bookService.findOne(id);
    }

    @Delete('/delete/:id')
    @Roles('admin')
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a book by ID' })
    @ApiResponse({ status: 200, description: 'Book deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Book not found.' })
    @ApiParam({ name: 'id', description: 'ID of the book to delete' })
    async deleteBook(@Param('id') id: string): Promise<{ message: string }> {
        return await this.bookService.remove(id);

    }


}