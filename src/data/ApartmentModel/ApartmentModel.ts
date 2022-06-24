import { v4 as uuidv4 } from 'uuid';

export default class ApartmentModel {
  title: string;
  address: string;
  rooms: number;
  price: number;
  ph_number: string;
  id: string;
  place_id: string;
  location: google.maps.LatLng;

  constructor(
    title: string,
    address: string,
    rooms: number,
    price: number,
    phone_number: string,
    place_id: string,
    location: google.maps.LatLng
  ) {
    this.title = title;
    this.address = address;
    this.rooms = rooms;
    this.price = price;
    this.ph_number = phone_number;
    this.place_id = place_id;
    this.id = uuidv4();
    this.location = location;
  }
}
