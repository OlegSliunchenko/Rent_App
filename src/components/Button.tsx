import React from "react";
import {ButtonType} from "../types/types";
import '../css/button.css'

export default function Button(props: ButtonType) {
    console.log(typeof props.handler)
        return (
        <button
            type={'button'}
            className={props.divStyle}
            onClick={props.handler}
        >
            {props.name}
        </button>
    );
};