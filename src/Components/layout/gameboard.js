import React, { Component } from 'react';
import './style/gameboard.css';
import GameCell from './gameboard/game-cell';

class GameBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mainMatrix: {
				size: 3,
				parentColSize: 12,
				childColSize: 4,
			},
			activePlayerValue: 'X'
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			mainMatrix: nextProps.mainMatrix,
			activePlayerValue: nextProps.activePlayerValue
		});
	}

	render() {
		return(
			<div className={`GameBoard col-md-offset-${(this.state.mainMatrix.parentColSize - this.state.mainMatrix.childColSize) / 2}`}>
				<div className="row">
					{Array(this.state.mainMatrix.size ** 2).fill().map((elem, index) => <GameCell
						key={index}
						value={this.state.activePlayerValue}
						cellStyle={this.props.cellStyle}
						colSize={this.state.mainMatrix.childColSize}
						onSetValue={currentValue => this.props.onActivePlayerChange(currentValue)} />)
					}
				</div>
			</div>
		)
	}
}

export default GameBoard;