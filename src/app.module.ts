import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './config/typeorm.migration.config';
import { UserModule } from './users/user.module';
import { BookModule } from './books/book.module';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './reviews/review.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    BookModule,
    AuthModule,
    ReviewModule

  ],
})
export class AppModule { }