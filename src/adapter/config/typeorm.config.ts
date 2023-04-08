import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5411,
  username: 'youngseok',
  password: 'youngseok',
  database: 'ys-study',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
}