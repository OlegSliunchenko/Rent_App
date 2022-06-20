import React, {useState} from 'react'
import '../css/form.css'
import {IApartmentFormData, IApartmentFormProps} from "../data/ApartmentModel/types";


const ApartmentFormComponent: React.FC<IApartmentFormProps> = ({submitForm}) => {
    const [formValues, setValue] = useState<IApartmentFormData>({
        title: '',
        address: '',
        rooms: '',
        price: '',
    })

    function isFormValid() {
        const isNotEmpty = formValues.title.trim() &&
            formValues.address.trim() &&
            formValues.rooms.trim() &&
            formValues.price.trim();

        const isValidPrice = !isNaN(parseInt(formValues.price));
        const isValidRooms = !isNaN(parseInt(formValues.rooms));

        return isNotEmpty && isValidRooms && isValidPrice;
    }

    const onSubmit = (): void => {
        if (isFormValid()) {
            return submitForm(formValues);
        }
alert('FILL ALL FIELDS')
    };
    const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const target = event.target as HTMLInputElement;
        setValue(state => ({
            ...state,
            [target.name]: target.value
        }));

    }
    return (
        <form className={'formSelf'}>
            Title: <input className={'inputField'} name={'title'} value={formValues.title} onChange={onChange}/>
            Address: <input className={'inputField'} name={'address'} value={formValues.address} onChange={onChange}/>
            Rooms: <input className={'inputField'} name={'rooms'} value={formValues.rooms} onChange={onChange}/>
            Price: <input className={'inputField'} name={'price'} value={formValues.price} onChange={onChange}/>
            <input
                type={"button"}
                title={'Add announcement'}
                value={'Add announcement'}
                className={'inputButton'}
                onClick={onSubmit}
            />
        </form>
    );
};
export default ApartmentFormComponent