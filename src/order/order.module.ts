import { Module } from '@nestjs/common';
import { OrderService } from './order.service';

@Module({
  providers: [OrderService],
})
export class OrderModule {}
