import React, { Component } from 'react';
import GameBoard from './layout/gameboard';
import GameSettings from './layout/game-settings';
import { Matrices } from '../pseudo-db';

class MainLayout extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			gameStart: false,
			mainMatrix: Matrices.find(item => item.size === 3),
			activePlayerValue: 'X',
			cellStyle: 'primary'
		}
	}

	applyNewSettings(settings) {
		this.observeArray = Array(settings.mainMatrix.size).fill().map(() => Array(settings.mainMatrix.size).fill());	
		this.winnerCheck = settings.winSteps;
		this.totalWins = settings.winCount;

		this.setState({
			gameStart: true,
			mainMatrix: settings.mainMatrix,
			activePlayerValue: settings.activePlayerValue,
			cellStyle: settings.cellStyle
		});
	}

	gameboardObserver(lastValue, cellID) {
		// TODO: sort out some sensible outcome of this pile of shit, and make 2 players game for Christ's sake
		this.handleActivePlayerChange(lastValue);
		this.observeArray[cellID.rowIndex][cellID.cellIndex] = lastValue;

		const winSteps = this.winnerCheck;
		const rowOffset = (cellID.rowIndex > cellID.cellIndex) ? cellID.rowIndex - cellID.cellIndex : 0;
		const colOffset = (cellID.cellIndex > cellID.rowIndex) ? cellID.cellIndex - cellID.rowIndex : 0;

		const horizontalValues = this.observeArray[cellID.rowIndex];
		const verticalValues = this.observeArray.map(elem => elem[cellID.cellIndex]);
		const diagonalValues = {
			mainDiagonal: this.observeArray.map((_, rowIndex, array) => array[index + rowOffset][index + colOffset]),
			// antiDiagonal not working correctly, neither is probably the main one
			antiDiagonal: this.observeArray.map((_, rowIndex, array) => array[index - rowOffset][index - colOffset])
		}
	
	}

	handleActivePlayerChange(lastValue) {
		// TODO: make two player game for the beginning
		lastValue === 'X' && this.setState({activePlayerValue: 'O'});
		lastValue === 'O' && this.setState({activePlayerValue: 'X'});
	}

	render() {
		return(
			<div className="MainLayout col-md-12">
				<h2>Simple Tic-Tac-Toe game with React</h2>
				<h5>Click on "Game Settings" to open/change your settings and start new game.</h5>
				<GameSettings onSettingsChange={settings => this.applyNewSettings(settings)}/>
				{this.state.gameStart && <GameBoard
					mainMatrix={this.state.mainMatrix}
					activePlayerValue={this.state.activePlayerValue}
					cellStyle={this.state.cellStyle}
					onActivePlayerChange={(lastValue, cellID) => this.gameboardObserver(lastValue, cellID)}/>
				}
			</div>
		)
	}
}

export default MainLayout;