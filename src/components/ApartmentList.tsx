import React, { useContext } from 'react';
import { ApartmentListContext } from '../utils/provider';
import { ApartmentContextType } from '../utils/providerTypes';
import {ApartmentListMapCenter} from '../types/types';
import ApartmentModel from '../data/ApartmentModel/ApartmentModel';

export default function ApartmentList(props: ApartmentListMapCenter) {
  const { apartmentList } = useContext(
    ApartmentListContext,
  ) as ApartmentContextType;
  return (
    <div>
      <ul>
        {apartmentList.map<React.ReactNode>((obj: ApartmentModel) => (
            <a
                key={obj.id.toString()}
                onClick={() => props.handler({lat: obj.location.lat(), lng: obj.location.lng()})}
            >
          <li  className={props.divStyle}>
            <p>
              <b>Title:</b> {obj.title}
            </p>
            <p>
              <b>Address:</b>
              <br /> {obj.address}
            </p>
            <p>
              <b>Rooms:</b> {obj.rooms}
            </p>
            <p>
              <b>Price:</b> {obj.price}
            </p>
            <p>
              <b>Phone Number:</b> {obj.ph_number}
            </p>
          </li>
            </a>
        ))}
      </ul>
    </div>
  );
};
