import React, { Component } from 'react';
import NavBar from './components/NavBar';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        {this.props.children}
      </div>
    );
  }
}
