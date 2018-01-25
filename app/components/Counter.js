import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Counter = (props) => (
    <div>
        {props.count}
    </div>
)

let mapStateToProps = (state) => {
    return {count: state.counter};
}

export default connect(
    mapStateToProps
)(Counter);
