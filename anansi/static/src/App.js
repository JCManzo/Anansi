import React, { Component } from 'react';
import NavBar from './common/NavBar';
import PhotoStream from './stream/PhotoStream';
import './App.css';

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
        <section>
          <PhotoStream />
        </section>
      </div>
    );
  }
}

export default App;
