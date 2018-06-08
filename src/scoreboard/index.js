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
		const { numberStyle, transitionDuration } = this.props;

		return (
			<div className={styles["animation-num-item-box"]} >
				<ul className={styles[`currentNum-${this.state.currentNum}`]} style={{ transitionDuration }}>
					{
						(() => {
							return new Array(10).fill(1).map((item, index) => <li key={Date.now() + index} style={numberStyle}>
								<div className={styles["li-inner"]}>{index}</div>
							</li>)
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
	static defaultProps = {
		transitionDuration: '0.5s',
		numberStyle: {},
		style: {}
	};
	constructor(props) {
		super(props);
	}
	shouldComponentUpdate = (nextProps, nextState) => {
		return (nextProps.numberStr && nextProps.numberStr !== this.props.numberStr);
	}

	render() {
		let { numberStr, numberStyle, transitionDuration, style } = this.props;
		if (typeof (numberStr) !== 'string') {
			numberStr = '';
		};
		let numberArr = numberStr.split('');

		return (
			<div className={styles["animation-num-box"]} style={style}>
				{
					numberArr.map((item, key) => {
						return <NumberItem numberStyle={numberStyle} transitionDuration={transitionDuration} currentNum={item} key={key} />
					})
				}
			</div>
		)
	}
}