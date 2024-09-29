import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://khoa123:khoa123@cluster0.nmpkk.mongodb.net/nest-mongodb',
    ),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
