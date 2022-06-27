import React, { useState } from 'react';
import '../css/form.css';
import { IApartmentFormData, IApartmentFormProps } from '../data/ApartmentModel/types';

const ApartmentFormComponent: React.FC<IApartmentFormProps> = ({
                                                                 submitForm,
                                                               }) => {
  const [formValues, setValue] = useState<IApartmentFormData>({
    location: null,
    title: '',
    address: '',
    rooms: '',
    price: '',
    ph_number: '',
    place_id: null,
  });

  function isFormValid() {
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

  const onSubmit = (
    event: React.FormEvent<HTMLInputElement>,
  ): Promise<google.maps.GeocoderResponse> | void => {
    event.preventDefault();
    if (isFormValid()) {
      const geocoder = new google.maps.Geocoder();
      return geocoder
        .geocode(
          { address: formValues.address },
          function handleResults(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              formValues.location = results && results[0].geometry.location;
              formValues.place_id = results && results[0].place_id;
              if (results && results[0].formatted_address) {
                formValues.address = results[0].formatted_address;
              }
              return submitForm(formValues);
            } else {
              return alert(`Seems like ADDRESS is incorrect`);
            }
          },
        )
        .then();
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
  return (
    <form className={'formSelf'}>
      Title:{' '}
      <input
        className={'inputField'}
        name={'title'}
        value={formValues.title}
        onChange={onChange}
      />
      Address:{' '}
      <input
        placeholder={'City, Street, Building number'}
        className={'inputField'}
        name={'address'}
        value={formValues.address}
        onChange={onChange}
      />
      Rooms:{' '}
      <input
        placeholder={'number'}
        className={'inputField'}
        name={'rooms'}
        value={formValues.rooms}
        onChange={onChange}
      />
      Price:{' '}
      <input
        placeholder={'number'}
        className={'inputField'}
        name={'price'}
        value={formValues.price}
        onChange={onChange}
      />
      Phone Number:{' '}
      <input
        placeholder={'00380 xx-xxx-xx-xx'}
        className={'inputField'}
        name={'ph_number'}
        value={formValues.ph_number}
        onChange={onChange}
      />
      <input
        type={'button'}
        title={'Add announcement'}
        value={'Add announcement'}
        className={'inputButton'}
        onClick={onSubmit}
      />
    </form>
  );
};
export default ApartmentFormComponent;
