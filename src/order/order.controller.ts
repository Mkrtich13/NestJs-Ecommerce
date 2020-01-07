import { CreateOrderDTO } from './order.dto';
import { User } from '../types/user';
import { AuthGuard } from '@nestjs/passport';
import { OrderService } from './order.service';
import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { UserDecorator } from '../utils/user.decorator';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async listOrder(@UserDecorator() { id: userId }: User) {
        return await this.orderService.listOrderByUser(userId);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createOrder(@UserDecorator() { id: userId }: User, @Body() orderDTO: CreateOrderDTO) {
        return await this.orderService.createOrder(userId, orderDTO);
    }
}
