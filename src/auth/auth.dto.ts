import { IsEmail } from 'class-validator';

export interface LoginDTO {
    email: string;
    password: string;
}

export class RegisterDTO {
    @IsEmail()
    email: string;
    name: string;
    password: string;
    seller?: boolean;
}