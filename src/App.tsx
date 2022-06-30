import React, {useContext, useState} from 'react';
import {GoogleMap, Marker, MarkerClusterer, useJsApiLoader} from '@react-google-maps/api';
import {ApartmentContextType} from './utils/providerTypes';
import {ApartmentListContext} from './utils/provider';
import {IApartmentFormData} from './data/ApartmentModel/types';
import ApartmentModel from './data/ApartmentModel/ApartmentModel';
import Container from './components/Container';
import Button from './components/Button';
import ApartmentList from './components/ApartmentList';
import ApartmentFormComponent from './components/ApartmentFormComponent';

const mapBlockStyle = {
    width: '100%',
    height: '100%',
};

function App() {
    const [mapCenter, setMapCenter] = useState({
        lat: 50.4559388795418,
        lng: 30.510686178292996,
    });
    const [formState, setFormState] = useState(false);
    const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
    const {setList, apartmentList} = useContext(ApartmentListContext) as ApartmentContextType;
    const options = {
        imagePath:
            'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    };
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDDsI_CW4CUgAkOIdkm6x_4z5mOZ5h1INA',
    });
    const formSummonHandler = () => {
        setFormState(true);
    };
    const handleFormSubmit = (obj: IApartmentFormData): void => {
        const apartmentModel = new ApartmentModel(
            obj.title.trim(),
            obj.address.trim(),
            +obj.rooms.trim(),
            +obj.price.trim(),
            +obj.ph_number.trim(),
            obj.place_id!,
            obj.location!,
            obj.img_path
        );
        setList((state) => [...state, apartmentModel]);
        setFormState(false);
    };
    const handleActiveMarker = (id: string): void => {
        if (id !== activeMarkerId) {
            setActiveMarkerId(id);
        }
    };

    return isLoaded ? (
        <Container divStyle={'mainContainerStyle'}>
            <Container divStyle={'headerContainerStyle'}>
                <Button
                    handler={formSummonHandler}
                    divStyle={'addButtonStyle buttonDefault'}
                    name={'Здати в Оренду +'}
                />
            </Container>
            <Container divStyle={'mapListWrapperStyle'}>
                <Container divStyle={'mapWrapperStyle'}>
                    <GoogleMap
                        mapContainerStyle={mapBlockStyle}
                        center={mapCenter}
                        zoom={10}
                    >
                        <MarkerClusterer options={options}>
                            {(clusterer) => (
                                <>
                                    {apartmentList.map<JSX.Element>((item) => (
                                        <Marker
                                            key={item.id.toString()}
                                            position={item.location}
                                            clusterer={clusterer}
                                            onClick={() => handleActiveMarker(item.id)}
                                        />
                                    ))}
                                </>
                            )}
                        </MarkerClusterer>
                    </GoogleMap>
                </Container>
                <Container divStyle={'listWrapperStyle'}>
                    <h1>Список квартир:</h1>
                    {formState && (
                        <Container divStyle={'formContainer'}>
                            <ApartmentFormComponent submitForm={handleFormSubmit}/>
                        </Container>
                    )}
                    {apartmentList.map<JSX.Element>((item) =>
                        activeMarkerId === item.id ? (
                            <>
                                <div
                                    key={item.id.toString()}
                                    onClick={() => {
                                        setMapCenter({
                                            lat: item.location.lat(),
                                            lng: item.location.lng(),
                                        });
                                    }}
                                >
                                    <div>
                                        <button
                                            className='close'
                                            onClick={() => setActiveMarkerId(null)}
                                        />
                                        <img
                                            src={require(`.${item.img_path.slice(3)}`)}
                                            style={{width: '100%', height: '200px'}}
                                            alt={'img'}
                                        />
                                        <br/>
                                        <ul>
                                            <li>
                                                <p>
                                                    <b>Title:</b> {item.title}
                                                </p>
                                                <p>
                                                    <b>Address:</b>
                                                    <br/> {item.address}
                                                </p>
                                                <p>
                                                    <b>Rooms:</b> {item.rooms}
                                                </p>
                                                <p>
                                                    <b>Price:</b> {item.price}
                                                </p>
                                                <p>
                                                    <b>Phone Number:</b> {item.ph_number}
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <ApartmentList handler={setMapCenter}/>
                            </>
                        )
                    )}
                </Container>
            </Container>
        </Container>
    ) : (
        <></>
    );
}

export default App;
