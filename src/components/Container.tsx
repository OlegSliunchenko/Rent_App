import React from 'react';
import { ContainerType } from '../types/types';
import '../css/container.css';

export default function Container(props: ContainerType) {
  return <div className={props.divStyle}>{props.children}</div>;
}
