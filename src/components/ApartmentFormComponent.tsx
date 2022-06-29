import React, {useState} from 'react';
import axios from "axios";
import '../css/form.css';
import {IApartmentFormData, IApartmentFormProps,} from '../data/ApartmentModel/types';


const ApartmentFormComponent: React.FC<IApartmentFormProps> = ({submitForm}) => {
    const [filesState, setFiles] = useState(null)

    const [formValues, setValue] = useState<IApartmentFormData>({
        location: null,
        title: '',
        address: '',
        rooms: '',
        price: '',
        ph_number: '',
        place_id: null,
        img_path: '',
    });

    const isFormValid = () => {
        const isNotEmpty =
            formValues.title.trim() &&
            formValues.address.trim() &&
            formValues.rooms.trim() &&
            formValues.price.trim() &&
            formValues.ph_number;

        const isValidPrice = !isNaN(parseInt(formValues.price));
        const isValidRooms = !isNaN(parseInt(formValues.rooms));
        const isValidPhoneNumber = !isNaN(parseInt(formValues.ph_number));

        return isNotEmpty && isValidRooms && isValidPrice && isValidPhoneNumber;
    }

    const getUploadedImgPath = async (): Promise<string> => {
        const formData = new FormData();
        formData.append('file', filesState!);
        const {data: {path}} = await axios.post('http://127.0.0.1:8000/upload', formData);
        return path;
    }

    const getFullAddress = async (): Promise<[string, google.maps.LatLng, string]> => {
        const geocoder = new google.maps.Geocoder();
        const {results: [{formatted_address, place_id, geometry: {location}}]} = await geocoder
            .geocode(
                {address: formValues.address});

        return [place_id, location, formatted_address];
    }

    const onSubmit = async (
        event: React.FormEvent<HTMLInputElement>
    ): Promise<Promise<google.maps.GeocoderResponse> | void> => {
        event.preventDefault();
        if (isFormValid()) {
            try {
                const imgPath = await getUploadedImgPath();
                const [place_id, location, formatted_address] = await getFullAddress()
               return submitForm({
                    location: location,
                    title: formValues.title,
                    address: formatted_address,
                    rooms: formValues.rooms,
                    ph_number: formValues.ph_number,
                    price: formValues.price,
                    place_id: place_id,
                    img_path: imgPath,
                });
            } catch (e) {
                console.log('ERROR ', e)
            }
            return;
        }
        alert('FILL ALL FIELDS');
    };

    const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const target = event.target as HTMLInputElement;
        setValue((state) => ({
            ...state,
            [target.name]: target.value,
        }));
    };

    const onInputChange = (e: any) => {
        setFiles(e.target.files[0]);
    }

    return (
        <div
            className={'formSelf'}
        >
            <label className={'lableField'}>
                Title:{' '}
                <input
                    id={'title'}
                    className={'inputField'}
                    name={'title'}
                    value={formValues.title}
                    onChange={onChange}
                />
            </label>
            <label className={'lableField'}>
                Address:{' '}
                <input
                    placeholder={'City, Street, Building number'}
                    className={'inputField'}
                    name={'address'}
                    value={formValues.address}
                    onChange={onChange}
                />
            </label>
            <label className={'lableField'}>
                Rooms:{' '}
                <input
                    placeholder={'number'}
                    className={'inputField'}
                    name={'rooms'}
                    value={formValues.rooms}
                    onChange={onChange}
                />
            </label>
            <label className={'lableField'}>
                Price:{' '}
                <input
                    placeholder={'number'}
                    className={'inputField'}
                    name={'price'}
                    value={formValues.price}
                    onChange={onChange}
                />
            </label>
            <label className={'lableField'}>
                Phone Number:{' '}
                <input
                    placeholder={'00380 xx-xxx-xx-xx'}
                    className={'inputField'}
                    name={'ph_number'}
                    value={formValues.ph_number}
                    onChange={onChange}
                />
            </label>
            <input
                onChange={onInputChange}
                type="file"
                className="form-control"
                multiple={false}
            />
            <input
                type={'button'}
                title={'Add announcement'}
                value={'Add announcement'}
                className={'inputButton'}
                onClick={onSubmit}
            />
        </div>
    );
};
export default ApartmentFormComponent;
