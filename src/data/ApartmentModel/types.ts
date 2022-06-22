export interface IApartmentFormData {
    location: google.maps.LatLng | null;
    title: string;
    address: string;
    rooms: string;
    price: string;
    place_id: string | null;
}
export interface IApartmentFormProps {
    submitForm: (data: IApartmentFormData) => void;
}
