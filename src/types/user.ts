import { Document } from 'mongoose';

interface Address {
    addr1: string;
    addr2: string;
    city: string;
    state: string;
    country: string;
    zip: number;
}

export interface User extends Document {
    name: string;
    readonly password: string;
    readonly email: string;
    seller?: boolean;
    address?: Address;
    created?: Date;
}
