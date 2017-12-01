import React, { Component } from 'react';
import './style/game-cell.css';
import { Button } from 'react-bootstrap';
import DB from '../../../pseudo-db';

class GameCell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cellValue: '',
			isEmpty: true,
			cellSize: ''
		}
	}

	componentWillMount() {
		this.setState({cellSize: this.props.cellSize});
	}

	setCellValue(event) {
		event.stopPropagation();
		this.setState({ cellValue: this.props.value, isEmpty: false }, () => this.props.onSetValue(this.state.cellValue));
	}

	componentDidMount() {
		console.log(this.state.cellSize);
	}

	render() {
		return(
			<div className="GameCell">
				<Button bsStyle={this.props.cellStyle} className={"cell-btn" + (this.state.isEmpty ? ` value-${this.props.value}`: '')} onClick={ev => this.setCellValue(ev)} disabled={!this.state.isEmpty}>{this.state.cellValue}</Button>
				<style dangerouslySetInnerHTML={{__html: `
					.cell-btn:disabled {
						color: #${DB.colors[this.props.cellStyle]} !important;
					}

					.cell-btn {
						width: ${this.state.cellSize}px !important;
						height: ${this.state.cellSize}px !important;
						font-size: ${this.state.cellSize / 2}px !important;
					}`}}/>
			</div>
		)
	}
}

export default GameCell;