import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

const Counter = (props) => (
    <div>
        {props.count}
    </div>
)

// simple selector
let getCounter = (state) => state.counter;
// selector from reselect
let getMultCounter = createSelector(
    [getCounter],
    (counter) => counter * 22
);

let mapStateToProps = (state) => {
    return {count: getMultCounter(state)};
}

export default connect(
    mapStateToProps
)(Counter);
