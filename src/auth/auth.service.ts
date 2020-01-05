import { UserService } from './../shared/user.service';
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async signPayload(payload: any) {
        return sign(payload, 'secretKey', { expiresIn: '12h' });
    }

    async validateUser(payload: any) {
        return await this.userService.findByPayload(payload);
    }

}
