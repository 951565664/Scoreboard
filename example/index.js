import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Scoreboard from 'scoreboard-react';
import styles from './index.less'

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
class App extends Component {
    state = {
        key: 2,
        _numberStr: '00',
        _transitionDuration: '1',
        transitionDuration: '1',
        numberStr: '00'
    }
    changeNum = (params) => {
        this.setState({
            key: parseInt(Math.random() * 10) + 2
        })
    }
    componentDidMount = () => {
        this.timer = setInterval(this.changeNum, 1000)
    }
    componentWillMount = () => {
        clearInterval(this.timer)
    }

    render() {
        let numberStr = new Array(this.state.key).fill(1).map((item) => parseInt(Math.random() * 10)).reduce((prev, curr, index, array) => '' + prev + curr);
        return (
            <div className={styles["wrapper"]}>
                <div className={styles.forkMe} >
                    <a href="https://github.com/951565664/Scoreboard" target="_">
                        <img
                            src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67"
                            alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"
                        />
                    </a>
                </div>
                <div onClick={this.changeNum} className={styles["box"]}>
                    <Scoreboard numberStr={numberStr} transitionDuration={'1s'} numberStyle={{ color: '#c40000', fontSize: '20px' }} />
                </div>
                <div onClick={this.changeNum} className={styles["box"]}>
                    <div className={styles["form"]}>
                        <label htmlFor="num">数字</label>
                        <input id="num" type="text" value={this.state._numberStr} onChange={(e) => {
                            this.setState({
                                _numberStr: e.target.value
                            })
                        }} />
                        <label htmlFor="duration">时间</label>
                        <input id="duration" type="text" value={this.state._transitionDuration} onChange={(e) => {
                            this.setState({
                                _transitionDuration: e.target.value
                            })
                        }} />
                        <div className={styles["button"]} onClick={() => this.setState({
                            numberStr: this.state._numberStr,
                            transitionDuration: this.state._transitionDuration
                        })}>变更</div>
                    </div>
                    <Scoreboard numberStr={this.state.numberStr} transitionDuration={parseInt(this.state.transitionDuration)+'s'} numberStyle={{ color: '#c40000', fontSize: '20px' }} />
                </div>
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));