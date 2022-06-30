import React from "react";
import {ApartmentComponentType} from "../types/types";

export default function ApartmentInfComponent(props: ApartmentComponentType) {
return  <div
            onClick={() => {
                props.setMapCenter({
                    lat: props.apartment!.location.lat(),
                    lng: props.apartment!.location.lng(),
                });
            }}
        >
            <div>
                <button
                    className='close'
                    onClick={() => props.setActiveMarkerId(null)}
                />
                <img
                    src={require(`../${props.apartment!.img_path.slice(4)}`)}
                    style={{width: '100%', height: '200px'}}
                    alt={'img'}
                />
                <br/>
                <ul>
                    <li>
                        <p>
                            <b>Title:</b> {props.apartment!.title}
                        </p>
                        <p>
                            <b>Address:</b>
                            <br/> {props.apartment!.address}
                        </p>
                        <p>
                            <b>Rooms:</b> {props.apartment!.rooms}
                        </p>
                        <p>
                            <b>Price:</b> {props.apartment!.price}
                        </p>
                        <p>
                            <b>Phone Number:</b> {props.apartment!.ph_number}
                        </p>
                    </li>
                </ul>
            </div>
        </div>
}
