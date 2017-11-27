import React, { Component } from 'react';
import './style/gameboard.css';
import GameCell from './gameboard/game-cell';

class GameBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			matrixSize: 3,
			activePlayerValue: 'X'
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			matrixSize: nextProps.matrixSize,
			activePlayerValue: nextProps.activePlayerValue
		});
	}

	render() {
		return(
			<div className="GameBoard">
				{Array(this.state.matrixSize ** 2).fill().map(() => <GameCell value={this.state.activePlayerValue} onSetValue={currentValue => this.props.onActivePlayerChange(currentValue)} />)}
			</div>
		)
	}
}

export default GameBoard;