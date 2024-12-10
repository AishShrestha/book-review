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
    async addBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return await this.bookService.create(createBookDto);
    }

    @Patch('/update/:id')
    @Roles('admin')
    @UseGuards(AuthGuard, RolesGuard)
    @UsePipes(ValidationPipe)
    async updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
        return await this.bookService.update(id, updateBookDto);
    }
    @Get('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
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
    async getBookDetail(@Param('id') id: string): Promise<Book> {
        return await this.bookService.findOne(id);
    }

    @Delete('/delete/:id')
    @Roles('admin')
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    async deleteBook(@Param('id') id: string): Promise<{ message: string }> {
        return await this.bookService.remove(id);

    }


}