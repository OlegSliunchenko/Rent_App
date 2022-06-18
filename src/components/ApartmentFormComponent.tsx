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
    const onSubmit = (): void => {
        submitForm(formValues);
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