import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Scoreboard from 'scoreboard-react';
import styles from './index.less'

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
class App extends Component {
    state = {
        key: 2
    }
    render() {
        let numberStr = new Array(this.state.key).fill(1).map((item) => parseInt(Math.random() * 10)).reduce((prev, curr, index, array) => '' + prev + curr);
        return (
            <div className={styles["wrapper"]}>
                <h1>请点击下方的数字</h1>
                <div onClick={() => {
                    this.setState({
                        key: parseInt(Math.random() * 10) + 2
                    })
                }} style={{ width: '100%' }}>
                    <Scoreboard numberStr={numberStr} transitionDuration={'1s'} numberStyle={{ color: '#c40000', fontSize: '20px' }} />
                </div>
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));