import React, { Component } from 'react';
import './style/gameboard.css';
import GameCell from './gameboard/game-cell';
import { Matrices } from '../../pseudo-db';

class GameBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mainMatrix: Matrices.find(item => item.size === 3),
			activePlayerValue: 'X',
			cellStyle: "primary",
			emptyNewGameCells: true
		}
	}

	componentWillMount() {
		this.setState({
			mainMatrix: this.props.mainMatrix,
			activePlayerValue: this.props.activePlayerValue,
			cellStyle: this.props.cellStyle
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			mainMatrix: nextProps.mainMatrix,
			activePlayerValue: nextProps.activePlayerValue,
			cellStyle: nextProps.cellStyle,
			emptyNewGameCells: nextProps.mainMatrix.size !== this.state.mainMatrix.size
		});
		console.log('in gameboard componentWillReceiveProps');
	}

	render() {
		return(
			<div className="GameBoard">
				<div className="col-md-12">
					<div className="container center-div">
						{Array(this.state.mainMatrix.size).fill().map((elem, rowIndex) => <div key={rowIndex} className="row">
							{Array(this.state.mainMatrix.size).fill().map((elem, cellIndex) => <GameCell
								key={cellIndex}
								cellID={{rowIndex, cellIndex}}
								value={this.state.activePlayerValue}
								cellStyle={this.state.cellStyle}
								cellSize={this.state.mainMatrix.cellSize}
								isEmpty={this.state.emptyNewGameCells}
								onSetValue={(currentValue, currentID) => this.props.onActivePlayerChange(currentValue, currentID)} />)}
							</div>)
						}
					</div>
				</div>
			</div>
		)
	}
}

export default GameBoard;