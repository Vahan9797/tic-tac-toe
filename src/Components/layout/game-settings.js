import React, { Component } from 'react';
import Toggle from 'react-toggle';
import { Modal, Button, Col, Form, FormGroup, FormControl, ControlLabel, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { Matrices, Range } from '../../pseudo-db';

class GameSettings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showDialog: true,
			playWithComputer: false,
			computersValue: 'O',
			mainMatrix: Matrices.find(item => item.size === 3),
			activePlayerValue: 'X',
			cellStyle: 'primary'
		}
	}

	closeDialog() {
		this.setState({showDialog: false});
	}

	openDialog() {
		this.setState({
			showDialog: true,
			mainMatrix: Matrices.find(item => item.size === 3),
			playWithComputer: false
		});
	}

	handleComputerSideChange(event) {
		this.setState({computersValue: event.target.value});
	}

	handleSizeChange(event) {
		this.setState({mainMatrix: Matrices.find(item => item.size === +event.target.value)});
	}

	handleWinStepChange(event) {
		this.state.mainMatrix.winSteps = +event.target.value;
		this.setState({mainMatrix: this.state.mainMatrix});
	}

	handleWinCountChange(event) {
		this.state.mainMatrix.winCount = +event.target.value;
		this.setState({mainMatrix: this.state.mainMatrix});
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
								<Col mdOffset={3} md={3} style={{transform: 'translateX(-15px)'}}>
									<Toggle
										defaultChecked={this.state.playWithComputer}
										icons={false}
										onChange={() => this.setState({playWithComputer: !this.state.playWithComputer})}/>
								</Col>
							</FormGroup>

							{this.state.playWithComputer && <FormGroup style={{transform: 'translateX(-9px)'}} name="computer-value">
								<Col componentClass={ControlLabel} mdOffset={1} md={4}>
									<strong>Computer's playing side</strong>
								</Col>
								<Col mdOffset={3} md={3} style={{transform: 'translateX(-5px)'}}>
									<ToggleButtonGroup 
									  name="toggle-group"
									  onChange={ev => this.handleComputerSideChange(ev)}
									  type="radio"
									  value={this.state.computersValue}>
										<ToggleButton value="X">X</ToggleButton>
										<ToggleButton value="O">O</ToggleButton>
									</ToggleButtonGroup>
									</Col>
							</FormGroup>}

							<FormGroup style={{transform: 'translateX(-15px)'}} name="gameboard-size">
								<Col componentClass={ControlLabel} mdOffset={1} md={4}>
									<strong>Size of the game board</strong>
								</Col>
								<Col mdOffset={3} md={4}>
									<FormControl
						              onChange={ev => this.handleSizeChange(ev)}
						              componentClass="select">
							            {Range(3, 10).map((item, index) => <option key={index} value={item}>{item}x{item}</option>)}
	          						</FormControl>
								</Col>
							</FormGroup>

							{this.state.mainMatrix.size !== 3 && <FormGroup name="game-win-steps">
								<Col componentClass={FormGroup.Label} mdOffset={1} md={4}>
									<strong>Number of steps needed to chain</strong>
								</Col>
								<Col mdOffset={3} md={4} style={{transform: 'translateX(-15px)'}}>
									<FormControl
						              onChange={ev => this.handleWinStepChange(ev)}
						              componentClass="select">
						              	{Range(3, this.state.mainMatrix.size).reverse().map((item, index) => <option key={index} value={item}>{item}</option>)}
							        </FormControl>
								</Col>
							</FormGroup>}

							{this.state.mainMatrix.size !== 3 && <FormGroup name="game-win-count">
								<Col componentClass={FormGroup.Label} mdOffset={1} md={4}>
									<strong>Number of chains needed to win</strong>
								</Col>
								<Col mdOffset={3} md={4} style={{transform: 'translateX(-15px)'}}>
									<FormControl
						              onChange={ev => this.handleWinCountChange(ev)}
						              componentClass="select" 
						              disabled={this.state.mainMatrix.size === this.state.mainMatrix.winSteps}>
						              	{Range(1, this.state.mainMatrix.size - this.state.mainMatrix.winSteps + 1).map((item, index) => <option key={index} value={item}>{item}</option>)}
							        </FormControl>
								</Col>
							</FormGroup>}

							<FormGroup style={{transform: 'translateX(-3px)'}} name="pick-cell-color"> 
								<Col componentClass={ControlLabel} mdOffset={1} md={4}>
									<strong>Pick color for game cells</strong>
								</Col>
								<Col mdOffset={3} md={4}>
									<FormControl
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