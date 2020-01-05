import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSchema } from 'src/models/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {name: 'User',schema: UserSchema},
            ],
        ),
    ],
    providers: [UserService],
    exports: [UserService],
})
export class SharedModule {}
