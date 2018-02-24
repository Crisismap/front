import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Button = (props) => (
    <button onClick={props.onClick}></button>
)

let mapDispatchToProps = dispatch => {
    console.log('a');
    return {
        onClick: function () {
            dispatch({type: 'INCREMENT'});
        }
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Button);
