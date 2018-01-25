import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Counter from './Counter';
import Button from './Button';

console.log(Counter);

class App extends Component {
    render() {
        return (
            <div>
                Hello World
                <Counter />
                <Button />
            </div>
        )
    }
}

export default App;
