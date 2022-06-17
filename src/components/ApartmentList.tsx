import React, {useContext} from 'react';
import {ApartmentListContext} from "../utils/contextList";


export default function ApartmentList(){
    const {apartmentList} = useContext(ApartmentListContext)
        return (
  <div>
      <ul>
          {apartmentList.map((obj) => {
              return (
              <li key={} style={}>
                  <p>{obj.title}</p>
                  <p>{obj.address}</p>
                  <p>{obj.rooms}</p>
                  <p>{obj.price}</p>
              </li>
              );
          }
          )
          }
      </ul>
  </div>
    );
};