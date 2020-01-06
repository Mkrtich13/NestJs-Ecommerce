import { User } from 'src/types/user';
import { Product } from './../types/product';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async getAll(): Promise<Product[]> {
        return await this.productModel.find().populate('owner');
    }

    async getById(id: string): Promise<Product> {
        return await this.productModel.findById(id).populate('owner');
    }

    async getBySeller(userId: string): Promise<Product[]> {
        return await this.productModel.find({owner: userId}).populate('owner');
    }

    async create(productDTO: CreateProductDTO, user: User): Promise<Product> {
        const product = await this.productModel.create({ ...productDTO, owner: user });
        await product.save();
        return product.populate('owner');
    }

    async update(id: string, productDTO: UpdateProductDTO): Promise<Product> {
        const product = await this.productModel.findById(id);
        await product.update(productDTO);

        return product.populate('owner');
    }

    async delete(id: string): Promise<Product> {
        const product = await this.productModel.findById(id);
        await product.remove();

        return product.populate('owner');
    }
}
