import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    logging: true,
    migrations: [join(__dirname, '..', 'migrations', '*.ts')],


};
const dataSource = new DataSource(dataSourceOptions);
console.log(__dirname)
export default dataSource;
