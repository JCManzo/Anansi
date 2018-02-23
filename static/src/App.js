import React, { Component } from 'react';
import './App.css';
import NavBar from './common/NavBar';

class App extends Component {
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
      </div>
    );
  }
}

export default App;
