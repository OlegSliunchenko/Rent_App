import React, {useContext, useEffect, useState} from 'react'
import {ApartmentListContext} from "../utils/provider";
import {ApartmentContextType} from "../utils/providerTypes";
import {MarkerClusterer} from "@googlemaps/markerclusterer";

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = useState<google.maps.Marker>();
    const {apartmentList} = useContext(ApartmentListContext) as ApartmentContextType;

    let apartmentInfo: string
    {
        apartmentList.map((item) => {
            return apartmentInfo = `${item.title}<br> 
Address: ${item.address}<br> 
Rooms: ${item.rooms}<br> 
Price: ${item.price}`
        })
    }


    useEffect(() => {
        if (!marker) {
            const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const markers = apartmentList.map((location, i) => {
                const label = labels[i % labels.length];
                setMarker(new google.maps.Marker({
                    position: location.location,
                    label,
                }));

                const markerInfo = new google.maps.InfoWindow({
                    content: `<img src="https://robohash.org/apartment.png"><br> ${apartmentInfo!}`,
                })
                marker!.addListener('click', () => {
                    markerInfo.setContent(label);
                    markerInfo.open({
                        anchor: marker,
                        shouldFocus: true,
                    })
                    setTimeout(() => {
                        markerInfo.close()
                    }, 10000);
                });

                return marker;
            });
            new MarkerClusterer({markers});
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

    return null;
};
export default Marker;