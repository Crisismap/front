import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

export const Input = (props) => {
    return (
        <FormControl type="text" placeholder={props.placeholder} />
    )
}
