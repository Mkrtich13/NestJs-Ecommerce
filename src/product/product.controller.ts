import { Product } from './../types/product';
import { User } from '../types/user';
import { SellerGuard } from './../guards/seller.guard';
import { ProductService } from './product.service';
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from '../utils/user.decorator';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAll() {
        return await this.productService.getAll();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async create(@Body() product: CreateProductDTO, @UserDecorator() user: User) {
        return await this.productService.create(product, user);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.productService.getById(id);
    }

    @Get('/mine')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async getMine(@UserDecorator() user: User): Promise<Product[]> {
        const { id } = user;
        return await this.productService.getBySeller(id);
    }

    @Get('/seller/:id')
    async getBySeller(@Param('id') id: string): Promise<Product[]> {
        return await this.productService.getBySeller(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async update(@Param('id') id: string, @Body() product: UpdateProductDTO, @UserDecorator() user: User) {
        const { id: userId } = user;
        return await this.productService.update(id, product, userId);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async delete(@Param('id') id: string, @UserDecorator() user: User) {
        const { id: userId } = user;
        return await this.productService.delete(id, userId);
    }
}
