import { v4 as uuidv4 } from 'uuid';

export default class ApartmentModel {
    title: string;
    address: string;
    rooms: number;
    price: number;
    id: string;

    constructor(title: string, address: string, rooms: number, price: number) {
        this.title = title;
        this.address = address;
        this.rooms = rooms;
        this.price = price;
        this.id = uuidv4();
    }
}
