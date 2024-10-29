import { Review } from "src/reviews/entity/review.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum Role {
    ADMIN = 'admin',
    USER = 'user'
}

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        length: 255,
        type: 'varchar',
        nullable: false
    })
    username: string;

    @Column({
        unique: true,
        length: 255,
        type: 'varchar',
        nullable: false
    })
    email: string;

    @Column({
        select: false,
        length: 255,
        nullable: false
    })
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];
}