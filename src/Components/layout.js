import React, { Component } from 'react';
import GameBoard from './gameboard';

class MainLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameStart: false,
			mainMatrixSize: 3,
			activePlayerValue: 'X'
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			gameStart: nextProps.gameStart,
			mainMatrixSize: nextProps.mainMatrixSize
		});
	}

	handleActivePlayerChange(lastValue) {
		// TODO: make two player game for the beginning
		lastValue === 'X' && this.setState({activePlayerValue: 'O'});
		lastValue === 'O' && this.setState({activePlayerValue: 'X'});
	}

	render() {
		return(
			<div className="MainLayout">
				{<GameBoard 
					matrixSize={this.state.mainMatrixSize}
					activePlayerValue={this.state.activePlayerValue}
					onActivePlayerChange={lastValue => this.handleActivePlayerChange(lastValue)}/>
				}
			</div>
		)
	}
}

export default MainLayout;