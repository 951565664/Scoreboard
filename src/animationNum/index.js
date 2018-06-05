import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

const NumberItem = ({ currentNum }) => {
	let _currentNum = typeof (currentNum) !== 'string' ? '' : currentNum;
	return (
		<div className={styles["animation-num-box"]}>
			<ul className={styles[`currentNum-${_currentNum}`]} >
				{
					(() => {
						/* 给0-10 10个数字 */
						return new Array(10).fill(1).map((item, index) => <li>{index}</li>)
					})()
				}

			</ul>
		</div>
	)
}

/* 数字动画 */
export default class AnimationNum extends React.Component {
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
					numberArr.map((item) => {
						return <NumberItem currentNum={item} />
					})
				}
			</div>
		)
	}
}