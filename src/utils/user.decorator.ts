import { User } from 'src/types/user';
import { createParamDecorator } from '@nestjs/common';

export const UserDecorator = createParamDecorator((data, req): User => {
    return req.user;
});