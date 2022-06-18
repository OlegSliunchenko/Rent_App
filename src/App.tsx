import React, {useContext, useState} from 'react';
import Container from "./components/Container";
import Button from "./components/Button";
import ApartmentFormComponent from "./components/ApartmentFormComponent";
import {ApartmentListContext, ApartmentListProvider} from "./utils/provider";
import ApartmentList from "./components/ApartmentList";
import ApartmentModel from "./data/ApartmentModel/ApartmentModel";
import {ApartmentContextType} from "./utils/providerTypes";
import {IApartmentFormData} from "./data/ApartmentModel/types";

function App() {
    const [formState, setFormState] = useState(false);
    const {setList} = useContext(ApartmentListContext) as ApartmentContextType;
        const formSummonHandler = () => {
        setFormState(true)
    };
    const handleFormSubmit = (obj: IApartmentFormData): void => {
        const apartmentModel = new ApartmentModel(
            obj.title,
            obj.address,
            +obj.rooms,
            +obj.price,
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
                </Container>
                <ApartmentListProvider>
                    <Container divStyle="block4">
                        {formState &&
                        <Container divStyle={'formContainer'}>
                            <ApartmentFormComponent submitForm={handleFormSubmit}/>
                        </Container>}
                        <ApartmentList/>
                        test3
                    </Container>
                </ApartmentListProvider>
            </Container>

        </Container>
    );
}

export default App;
