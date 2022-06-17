import '../css/form.css'

export default function ApartmentForm({submitForm}: any) {
    return (
        <form className={'formSelf'}>
            Title: <input className={'inputField'} id={'title'} value={''}/>
            Address: <input className={'inputField'} id={'address'} value={''}/>
            Rooms: <input className={'inputField'} id={'rooms'} value={''}/>
            Price: <input className={'inputField'} id={'price'} value={''}/>
            <input
                type={"button"}
                title={'Add announcement'}
                value={'Add announcement'}
                className={'inputButton'}
                onClick={submitForm}
            />
        </form>
    );
};