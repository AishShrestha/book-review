import { Book } from "src/books/entity/book.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    content: string;
    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    rating: number;

    @ManyToOne(() => User, (user) => user.reviews)
    user: User;

    @ManyToOne(() => Book, (book) => book.reviews)
    book: Book
}