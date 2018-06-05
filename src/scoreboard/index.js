import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';


class NumberItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currentNum: '0'
		};
		this.animationTimer = null;
	}

	componentDidMount = () => {
		if (this.props.currentNum) {
			// this.initNumber('9', () => {
			setTimeout(() => {
				this.initNumber(this.props.currentNum)
			}, 0);
			// })
		}
	}

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.currentNum && nextProps.currentNum !== this.props.currentNum) {
			this.initNumber(nextProps.currentNum);
		}
	}
	componentWillUnmount = () => {
		clearInterval(this.animationTimer);
	}
	initNumber = (currentNum, callBack = () => { }) => {

		if (typeof (currentNum) !== 'string') {
			currentNum = '' + (currentNum ? currentNum : '')
		}
		this.setState({
			currentNum: currentNum
		}, callBack)
	}

	render() {
		return (
			<div className={styles["animation-num-box"]} >
				<ul className={styles[`currentNum-${this.state.currentNum}`]} >
					{
						(() => {
							return new Array(10).fill(1).map((item, index) => <li key={Date.now() + index}>{index}</li>)
						})()
					}

				</ul>
			</div>
		)
	}
}


/* 数字动画 */
export default class Scoreboard extends React.Component {
	static propTypes = {
		numberStr: PropTypes.string.isRequired,
	}
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		return (nextProps.numberStr && nextProps.numberStr !== this.props.numberStr);
	}

	render() {
		let { numberStr } = this.props;
		if (typeof (numberStr) !== 'string') {
			numberStr = '';
		};
		let numberArr = numberStr.split('');
		return (
			<div className={styles["animation-num-box"]}>
				{
					numberArr.map((item, key) => {
						// return <NumberItem currentNum={item} key={Date.now() + key} key={key} />
						return <NumberItem currentNum={item} key={key} />
					})
				}
			</div>
		)
	}
}