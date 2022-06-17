import React, {useState, createContext} from "react";


export const ApartmentListContext = createContext(null);

export const ApartmentListProvider = (props:any) => {
    const [apartmentList, setList] = useState([]);

    return (
        <ApartmentListContext.Provider value = {{apartmentList, setList}}>
            {props.children}
        </ApartmentListContext.Provider>
    );
};
