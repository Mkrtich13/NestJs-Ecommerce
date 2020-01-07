import { CreateOrderDTO } from './order.dto';
import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from '../types/order';

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) {}

    async listOrderByUser(userId: string): Promise<Order[]> {
        const orders = await this.orderModel
            .find({ owner: userId })
            .populate('owner')
            .populate('products.product');

        if(!orders) {
            throw new HttpException('No orders found', HttpStatus.NO_CONTENT);
        }

        return orders;
    }

    async createOrder(userId: string, orderDTO: CreateOrderDTO): Promise<Order> {
        const createOrder = {
            owner: userId,
            products: orderDTO.products,
        };

        const { _id } = await this.orderModel.create(createOrder);

        let order = await this.orderModel
            .findById(_id)
            .populate('owner')
            .populate('products.product');

        const totalPrice = order.products.reduce((acc, product: any) => {
            const price = product.quantity * product.product.price;
            return acc + price;
        }, 0);

        await order.update({totalPrice});

        order = await this.orderModel
            .findById(_id)
            .populate('owner')
            .populate('products.product');

        return order;
    }
}
