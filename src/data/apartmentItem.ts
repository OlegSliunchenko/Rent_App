import {AppartmentType} from "../types/types";


export default function ApartmentItem(this: any, props:AppartmentType){
    this.title = props.title;
    this.adress = props.address;
    this.rooms = props.rooms;
    this.price = props.price;
}

// let x = new (ApartmentItem as any)({title: 'ffff', address: 'dsdadsa', rooms: 5, price: 3})
