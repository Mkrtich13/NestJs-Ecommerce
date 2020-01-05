import { LoggingInterceptor } from './logging.interceptor';
import { HttpExeptionFilter } from './http-exeption.filter';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSchema } from '../models/user.schema';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {name: 'User',schema: UserSchema},
            ],
        ),
    ],
    providers: [
        UserService,
        {
            provide: APP_FILTER,
            useClass: HttpExeptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        }
    ],
    exports: [UserService],
})
export class SharedModule {}
