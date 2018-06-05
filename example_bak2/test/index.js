import React, { Component } from 'react'
// import Scoreboard from '../../src/scoreboard'

const number = [
  '810009',
  '6',
  '821564',
  '2131',
  '0',
]
export default class Test extends Component {
  constructor(props) {
    super(props)

    this.state = {
      index: 0
    }
  }
  onClick = () => {
    this.setState((prevState) => ({
      index: (prevState.index + 1) % number.length
    }))

  }
  render() {
    let numberStr = number[this.state.index];
    return (
      <div style={{ marginTop: '50px', backgroundColor: '#ccc' }} onClick={this.onClick}>
        {/* <Scoreboard numberStr={numberStr} /> */}
        {numberStr}
      </div>
    )
  }
}

// export default () => {
//   return <div>1</div>
// }
