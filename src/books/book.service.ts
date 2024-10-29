import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "./entity/book.entity";
import { Repository } from "typeorm";
import { CreateBookDto } from "./dto/create-book-dto";
import { UpdateBookDto } from "./dto/update-book-dto";
import { isUUID } from "class-validator";


@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) { }


    async create(createBookDto: CreateBookDto): Promise<Book> {

        // if (!this.isValidBook(createBookDto)) {
        //     throw new ConflictException('This book already exists in the database.');

        // }
        const book = await this.bookRepository.save(createBookDto);
        console.log(book);
        return book;
    }
    // async isValidBook(createBookDto: CreateBookDto): Promise<boolean> {
    //     const { title } = createBookDto;

    //     const existingBook = await this.bookRepository.findOne({ where: { title } });
    //     if (existingBook) {
    //         return false;
    //     }
    //     return true;
    // }

    async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {

        const book = await this.bookRepository.findOne({
            where: { id },
        })
        if (!book) {
            throw new NotFoundException(`Book with ID "${id}" not found.`);
        }

        Object.assign(book, updateBookDto);

        return this.bookRepository.save(book);

    }

    async findAll(filter: { title?: string, author?: string, genre?: string }, page: number = 1, limit: number = 5): Promise<{ books: Book[]; total: number }> {
        console.log(filter);
        const query = this.bookRepository.createQueryBuilder('book');

        if (filter.title) {
            query.andWhere('LOWER(book.title) LIKE LOWER(:title)', { title: `%${filter.title.toLowerCase()}%` });
        }
        if (filter.author) {
            query.andWhere('LOWER(book.author) LIKE LOWER(:author)', { author: `%${filter.author.toLowerCase()}%` });
        }
        if (filter.genre) {
            query.andWhere('LOWER(book.genre) LIKE LOWER(:genre)', { genre: `%${filter.genre.toLowerCase()}%` });
        }

        const offset = (page - 1) * limit;
        query.skip(offset).take(limit);


        const [books, total] = await query.getManyAndCount();

        return {
            books,
            total
        };
    }

    async findOne(id: string): Promise<Book> {
        this.isUUID(id);
        const book = await this.bookRepository.findOne({
            where: { id },
        })
        if (!book) {
            throw new NotFoundException(`Book with ID "${id}" not found.`);
        }

        return book;

    }

    async remove(id: string): Promise<{ message: string }> {
        this.isUUID(id);
        const book = await this.bookRepository.findOne({
            where: { id },
        })
        if (!book) {
            throw new NotFoundException(`Book with ID "${id}" not found.`);
        }
        await this.bookRepository.remove(book);

        return { message: `Book with ID "${id}" has been successfully deleted.` };;

    }
    isUUID(id: string): void {
        if (!isUUID(id)) {
            throw new BadRequestException(`Invalid UUID format: "${id}"`);
        }
    }
}
