import React, { Component } from 'react';
import GameBoard from './layout/gameboard';
import GameSettings from './layout/game-settings';

class MainLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameStart: false,
			mainMatrix: {
				size: 3,
				parentColSize: 12,
				childColSize: 4,
			},
			activePlayerValue: 'X',
			cellStyle: 'primary'
		}
	}

	applyNewSettings(settings) {
		this.setState({
			gameStart: true,
			mainMatrix: settings.mainMatrix,
			activePlayerValue: settings.activePlayerValue,
			cellStyle: settings.cellStyle
		});
	}

	handleActivePlayerChange(lastValue) {
		// TODO: make two player game for the beginning
		lastValue === 'X' && this.setState({activePlayerValue: 'O'});
		lastValue === 'O' && this.setState({activePlayerValue: 'X'});
	}

	render() {
		return(
			<div className={`MainLayout col-md-${this.state.mainMatrix.parentColSize}`}>
				<h2>Simple Tic-Tac-Toe game with React</h2>
				<h5>Click on "Game Settings" to open/change your settings and start new game.</h5>
				<GameSettings onSettingsChange={settings => this.applyNewSettings(settings)}/>

				{this.state.gameStart && <GameBoard
					mainMatrix={this.state.mainMatrix}
					activePlayerValue={this.state.activePlayerValue}
					cellStyle={this.state.cellStyle}
					onActivePlayerChange={lastValue => this.handleActivePlayerChange(lastValue)}/>
				}
			</div>
		)
	}
}

export default MainLayout;