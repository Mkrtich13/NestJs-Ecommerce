import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { UserService } from './../shared/user.service';
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/types/user';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    tempAuth() {
        return {auth: 'it work'};
    }

    @Post('login')
    async login(@Body() userDTO: LoginDTO): Promise<{user: User, token: string}> {
        const user = await this.userService.findByLogin(userDTO);
        const payload = {
            email: user.email,
            seller: user.seller,
        };

        const token = await this.authService.signPayload(payload);

        return { user, token };
    }

    @Post('register')
    async register(@Body() userDTO: RegisterDTO): Promise<{user: User, token: string}> {
        const user = await this.userService.create(userDTO);
        const payload = {
            email: user.email,
            seller: user.seller,
        };

        const token = await this.authService.signPayload(payload);

        return { user, token };
    }

}
