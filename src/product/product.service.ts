import { HttpStatus } from '@nestjs/common';
import { User } from 'src/types/user';
import { Product } from './../types/product';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async getAll(): Promise<Product[]> {
        return await this.productModel.find().populate('owner');
    }

    async getById(id: string): Promise<Product> {
        const product = await this.productModel.findById(id).populate('owner');

        if(!product) {
            throw new HttpException('Product does not exist', HttpStatus.NO_CONTENT);
        }

        return product;
    }

    async getBySeller(userId: string): Promise<Product[]> {
        const products = await this.productModel.find({owner: userId}).populate('owner');

        if(products.length===0) {
            throw new HttpException('Products not found', HttpStatus.NO_CONTENT);
        }

        return products;
    }

    async create(productDTO: CreateProductDTO, user: User): Promise<Product> {
        const product = await this.productModel.create({ ...productDTO, owner: user });
        await product.save();
        return product.populate('owner');
    }

    async update(id: string, productDTO: UpdateProductDTO, userId: string): Promise<Product> {
        const product = await this.productModel.findById(id).populate('owner');

        if(userId !== product.owner.toString()) {
            throw new HttpException('You do not own this product', HttpStatus.UNAUTHORIZED);
        }

        await product.update(productDTO);

        return await this.productModel.findById(id).populate('owner');
    }

    async delete(id: string, userId: string): Promise<Product> {
        const product = await this.productModel.findById(id).populate('owner');

        if(userId !== product.owner.toString()) {
            throw new HttpException('You do not own this product', HttpStatus.UNAUTHORIZED);
        }

        await product.remove();

        return product.populate('owner');
    }
}
