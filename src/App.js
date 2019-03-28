import React, { Component } from 'react';
import CarList from './components/CarList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         <h2>Car Shop</h2>
        </header>
        <CarList />
      </div>
    );
  }
}

export default App;
