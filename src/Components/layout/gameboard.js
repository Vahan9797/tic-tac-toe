import React, { Component } from 'react';
import './style/gameboard.css';
import GameCell from './gameboard/game-cell';
import DB from '../../pseudo-db';

class GameBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mainMatrix: DB.matrices.find(item => item.size === 3),
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
			<div className={`GameBoard col-md-offset-${this.state.mainMatrix.parentColOffset}`}>
				<div className={`col-md-${this.state.mainMatrix.parentColSize}`}>
					<div className="container">
						{Array(this.state.mainMatrix.size).fill().map((elem, index) => <div key={index} className="row">
							{Array(this.state.mainMatrix.size).fill().map((elem, index) => <GameCell
								key={index}
								value={this.state.activePlayerValue}
								cellStyle={this.props.cellStyle}
								colSize={this.state.mainMatrix.childColSize}
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