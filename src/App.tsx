import React, {useContext, useState} from 'react';
import Container from "./components/Container";
import Button from "./components/Button";
import ApartmentForm from "./components/CreateApartmentForm";
import {ApartmentListContext, ApartmentListProvider} from "./utils/contextList";
import ApartmentList from "./components/ApartmentList";
import ApartmentItem from "./data/apartmentItem";

function App() {
    let [formState, setFormState] = useState(false);
    let formSummonHandler = () => {
        setFormState(true)
    };
    let formHide = () => {
        let Apartment = new (ApartmentItem as any)(
            {
                title = document.getElementById('title').value;
                address = document.getElementById('address').value;
                rooms = document.getElementById('rooms').value;
                price = document.getElementById('price').value;
            }
        );
        let {setList} = useContext(ApartmentListContext);
        setList(apartmentList.push(Apartment))

        setFormState(false)
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
                        <Container divStyle={'formContainer'}><ApartmentForm submitForm={formHide}/></Container>}
                        <ApartmentList></ApartmentList>
                        test3
                    </Container>
                </ApartmentListProvider>
            </Container>

        </Container>
    );
}

export default App;
