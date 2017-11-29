import React, { Component } from 'react';
import Toggle from 'react-toggle';
import { Modal, Button, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import DB from '../../pseudo-db';

class GameSettings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showDialog: true,
			playWithComputer: false,
			mainMatrix: {
				size: 3,
				parentColSize: 12,
				childColSize: 4,
			},
			activePlayerValue: 'X',
			cellStyle: 'primary'
		}
	}

	closeDialog() {
		this.setState({showDialog: false});
	}

	openDialog() {
		this.setState({showDialog: true});
	}

	handleSizeChange(event) {
		this.setState({mainMatrix: DB.matrices.find(item => item.size === +event.target.value)});
	}

	handleColorChange(event) {
		this.setState({cellStyle: event.target.value});
	}

	triggerNewGameStart() {
		this.setState({showDialog: false});
		this.props.onSettingsChange({
			mainMatrix: this.state.mainMatrix,
			activePlayerValue: this.state.activePlayerValue,
			cellStyle: this.state.cellStyle
		});
	}

	render() {
		console.log(this.state.cellStyle);
		return(
			<div className="GameSettings">
				<Button bsStyle="primary" onClick={() => this.openDialog()}>Game Settings <i className="glyphicon glyphicon-cog"></i></Button>
				<Modal show={this.state.showDialog} onHide={() => this.closeDialog()}>
					<Modal.Header closeButton>
						<Modal.Title>Game Settings</Modal.Title>
					</Modal.Header>
						
					<Modal.Body>
					<Form horizontal>
						<FormGroup name="play-with-computer">
							<Col componentClass={FormGroup.Label} mdOffset={1} md={4}>
								<strong>Play with the computer</strong>
							</Col>
							<Col mdOffset={5} md={2}>
								<Toggle
									defaultChecked={this.state.playWithComputer}
									icons={false}
									onChange={() => this.setState({playWithComputer: true})}/>
							</Col>
						</FormGroup>
						<FormGroup style={{transform: 'translateX(-15px)'}} name="gameboard-size">
							<Col componentClass={ControlLabel} mdOffset={1} md={4}>
								<strong>Size of the game board</strong>
							</Col>
							<Col mdOffset={3} md={4}>
								<FormControl
					              inputRef={el => this.inputEl=el}
					              onChange={ev => this.handleSizeChange(ev)}
					              componentClass="select">
						            <option value="3">3x3</option>
						            <option value="4">4x4</option>
						            <option value="5">5x5</option>
						            <option value="6">6x6</option>
						            <option value="7">7x7</option>
						            <option value="8">8x8</option>
						            <option value="9">9x9</option>
						            <option value="10">10x10</option>
          						</FormControl>
							</Col>
						</FormGroup>
						<FormGroup style={{transform: 'translateX(-3px)'}} name="pick-cell-color"> 
							<Col componentClass={ControlLabel} mdOffset={1} md={4}>
								<strong>Pick color for game cells</strong>
							</Col>
							<Col mdOffset={3} md={4}>
								<FormControl
								  inputRef={el => this.inputEl=el}
								  onChange={ev => this.handleColorChange(ev)}
								  style={{transform: 'translateX(-11px)'}}
								  componentClass="select">
						            <option value="primary" className="text-primary">Blue</option>
							  	    <option value="danger" className="text-danger">Red</option>
						            <option value="warning" className="text-warning">Yellow</option>
						            <option value="success" className="text-success">Green</option>
						            <option value="info" className="text-info">Aqua</option>
								</FormControl>
							</Col>
						</FormGroup>
					</Form>
					</Modal.Body>

					<Modal.Footer>
						<Button bsStyle="primary" onClick={() => this.triggerNewGameStart()}>Start New Game With Current Settings</Button>
						<Button bsStyle="warning" onClick={() => this.closeDialog()}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}

export default GameSettings;