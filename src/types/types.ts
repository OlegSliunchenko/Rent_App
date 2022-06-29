import React from 'react';

export type ContainerType = {
  divStyle?: string;
  children?: React.ReactNode;
}
export interface ApartmentListMapCenter extends ContainerType {
  handler: (data: ApartmentLatLng) => void;
}export type ApartmentLatLng = {
  lat:number,
  lng:number,
}
export type ButtonType = {
  divStyle: string;
  name: string;
  handler: () => void;
}
