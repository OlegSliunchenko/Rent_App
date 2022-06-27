import React, { useContext } from 'react';
import { ApartmentListContext } from '../utils/provider';
import { ApartmentContextType } from '../utils/providerTypes';
import { ContainerType } from '../types/types';

export default function ApartmentList(props: ContainerType) {
  const { apartmentList } = useContext(
    ApartmentListContext
  ) as ApartmentContextType;
  return (
    <div>
      <ul>
        {apartmentList.map((obj: any) => (
          <li key={obj.id.toString()} className={props.divStyle}>
            <p><b>Title:</b> {obj.title}</p>
            <p><b>Address:</b><br/> {obj.address}</p>
            <p><b>Rooms:</b> {obj.rooms}</p>
            <p><b>Price:</b> {obj.price}</p>
            <p><b>Phone Number:</b> {obj.ph_number}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
