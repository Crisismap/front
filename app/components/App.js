import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Counter from './Counter';
import SearchPage from './SearchPage';
import Button from './Button';

class App extends Component {
    render() {
        return (
            <div>
                <SearchPage> </SearchPage>
            </div>
        )
    }
}

export default App;
