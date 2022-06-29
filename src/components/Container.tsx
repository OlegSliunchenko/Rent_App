import React from 'react';
import '../css/container.css';
import { ContainerType } from '../types/types';

export default function Container(props: ContainerType) {
  return <div className={props.divStyle}>{props.children}</div>;
}
