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


function App() {
    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };
    const [formState, setFormState] = useState(false);
    const {setList} = useContext(ApartmentListContext) as ApartmentContextType;

    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(3); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 0,
        lng: 0,
    });

    const onClick = (e: google.maps.MapMouseEvent) => {
        // avoid directly mutating state
        setClicks([...clicks, e.latLng!]);
    };

    const onIdle = (m: google.maps.Map) => {
        console.log("onIdle");
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
                    test2
                    <Wrapper apiKey={"AIzaSyDBGK3WiyLYYYBmZ1iNFCVqnuNpfRMO560"} render={render}>
                        <Map
                            center={center}
                            onClick={onClick}
                            onIdle={onIdle}
                            zoom={zoom}
                            style={{ flexGrow: "1", height: "100%" }}
                        >
                            {clicks.map((latLng, i) => (
                                <Marker key={i} position={latLng} />
                            ))}
                        </Map>
                    </Wrapper>
                </Container>
                <Container divStyle="block4">
                    {formState &&
                    <Container divStyle={'formContainer'}>
                        <ApartmentFormComponent submitForm={handleFormSubmit}/>
                    </Container>}
                    <ApartmentList />
                    test3
                </Container>
            </Container>

        </Container>
    );
}

export default App;
