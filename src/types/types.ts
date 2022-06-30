import React from 'react';
import ApartmentModel from "../data/ApartmentModel/ApartmentModel";

export interface ContainerType {
    divStyle?: string;
    children?: React.ReactNode;
}

export interface ApartmentComponentType {
    apartment: ApartmentModel | undefined;
    setMapCenter: (data: ApartmentLatLng) => void;
    setActiveMarkerId: (data: null) => void;
}

export interface ApartmentListMapCenter extends ContainerType {
    handler: (data: ApartmentLatLng) => void;
}

export interface ApartmentLatLng {
    lat: number;
    lng: number;
};
export type ButtonType = {
    divStyle: string;
    name: string;
    handler: () => void;
};
