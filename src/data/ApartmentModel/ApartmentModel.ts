export default class ApartmentModel {
    title: string;
    address: string;
    rooms: number;
    price: number;

    constructor(title: string, address: string, rooms: number, price: number) {
        this.title = title;
        this.address = address;
        this.rooms = rooms;
        this.price = price;
    }
}
