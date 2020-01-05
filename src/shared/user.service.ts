import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { RegisterDTO, LoginDTO } from './../auth/auth.dto';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    private sanitizeUser(user: User) {
        return user.depopulate('password');
    }

    async create(userDTO: RegisterDTO) {
        const { email } = userDTO;

        const user = await this.userModel.findOne({email});

        if(user) {
            throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
        }

        const createdUser = new this.userModel(userDTO);
        await createdUser.save();

        return this.sanitizeUser(createdUser);
    }

    async findByLogin(userDTO: LoginDTO) {
        const { email, password } = userDTO;
        const user = await this.userModel.findOne({email});

        if(!user) {
            throw new HttpException('Incorrect credentials', HttpStatus.UNAUTHORIZED);
        }

        if(password !== '' && await bcrypt.compare(password, user.password)) {
            return {success: true, user: this.sanitizeUser(user)};
        } else {
            throw new HttpException('Incorrect credentials', HttpStatus.UNAUTHORIZED);
        }


    }
}
