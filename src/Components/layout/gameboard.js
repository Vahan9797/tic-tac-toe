import React, { Component } from 'react';
import './style/gameboard.css';
import GameCell from './gameboard/game-cell';
import { Matrices } from '../../pseudo-db';

class GameBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mainMatrix: Matrices.find(item => item.size === 3),
			activePlayerValue: 'X'
		}
	}

	componentWillMount() {
		this.setState({
			mainMatrix: this.props.mainMatrix,
			activePlayerValue: this.props.activePlayerValue
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({activePlayerValue: nextProps.activePlayerValue});
	}

	render() {
		return(
			<div className="GameBoard">
				<div className="col-md-12">
					<div className="container center-div">
						{Array(this.state.mainMatrix.size).fill().map((elem, index) => <div key={index} className="row">
							{Array(this.state.mainMatrix.size).fill().map((elem, index) => <GameCell
								key={index}
								value={this.state.activePlayerValue}
								cellStyle={this.props.cellStyle}
								cellSize={this.state.mainMatrix.cellSize}
								onSetValue={currentValue => this.props.onActivePlayerChange(currentValue)} />)}
							</div>)
						}
					</div>
				</div>
			</div>
		)
	}
}

export default GameBoard;