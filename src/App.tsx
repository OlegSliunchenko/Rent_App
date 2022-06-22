import React, {useContext, useState} from 'react';
import Container from "./components/Container";
import Button from "./components/Button";
import ApartmentFormComponent from "./components/ApartmentFormComponent";
import {ApartmentListContext} from "./utils/provider";
import ApartmentList from "./components/ApartmentList";
import ApartmentModel from "./data/ApartmentModel/ApartmentModel";
import {ApartmentContextType} from "./utils/providerTypes";
import {IApartmentFormData} from "./data/ApartmentModel/types";
import {Status, Wrapper} from '@googlemaps/react-wrapper';
import Map from './components/Map'
import Marker from './components/Marker'

function App() {
    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };
    const [formState, setFormState] = useState(false);
    const {setList, apartmentList} = useContext(ApartmentListContext) as ApartmentContextType;

    const [markers, setMarkers] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(10); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 64.921661,
        lng: -18.543082,
    });
    const markerInfo = new google.maps.InfoWindow()

    const onClick = (e: google.maps.MapMouseEvent) => {

    };

    const onIdle = (m: google.maps.Map) => {
        setZoom(m.getZoom()!);
        setCenter(m.getCenter()!.toJSON());
    };

    const formSummonHandler = () => {
        setFormState(true)
    };
    const handleFormSubmit = (obj: IApartmentFormData): void => {
        const apartmentModel = new ApartmentModel(
            obj.title.trim(),
            obj.address.trim(),
            +(obj.rooms.trim()),
            +(obj.price.trim()),
            obj.place_id!,
            obj.location!,
        );
        setList(state => [
            ...state,
            apartmentModel
        ]);

        setFormState(false);
    };

    return (
        <Container divStyle="block0">
            <Container divStyle="block1">
                <Button
                    handler={formSummonHandler}
                    divStyle={'addButtonStyle buttonDefault'}
                    name={'Здати в Оренду +'}
                />
            </Container>
            <Container divStyle="block2">
                <Container divStyle="block3">
                    <Wrapper apiKey={"AIzaSyDDsI_CW4CUgAkOIdkm6x_4z5mOZ5h1INA"} render={render}>
                        <Map
                            center={center}
                            onClick={onClick}
                            onIdle={onIdle}
                            zoom={zoom}
                            style={{flexGrow: "1", height: "100%"}}
                        >
                            {apartmentList.map((item) => (
                                <Marker key={item.id} position={item.location} />
                            ))}
                        </Map>
                    </Wrapper>
                </Container>
                <Container divStyle="block4">
                    <h1>Список квартир:</h1>
                    {formState &&
                    <Container divStyle={'formContainer'}>
                        <ApartmentFormComponent submitForm={handleFormSubmit}/>
                    </Container>}
                    <ApartmentList/>
                </Container>
            </Container>

        </Container>
    );
}

export default App;
