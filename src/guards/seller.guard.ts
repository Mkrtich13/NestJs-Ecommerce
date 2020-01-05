import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

Injectable();
export class SellerGuard implements CanActivate {
    constructor() {}

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if(user && user.seller) {
            return true;
        }

        throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
}