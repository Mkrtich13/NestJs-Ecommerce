import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey',
        });
    }

    async validate(payload: any, done: VerifiedCallback): Promise<any> {
        const user = this.authService.validateUser(payload);
        if(!user) {
            return done(new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED), false);
        }

        return done(null, user, payload.iat);
    }
}
