import React, {useContext} from 'react';
import {ApartmentListContext} from "../utils/provider";
import {ApartmentContextType} from "../utils/providerTypes";


export default function ApartmentList() {
    const {apartmentList} = useContext(ApartmentListContext) as ApartmentContextType;
    return (
        <div>
            <ul>
                {apartmentList.map((obj: any) => <li key={obj.id.toString()}>
                        <p>{obj.title}</p>
                        <p>{obj.address}</p>
                        <p>{obj.rooms}</p>
                        <p>{obj.price}</p>
                    </li>
                )}
            </ul>
        </div>
    );
};