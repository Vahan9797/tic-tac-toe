import React, { Component } from 'react';
import './style/game-cell.css';
import { Button } from 'react-bootstrap';
import { Colors } from '../../../pseudo-db';

class GameCell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cellValue: '',
			isEmpty: true,
			cellSize: '',
			cellStyle: "primary",
			cellID: ''
		}
	}

	componentWillMount() {
		this.setState({
			cellSize: this.props.cellSize,
			cellStyle: this.props.cellStyle,
			cellID: this.props.cellID
		});
		console.log('in game-cell componentWillMount', this.state.cellID);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			cellSize: nextProps.cellSize,
			cellStyle: nextProps.cellStyle,
			isEmpty: this.state.isEmpty || nextProps.isEmpty
		});
		console.log('in game-cell componentWillReceiveProps', this.state.cellID);
	}

	setCellValue(event) {
		event.stopPropagation();
		this.setState({ cellValue: this.props.value, isEmpty: false }, () => this.props.onSetValue(this.state.cellValue, this.state.cellID));
	}

	render() {
		return(
			<div className="GameCell">
				<Button bsStyle={this.props.cellStyle} className={"cell-btn" + (this.state.isEmpty ? ` value-${this.props.value}`: '')} onClick={ev => this.setCellValue(ev)} disabled={!this.state.isEmpty}>
					{!this.state.isEmpty && this.state.cellValue}
				</Button>

				<style dangerouslySetInnerHTML={{__html: `
					.cell-btn:disabled {
						color: #${Colors[this.state.cellStyle]} !important;
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