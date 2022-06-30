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
import ApartmentInfComponent from "./components/ApartmentInfComponent";

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
    const [activeApartment, setActiveApartment] = useState<ApartmentModel | undefined>(undefined);
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        // @ts-ignore
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
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
            setActiveApartment(apartmentList.find((item) => item.id === id));
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
                    {activeMarkerId !== null ?
                        <ApartmentInfComponent
                            apartment={activeApartment}
                            setMapCenter = {setMapCenter}
                            setActiveMarkerId = {setActiveMarkerId}
                        /> : <ApartmentList handler={setMapCenter}/>
                         }
                </Container>
            </Container>
        </Container>
    ) : (
        <></>
    );
}

export default App;
