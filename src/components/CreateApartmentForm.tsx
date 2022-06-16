import '../css/form.css'
import {useState} from "react";

export default function ApartmentForm(onClick:any) {
        return (
        <form className={'formSelf'}>
            Title: <input className={'inputfield'}/>
            City: <input className={'inputfield'}/>
            Rooms: <input className={'inputfield'}/>
            Price: <input className={'inputfield'}/>
            <input
                type={"button"}
                title={'Add announcement'}
                value={'Add announcement'}
                className={'inputButton'}
                onClick={onClick}
            />
        </form>
    );
};