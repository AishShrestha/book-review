import { Injectable, Req } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private readonly saltRounds = 10;

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
        const { username, email, password, role } = createUserDto;

        const hashedPassword = await this.hashPassword(password);

        const newUser = this.userRepository.create({
            username,
            email,
            password: hashedPassword,
            role,
        });

        const savedUser = await this.userRepository.save(newUser);

        const { password: _, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;

    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async findOne(id: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: { id },
        });
    }
    async findAll(page: number = 1, limit: number = 5): Promise<{ result: User[], total: number }> {
        const offset = (page - 1) * limit;


        const [result, total] = await this.userRepository.findAndCount({
            skip: offset,
            take: limit,
        });
        return {
            result,
            total
        }
    }


}
