import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}

export class RegisterDTO {
    @IsEmail()
    email: string;
    name: string;
    @IsNotEmpty()
    password: string;
    seller?: boolean;
}