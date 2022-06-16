import React, {useState} from 'react';
import Container from "./components/Container";
import Button from "./components/Button";
import ApartmentForm from "./components/CreateApartmentForm";

function App() {
    let [formState, setFormState] = useState(false);
    let formSummonHandler = () => {
        setFormState(true)
    };
        let FORM;
    if (formState == true){
        FORM = <Container divStyle={'formContainer'}><ApartmentForm onClick={formHide()} /></Container>
    };
    console.log(formState);
    return (
        <Container divStyle="block0">
            {FORM}
            <Container divStyle="block1">
                <Button
                    onClick={() => {
                        formSummonHandler()
                    }}
                                        divStyle={'addButtonStyle buttonDefault'}
                    name={'Здати в Оренду +'}
                />
            </Container>
            <Container divStyle="block2">
                <Container divStyle="block3">
                    test2
                </Container>
                <Container divStyle="block4">
                    test3
                </Container>
            </Container>

        </Container>
    );
}

export default App;
