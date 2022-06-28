export interface IApartmentFormData {
  location: google.maps.LatLng | null;
  title: string;
  address: string;
  rooms: string;
  ph_number: string;
  price: string;
  place_id: string | null;
  img_path: string;
}

export interface IApartmentFormProps {
  submitForm: (data: IApartmentFormData) => void;
}
