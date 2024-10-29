// import { ConfigModule, ConfigService } from "@nestjs/config"
// import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"
// import { join } from "path"

// export default class TypeOrmConfig {
//   static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {

//     return {
//       type: 'postgres',
//       host: configService.get('DB_HOST'),
//       port: configService.get('DB_PORT'),
//       username: configService.get('DB_USERNAME'),
//       password: configService.get<string>('DB_PASSWORD')!,
//       database: configService.get('DB_NAME'),
//       entities: [join(__dirname, '**', '*.entity.{ts,js}')],
//       logging: true,
//       migrations: [join(__dirname, 'migrations', '*.ts')],
//     }
//   }
// }

// export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
//   imports: [ConfigModule],
//   useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
//   inject: [ConfigService]
// }


