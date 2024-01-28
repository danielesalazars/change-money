import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoCambioModule } from './tipo-cambio/tipo-cambio.module';
import { CalculateModule } from './calculate/calculate.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DATABASE,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadEntities: true,
      synchronize: Boolean(process.env.SYNCRONIZE),
    }),
    TipoCambioModule,
    CalculateModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
