import { LoginDTO, RegisterDTO } from './auth.dto';
import { UserService } from './../shared/user.service';
import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @Post('login')
    async login(@Body() userDTO: LoginDTO) {
        return await this.userService.findByLogin(userDTO);
    }

    @Post('register')
    async register(@Body() userDTO: RegisterDTO) {
        return await this.userService.create(userDTO);
    }

}
