import React, { Component } from 'react';
import logo from './logo.svg';
import 'react-toggle/style.css';
import './App.css';
import MainLayout from './Components/layout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <MainLayout />
      </div>
    );
  }
}

export default App;
