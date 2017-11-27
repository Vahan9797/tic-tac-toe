import React, { Component } from 'react';
import './style/game-cell.css';
import { Button } from 'reactstrap';

class GameCell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cellValue: '',
			isEmpty: true
		}
	}

	setCellValue(event) {
		event.stopPropagation();
		this.setState({ cellValue: this.props.value, isEmpty: false }, () => this.props.onSetValue(this.state.cellValue));
	}

	render() {
		return(
			<div className="GameCell">
				<Button color="primary" className="cell-btn" onClick={ev => this.setCellValue(ev)} disabled={!this.state.isEmpty}>{this.state.cellValue}</Button>
			</div>
		)
	}
}

export default GameCell;