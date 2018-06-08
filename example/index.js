import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Scoreboard from '../index';

// import Scoreboard from '../lib';
// import '../lib/index.css';
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
class App extends Component {
    state = {
        key: 2
    }
    render() {
        let numberStr = new Array(this.state.key).fill(1).map((item) => parseInt(Math.random() * 10)).reduce((prev, curr, index, array) => '' + prev + curr);
        return (
            <div onClick={() => {
                this.setState({
                    key: parseInt(Math.random() * 10) + 2
                })
            }} style={{ width: '100%' }}>
                <Scoreboard numberStr={numberStr} transitionDuration={'1s'} numberStyle={{ color: '#c40000', fontSize: '20px' }} />
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));