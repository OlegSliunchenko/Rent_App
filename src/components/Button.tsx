import React from 'react';
import '../css/button.css';
import {ButtonType} from '../types/types';

export default function Button(props: ButtonType) {
    return (
        <button type={'button'} className={props.divStyle} onClick={props.handler}>
            {props.name}
        </button>
    );
}
