import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserMiddleware1 } from './user.middleware';
import { UserSettings, UserSettingsSchema } from 'src/schemas/userSettings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserSettings.name,
        schema: UserSettingsSchema,
      },
    ]),    
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware1).forRoutes(
      {
        path: 'user/:id',
        method: RequestMethod.GET,
      },
      {
        path: 'user/:id',
        method: RequestMethod.PATCH,
      },
    );
  }
}
