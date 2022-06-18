export interface IApartmentFormData {
    title: string;
    address: string;
    rooms: string;
    price: string;
}
export interface IApartmentFormProps {
    submitForm: (data: IApartmentFormData) => void;
}
