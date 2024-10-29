import { Review } from "src/reviews/entity/review.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { date } from "zod";

@Entity()
export class Book {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
        nullable: false
    })
    title: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    author: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    genre: string;

    @Column({
        type: 'date',
        nullable: true
    })
    publishedAt: Date;

    @Column({
        type: 'varchar',
        length: 500
    })
    summary: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(() => Review, (review) => review.book)
    reviews: Review[];

}