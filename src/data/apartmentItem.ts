import {ApartmentType} from "../types/types";


export default function ApartmentItem(this: any, props:ApartmentType){
    this.title = props.title;
    this.adress = props.address;
    this.rooms = props.rooms;
    this.price = props.price;
}


